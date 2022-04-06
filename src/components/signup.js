import "./signup.css"
import react from "react"
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import axios from "axios"
import { Link } from "react-router-dom";
import { margin } from "@mui/system";
import { connect } from "react-redux";
import { signUp,startSignUp } from "../actions/auth";

const Signup=(props)=>{
    console.log("in signup",props.auth)
    const { error, inProgress, isLoggedin } =props.auth;

    const [formData,setFormData]=useState({
        name:"",
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
       

         let data={
             name:formData.name,
             email:formData.email,
             password:formData.password,
        }
       props.dispatch(startSignUp()) 
       props.dispatch(signUp(data))     



     }
    return (
        <>
        <Box className="signup_main">
            <Box>
            <h2 style={{
                fontWeight:"400",
                textAlign:"justify"
            }}>SIGN IN</h2>
            <TextField  className="email_field" id="outlined-basic" label="name" variant="outlined" 
             sx={{ width:"80%",marginBottom:"10%"}}
             name="name"
             onChange={(e)=>{handleChange(e)}}
             
             />
           <TextField  className="email_field" id="outlined-basic" label="email" variant="outlined" 
            sx={{ width:"80%",marginBottom:"10%"}}
            name="email"
            onChange={(e)=>{handleChange(e)}}

            />
               <TextField  className="email_field" id="outlined-basic" label="password" variant="outlined" 
            sx={{ width:"80%",marginBottom:"10%"}}
            name="password"
            onChange={(e)=>{handleChange(e)}}

            />
            
              
            <Link to="/" style={{
            textDecoration:"none"
        }}>
        <p style={{
            color:"gray",
            marginBottom:"-10%"
        }}>Already have an account have an account? click here to Login!</p>
        </Link>

            </Box>
            
                
               <Button variant="contained" 
               className="signup-button"
               sx={{marginTop:"-5%" }}
               onClick={handleSubmit}
              >Signup</Button>
            
           

        </Box>

      
        </>
    )
}
function mapStateToProps(state) {
    return {
      auth: state.auth,
    };
  }
  export default connect(mapStateToProps)(Signup);