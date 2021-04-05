function authHeader(params) {
    const userweb  = JSON.parse(localStorage.getItem("userweb"));

    if (userweb && userweb.accessToken) {
        return {Authorization: `Bearer ${userweb.accessToken}`}
    } else {
        
    }
}

export default authHeader;