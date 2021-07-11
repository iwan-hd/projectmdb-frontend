import http from './http-comment.js';
import authHeader from './auth-header.js'

class PartNumberService {
   
   

    getAll(){
        return http.get('/partnumber' , {headers : authHeader()});
    }

    getId(id){
        return http.get('/partnumber/'+id , {headers : authHeader()})
    }

    addPartNumber(data){
        return http.post('/partnumber',data,{headers : authHeader()});
    }
    
    updatePartNumber(data,ID){
        return http.put('/partnumber/'+ID,data,{headers: authHeader()});
    }


    deletePartNumber(id){
        return http.delete('/partnumber/'+id,{headers : authHeader()});
    }
    

}

export default new PartNumberService();