import http from './http-comment.js';

class GrService{

    getAll(){
        return http.get('/gr');
    }


}
export default new GrService();