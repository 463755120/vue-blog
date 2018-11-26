import * as $ from '../../controllers/articles_controller';

export default async(router) => {
  router.get('/publishArticles',$.getAllPublishArticles)
}