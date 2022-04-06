import "./message.css"
import { format } from "timeago.js";
import { connect } from "react-redux";


function Message(props) {
    // console.log("sender",props.msg.createdAt);
    const { msg } = props
    const userId = props.auth.user._id
    console.log("USERID", userId);
    let currenUserId = userId;


    return (
        <>
        {
            msg.sender==currenUserId?
            <>
<div className="text-message-box ">
                <img className="meriphoto" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80"></img>
            </div>
            <div className="text-message-own">
                <p className="uskamsg">{msg.text}</p>
                <span className="uska-span">{format(msg.createdAt)}</span>

            </div>
            </>:<>
            <div className="text-message-box ">
                <img className="uskiphoto" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80"></img>
            </div>
            <div className="text-message">
                <p>{msg.text}</p>
                <span className="mera-span">{format(msg.createdAt)}</span>

            </div>
            </>
        }
            

            {/* <div className="text-message-own">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80"></img>
                <p>hellloo my name is arsh and i am from bhumi itech .com as a senior developer</p>

            </div> */}

        </>
    )
}
function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}
export default connect(mapStateToProps)(Message);