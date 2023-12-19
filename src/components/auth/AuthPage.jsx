import axios from "axios";
import "../styles/Auth.css";
import { useState } from "react";
import Radio from "./Radio";
import { LINKS } from "../../constants/routes";


const AuthPage = () => {
  const [error, setError] = useState(null);
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[2].value);
    axios.post("http://localhost:8080/api/users/login", { 
        email: e.target[0].value,
        password: e.target[1].value,
       })
      .then((r) => {
        localStorage.setItem("user", r.data.user);
        localStorage.setItem("token",r.data.token);
        props.setIsAuth(true);
      })
      .catch((e) => {
        setError("Email ou mot de passe incorrect!");
        console.log("Auth Error", e);
      });
  };

  return (
    <div className="background">
      <form onSubmit={onSubmit} className="form-card">
        <div className="form-title">Bonjour 👋</div>

        {error ? (
          <div className="form-error">{error}</div>
        ) : (
          <div className="form-subtitle">Entrer vos informations</div>
        )}

        <div className="auth">
          <input className="auth-input" required type="email" name="username" placeholder="Email" />
          <input className="auth-input" required name="password" type="password" placeholder="Password" />
           {/* a radio buttons to choose function  */}
          <button className="auth-button" type="submit">
            Entrer
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
