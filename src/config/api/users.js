import authHeader from './auth-header.js';
import http from './http-comment.js';

class UserService{

  getAll(){
 
    return http.get('/users', {headers: authHeader()});
  }

}
export default new UserService();