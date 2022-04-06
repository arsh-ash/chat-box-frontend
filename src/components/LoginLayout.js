import react from "react"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import "./LoginLayout.css"
import { Outlet } from "react-router-dom";

const LoginLayout=()=>{
return (
<>
<Grid container>
    <Grid item md={7} className="main">
        <img src="https://images.unsplash.com/photo-1530811761207-8d9d22f0a141?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWVzc2FnZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60" className="login_img"></img>
        </Grid>
    <Grid item md={5}>
        <Outlet></Outlet>
        
        </Grid>



</Grid>

</>
)

}
export default LoginLayout;
