import {jwtDecode} from "jwt-decode";
import { redirect } from "react-router";

const AuthService = {
    setToken : (jwtToken) =>{
        localStorage.setItem('logintoken', jwtToken);
    },
    getToken : () => {
        return localStorage.getItem('logintoken');
    },
    removeToken : () => {
        localStorage.removeItem('logintoken');
        redirect('/user/login');
    },
    getUser : () => {
        const token = localStorage.getItem('logintoken');
        if (token) {
            const decodedToken = jwtDecode(token);
            console.log(decodedToken);
            return decodedToken;
        }
    }
}

export default AuthService;