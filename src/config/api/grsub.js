import authHeader from './auth-header.js';
import http from './http-comment.js';

class GrSubService{

    getAll(){
     
        return http.get('/subgr',{headers: authHeader()});
    }

    getId(id){
        return http.get('/subgr/'+id , {headers : authHeader()})
    }

    addGr(data){
        return http.post('/subgr',data,{headers : authHeader()});
    }

    updateGr(data,ID){
        return http.put('/subgr/'+ID,data,{headers: authHeader()});
    }

    
    getGrIdx(id){
        return http.get('/listsubgr/'+id, {headers : authHeader()});
    }

    addListGr(data){
        return http.post('/subgrlist',data,{headers : authHeader()});
    }

    deleteGr(id){
        return http.delete('/subgr/'+id,{headers : authHeader()});
    }

    deleteGrSub(id){
        return http.delete('/subgrid/'+id,{headers : authHeader()});
    }

}
export default new GrSubService();