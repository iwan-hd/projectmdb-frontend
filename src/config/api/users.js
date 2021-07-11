import authHeader from './auth-header.js';
import http from './http-comment.js';
class UserService{

  getAll(){
 
    return http.get('/users', {headers: authHeader()});
  }

  getId(id){
    return http.get('/user/'+id , {headers : authHeader()})
  }

  addUser(data){
    return http.post('/auth/signup',data,{headers : authHeader()});
  }

  updateUser(data,ID){
    return http.put('/user/'+ID,data,{headers: authHeader()});
  }
  deleteUser(id){
    return http.delete('/user/'+id,{headers : authHeader()});
  }

}
export default new UserService();