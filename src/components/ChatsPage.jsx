import { useEffect } from "react";
import { MultiChatSocket, MultiChatWindow,useMultiChatLogic } from "react-chat-engine-advanced";

const ChatsPage = (props) => {
   console.log(props.user);
   useEffect(()=>{
       // open a socket connection
        
   },[])
  const chatProps = useMultiChatLogic(
    "523cdcbc-b8f4-4662-9287-c87f646611b8",
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