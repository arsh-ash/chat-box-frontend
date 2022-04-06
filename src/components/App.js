// import Messenger from "./messenger";
import { useEffect } from "react";
import Router from "../routes";
import jwtDecode from "jwt-decode";
import { authenticateUser } from "../actions/auth";
import { connect } from "react-redux";


function App(props) {

  useEffect(()=>{
    const token=localStorage.getItem("token");
    console.log("TOKEN",token);
    if(token){

      const user = jwtDecode(token);

      props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name,
        })
      );

    }

  },[])
  console.log("AUTH",props.auth);
  return (
    <>
    <Router/>
    </>
    
  )
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(App);