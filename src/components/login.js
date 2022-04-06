import react from "react"
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import "./login.css"
import Button from '@mui/material/Button'
import axios from "axios"
import { textAlign } from "@mui/system";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { startLogin,
          login } from "../actions/auth";


const Login=(props)=>{
    console.log("props",props)
    const { error, inProgress, isLoggedin } =props.auth;

    const[formData,setFormData]=useState({
        email:"",
        password:"",
    })

    const handleChange=(e)=>{
        console.log(e.target.name);
        console.log(e.target.value);
        const name=e.target.name;
        const value=e.target.value;
        setFormData({...formData,[name]:value});
     }

     const handleSubmit= async ()=>{
       
         console.log("email",formData.email);
         console.log("password",formData.password);
         let data={
             email:formData.email,
             password:formData.password
         }
         console.log(data);
         props.dispatch(startLogin());
         props.dispatch(login(data))
    
        

     }
    return (
        <>
        <Box className="main_login">
            <h2 style={{
                fontWeight:"400",
                textAlign:"justify"
            }}>Welcome to Arsh's chatBox</h2>
        <Box>
        <TextField  className="email_field" id="outlined-basic" label="Email" variant="outlined" 
         sx={{ width:"80%",marginBottom:"10%"}}
         value={formData.email}
         name="email"
         onChange={(e)=>handleChange(e)}
         />
         </Box>
        <Box>
        <TextField className="password_field" id="outlined-basic" label="Password" variant="outlined"
        sx={{width:"80%"}}
        value={formData.password}
        name="password"
        onChange={(e)=>handleChange(e)}


        />
        </Box>
        
            <Button className="login-button" variant="contained" sx={{marginTop:"5%"}} onClick={handleSubmit}>Login</Button>



        
        
        
        <Link to="/signup" style={{
            textDecoration:"none"
        }}>
        <p style={{
            color:"gray"
        }}>Don't have an account? click here to signup</p>
        </Link>
        </Box>

        </>
    )
}

function mapStateToProps(state) {
    return {
      auth: state.auth,
    };
  }
  export default connect(mapStateToProps)(Login);