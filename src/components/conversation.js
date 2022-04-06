import axios from "axios";
import { useEffect, useState } from "react"
import "./conversation.css"
import { connect } from "react-redux";



function Conversation(props){
    // let currenUserId="6238051bb93bc1c9066a5ae6"

    const userId=props.auth.user._id
    console.log("USERID",userId);
    let currenUserId=userId;


    const{data}=props;
    console.log("mydata",data);
    const [user,setUser]=useState(null);
    useEffect( async()=>{
        
        const friendId=data.members.find((m)=>{
                 console.log("MMMMMMMMM",m)

            if(m!==currenUserId){
                return{
                    m
                }
            }
//using data as a dependence is of no use because every time Message component will be called
//from parent component

        },[data])

        // console.log("friendId",friendId);

// console.log("going back");
let response=await axios.get(`http://localhost:8000/user/getCurrentUser/${friendId}`)
// console.log("PARTNER",response);
setUser(response.data.data);

     
      
        
    },[data])
    return(
        <>
        <div className="conversation-box">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"></img>
            <span className="guest-name">
                {user&&user.name}</span>
        </div>
        </>
    )
}
function mapStateToProps(state) {
    return {
      auth: state.auth,
    };
  }
  export default connect(mapStateToProps)(Conversation);