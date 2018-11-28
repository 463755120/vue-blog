import * as $ from '../../controllers/login_controller';
export default async(router) => {
  $.initUser();
  router.post('/login',$.login)
}