import {Route , Routes} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import Notfoundpage from "./pages/Notfoundpage";


function App() {
  // const [count,setCount] = useState(0);
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="*" element={<Notfoundpage/>}/>
      </Routes>

    </>
  );
}

export default App;
