import { useEffect } from "react";
import {  MultiChatSocket, MultiChatWindow,useMultiChatLogic } from "react-chat-engine-advanced";

const ChatsPage = (props) => {
   console.log(props.user);

  const chatProps = useMultiChatLogic(
    "f38bb440-9203-4dea-9414-91b4b14fb518",
    props.user.username,
    props.user.secret,
  )

  return (
    <div style={{height:'100vh'}}>
        <MultiChatSocket {...chatProps} />
        <MultiChatWindow {...chatProps} style={{ height:'100%' }} />
    </div>
  );
};

export default ChatsPage;