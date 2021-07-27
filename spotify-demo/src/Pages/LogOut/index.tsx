import { useContext } from "react";
import { Button } from "antd";
import { AuthContext } from "../../Components/Token";

export default function LogOut() {
  const { signOut } = useContext(AuthContext);

  return (
    <div className="containerLogOut">
      <Button onClick={signOut}>Log out </Button>
    </div>
  );
}
