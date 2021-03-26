import http from './http-comment.js';

class UserService{

  getAll(){

    return http.get('/users')
  }

}
export default new UserService();