import { Navigate, useRoutes } from "react-router-dom";
import Login from "./components/login";
import Messenger from "./components/messenger";
import LoginLayout from "./components/LoginLayout";
import Signup from "./components/signup";
import { connect } from "react-redux";





const Router = (props) => {
    // console.log("In routes",props.auth);
    const { isLoggedin } = props.auth
    console.log("isloggedin", isLoggedin);

    return useRoutes([{
        path: "/",
        element: isLoggedin ? <Navigate to="/chatbox" /> : <LoginLayout />,
        children: [
            {
                path: "",
                element: <Login />,
            }, {
                path: "/signup",
                element: <Signup />
            }
        ]

    }, {
        path: "/chatbox",
        element: isLoggedin ? <Messenger /> : <Navigate to="/" />
    }])

}

function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}
export default connect(mapStateToProps)(Router);