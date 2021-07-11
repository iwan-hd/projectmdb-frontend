import authHeader from './auth-header.js';
import http from './http-comment.js';

class GrService{

    getAll(){
     
        return http.get('/gr',{headers: authHeader()});
    }

    getId(id){
        return http.get('/gr/'+id , {headers : authHeader()})
    }

    addGr(data){
        return http.post('/gr',data,{headers : authHeader()});
    }

    updateGr(data,ID){
        return http.put('/gr/'+ID,data,{headers: authHeader()});
    }

    deleteGr(id){
        return http.delete('/gr/'+id,{headers : authHeader()});
    }
}
export default new GrService();