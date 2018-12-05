import * as $ from '../../controllers/articles_controller';
import verify from '../../middleware/verify';
export default async(router) => {
  router.get('/getArticles',$.getAllPublishArticles)
  router.post('/saveArticle',verify,$.saveArticle)
  router.get('/articleDetails',$.articleDetails)
}