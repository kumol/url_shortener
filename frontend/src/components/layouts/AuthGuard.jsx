import AuthService from "../../service/authService";
import LogIn from "../containers/User/LogIn/LogIn";
import Layout from "./Layout1";
const AuthGuard = ({ children }) => {
    const isAuthenticated = AuthService.getToken() !== null;

    if (!isAuthenticated) {
        return <Layout><LogIn/></Layout>;
    }

    return (
        <>
            {children}
        </>
    );
};

export default AuthGuard;