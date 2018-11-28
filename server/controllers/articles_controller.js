import Article from '../models/article.js';
const ERRMESG = '服务器内部错误'
export async function getAllPublishArticles(ctx) {
  const limit = +ctx.query.limit || 4;
  const page = +ctx.query.page;
  let skip = 0;
  let articleArr;
  let allPage;
  let allNum;
  if (page !== 0) {
    //第几段数据
    skip = limit * (page - 1);
  }
  articleArr = await Article.find({
      publish: true,
    })
    .sort({
      createTime: -1
    })
    .limit(limit)
    .skip(skip).catch(err => {
      ctx.throw(500, ERRMESG);
    });
  allNum = await Article.find({
      publish: true,
  }).count().catch(err => {
      this.throw(500, '服务器内部错误');
  });
  allPage = Math.ceil(allNum / limit);
  ctx.body = {
    success: true,
    articleArr,
    allPage
  };
}