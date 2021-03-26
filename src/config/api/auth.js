import http from './http-comment.js';

class AuthService{

    register(username,nama,password,foto,createdAt){
        return http.post('/auth/signup',{
            username,
            nama,
            password,
            foto,
            createdAt
        });
    };

    login(username,password){
        return http.post('/auth/signin',{
          username,
          password

        }).then((response) => {

            if (response.data.accessToken) {
                localStorage.setItem("userweb", JSON.stringify(response.data));          
            }
            return response.data ;
        } )

    };

    logout(){
        localStorage.removeItem("userweb");
    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem("userweb"));
    }

}
export default new AuthService();