import authHeader from './auth-header.js';
import http from './http-comment.js';

class GrService{

    getAll(){
     
        return http.get('/gr',{headers: authHeader()});
    }


}
export default new GrService();