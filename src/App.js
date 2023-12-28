// import { useState } from "react";
import "./App.css";
// import AuthPage from "./components/chat/AuthPage"
// import ChatsPage from "./components/chat/ChatsPage";
import RegisterForm from "./components/registration/RegisterForm";

function App() {
  // const [user, setUser] = useState(undefined)
  
  return <RegisterForm />

  // if (!user) {
  //   return <AuthPage onAuth={(user) => setUser(user)} />;
  // } else {
  //   return <ChatsPage user={user} />;
  // }
}

export default App;
