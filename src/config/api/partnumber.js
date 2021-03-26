import http from './http-comment.js';

class PartNumberService {

    getAll(){
        return http.get('/partnumbers');
    }


    

}

export default new PartNumberService();