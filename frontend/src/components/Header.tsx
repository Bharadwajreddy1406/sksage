import { useAuth } from "../context/AuthContext"
import OutNav from "./OutNav";
import Navbar from "./Navbar";
const Header = () => {
    const auth = useAuth();
    console.log(auth?.isLoggedIn)
  return (
    <div>
      {auth?.isLoggedIn ? < Navbar/> : <OutNav/>}
    </div>
  )
}

export default Header;
