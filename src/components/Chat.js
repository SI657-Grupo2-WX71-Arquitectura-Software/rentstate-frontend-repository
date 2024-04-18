import React from "react";
import "../styles/Chat.css";

function Chat() {
    return (
        <div className="chat">
        <div className="chatBox">
            <div className="top">
                <div className="user">
                    <img src="https://i.pinimg.com/564x/a0/2a/28/a02a28c20e7b91d1f5e75b8a789d1456.jpg" alt="" />
                    Jenny
                </div>
            </div>
            <div className="center">
                <div className="chatMessage">
                    <p>Lorem, message part</p>
                </div>

                <div className="chatMessage own">
                    <p>Lorem, message part</p>
                </div>

                <div className="chatMessage">
                    <p>Lorem, message part</p>
                </div>

                <div className="chatMessage own">
                    <p>Lorem, message part</p>
                </div>

                <div className="chatMessage own">
                    <p>Lorem, message part</p>
                </div>
            </div>
            <div className="bottom">
                <textarea></textarea>
                <button>Send</button>
            </div>
        </div>
    </div>
    );
}

export default Chat;
