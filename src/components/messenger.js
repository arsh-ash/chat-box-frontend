import "./messenger.css"
import "./message.css"
import Conversation from "./conversation"
import Message from "./message"
import ChatOnline from "./chatOnline"
import { useEffect, useReducer, useRef, useState } from "react"
import axios from "axios"
import { connect } from "react-redux";
import {io} from "socket.io-client"
import message from "./message"

function Messenger(props) {
    // let currenUserId = "6238051bb93bc1c9066a5ae6"
    const userId=props.auth.user._id
    console.log("USERID",userId);
    let currenUserId=userId;
    
    const[socket,setSocket]=useState(null);
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([])
    const[textMessage,setTextMessage]=useState("");
    // const[fake,setFake]=useState(false);
    const scrollRef=useRef();

    //useEffect to for front-end socket connection
    useEffect(()=>{
        // console.log("socket",socket);
        setSocket(io("ws://localhost:8900"))

    },[])
    useEffect( async()=>{
        await socket.on("welcome",(data)=>{
          console.log(data);
       },[])

       await socket.emit("sending_users",props.auth.user)
       socket.on("getUsers",(onlineUsers)=>{
        console.log("ONLINE USERS",onlineUsers);

       })
    },[socket])
    

    useEffect(async() => {
        async function getConversations() {
            let response = await axios.get(`http://localhost:8000/conversation/${currenUserId}`)
            console.log("All conversations",response.data.data);
            setConversations(response.data.data);
        }
        getConversations();
    }, [currenUserId])
    // console.log("conversations",conversations);
useEffect( async()=>{
    console.log("CURRENTCHAT",currentChat);
    let response = await axios.get(`http://localhost:8000/message/${currentChat._id}`);
    console.log("RESPONSE of message",response.data.data);
    setMessages(response.data.data)


},[currentChat])
    // console.log("currentChat", currentChat);

const handleSubmit= async (e)=>{
    // e.preventDefault();
    const message={
        sender:currenUserId,
        text:textMessage,
        conversationId:currentChat._id
    }
  

    let response = await axios.post(`http://localhost:8000/message/create/`,message);
    console.log("msg created",response.data.data.text);
     setMessages([...messages,response.data.data]);
     setTextMessage("");
     let recieverId= await currentChat.members.find(m=>m!==currenUserId);
     console.log("RECIEVERID",recieverId);
      console.log("SENDING",textMessage);
       socket.emit("sendMessage",{
        senderId:currenUserId,
        recieverId,
        text:textMessage


    })
    
}

//useEffect for auto scroll;
useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour:"smooth"});

},[messages])

console.log("messages",messages);
    return (
        <>
            <div className="messenger-main">
                <div className="chatbox-menu box">
                    <div>
                        {
                            conversations.map((conversation) => {
                                return (
                                    <>
                                        <div onClick={() => { setCurrentChat(conversation) }}>
                                            <Conversation data={conversation} />
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>



                </div>
                <div className="chatbox box">

                    {
                        currentChat?<>
                        {
                        messages.map((data)=>{
                            return(
                                <>
                                <div ref={scrollRef}>
                                <Message msg={data}/>
                                </div>
                                </>
                            )
                        })
                        
                        }

                    {/* <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message /> */}

                    <div className="chat-input">
                        <textarea placeholder="write something..." row="20" col="30"
                        onChange={(e)=>{setTextMessage(e.target.value)}}
                        value={textMessage}
                        
                        >

                        </textarea>
                        <button className="send-button"
                        onClick={(e)=>handleSubmit(e)}
                        type="reset"
                        >send</button>

                    </div>

                        </>:<h1 style={{color:"gray",margin:"0"}}>Start a new conversation...</h1>
                    }






                </div>
                <div className="chatbox-online box">
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />

                </div>

            </div>
        </>
    )
}
function mapStateToProps(state) {
    return {
      auth: state.auth,
    };
  }
  export default connect(mapStateToProps)(Messenger);