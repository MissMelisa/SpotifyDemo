import { AUTH_URL } from "../../Components/Token";

import "./style.css";

function LogIn() {
  return (
    <div className="container">
      <a className="loginButton" href={AUTH_URL}>
        Log In
      </a>
    </div>
  );
}
export default LogIn;
