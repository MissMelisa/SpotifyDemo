import { useContext } from "react";
import { Button } from "antd";
import { AuthContext } from "./Components/Token";

export default function LogOut() {
  const { onSignOutClick } = useContext(AuthContext);

  return (
    <div className="containerLogOut">
      <Button onClick={onSignOutClick}>Log out </Button>
    </div>
  );
}
