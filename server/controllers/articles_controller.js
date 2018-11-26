export async function getAllPublishArticles(ctx) {
  let articleArr = "123456";
  ctx.body = {
    success: true,
    articleArr,
  };
}