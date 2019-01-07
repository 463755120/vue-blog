import Article from '../models/article.js';
const ERRMESG = '服务器内部错误'
export async function getAllPublishArticles(ctx) {
  const limit = +ctx.query.limit || 4;
  const page = +ctx.query.page;
  let isPublish = JSON.parse(ctx.query.isPublish) ? {
    publish: true
  } : {};
  let skip = 0;
  let articleArr;
  let allPage;
  let allNum;
  if (page !== 0 && limit < 10 ) {
    //第几段数据
    skip = limit * (page - 1);
  }
  // conten字段不取
  articleArr = await Article.find(isPublish, {
      content: 0
    })
    .sort({
      createTime: -1
    })
    .limit(limit)
    .skip(skip).catch(err => {
      ctx.throw(500, ERRMESG);
    });
  allNum = await Article.find(isPublish).count().catch(err => {
    this.throw(500, '服务器内部错误');
  });
  allPage = Math.ceil(allNum / limit);
  ctx.body = {
    success: true,
    articleArr,
    allPage
  };
}
export async function saveArticle(ctx) {
  const articleDate = ctx.request.body.article;
  const article = new Article({
    title: articleDate.title,
    content: articleDate.content,
    abstract: articleDate.abstract,
    publish: articleDate.isPublish,
    createTime: new Date(),
    lastEditTime: new Date(),
  });
  let createResult = await article.save().catch(err => {
    ctx.throw(500, '服务器内部错误');
  });
  ctx.body = {
    success: true,
    createResult,
  };
}

export async function articleDetails(ctx) {
  const articleID = ctx.query.articleID
  const articleDetail = await Article.findOne({
    _id: articleID
  }).catch(err => {
    ctx.throw(500, ERRMESG);
  });
  ctx.body = {
    success: true,
    articleDetail,
  };
}
export async function changeArticle(ctx) {
  const id = ctx.request.body.articleId
  const article = await Article.findByIdAndUpdate(id, {
    $set: ctx.request.body
  }).catch(err => {
    if (err.name === 'CastError') {
      ctx.throw(400, 'id不存在');
    } else {
      ctx.throw(500, '服务器内部错误');
    }
  });

  ctx.body = {
    success: true,
  };
}

export async function deletaArticle(ctx) {
  const id = ctx.request.body.articleId
  const article = await Article.findByIdAndRemove(id).catch(err => {
    if (err.name === 'CastError') {
      this.throw(400, 'id不存在');
    } else {
      this.throw(500, '服务器内部错误');
    }
  });
  ctx.body = {
    success: true,
  };
}