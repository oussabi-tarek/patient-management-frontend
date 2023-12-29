import axios from "axios";
import { useEffect,useState } from "react";
import {  MultiChatSocket, MultiChatWindow,useMultiChatLogic } from "react-chat-engine-advanced";
import { useParams } from "react-router";

const ChatsPage = (props) => {
  const params=useParams();


  const chatProps = useMultiChatLogic(
    "a8dbea7d-5ff7-47d9-aa00-f1d44b92c247",
    JSON.parse(localStorage.getItem('user')).email,
    JSON.parse(localStorage.getItem('user')).email,
  )

  return (
    <div style={{height:'100vh'}}>
        <MultiChatSocket {...chatProps} />
        <MultiChatWindow {...chatProps} style={{ height:'100%' }} />
    </div>
  );
};

export default ChatsPage;