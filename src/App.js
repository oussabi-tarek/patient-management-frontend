import { BrowserRouter,Routes,Route } from "react-router-dom";
import "./App.css";
import AuthPage from "./components/auth/AuthPage";
import Home from "./components/home/Home";


function App() {
  return(
    <BrowserRouter>
       <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/" element={<Home />} />
       </Routes>
    </BrowserRouter>
   
  )
}

export default App;
