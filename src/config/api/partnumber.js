import http from './http-comment.js';
import authHeader from './auth-header.js'
class PartNumberService {

    getAll(){
        return http.get('/partnumber' , {headers : authHeader()});
    }


    

}

export default new PartNumberService();