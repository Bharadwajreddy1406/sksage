import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from "react";
import { checkAuthStatus, loginUser, logOut, signUpUser } from "../helpers/api";

type User = {
  username: string;
  // password:string;
  role: string;
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setuser] = useState<User | null>(null);
  const [isLoggedIn, setisLoggedIn] = useState(false);


  // useEffect(() => {
  //       async function checkStatus() {
  //         const data = await checkAuthStatus();
  //         if(data){
  //           setuser({username : data.username,role:data.role})
  //           setisLoggedIn(true);
  //         }else{

  //         }
  //       }
  //       checkStatus();
  // }, []);


  useEffect(()=>{
    //fetch if the user's cookies are valid then skip login
    async function checkStatus() {
        const data = await checkAuthStatus();
        if(data){
            setuser({username:data.username, role:data.role});
            setisLoggedIn(true);
        }
    }
checkStatus();
},[]);

  const login = async (username: string, password: string) => {
    const data = await loginUser(username, password);
    if (data) {
        setuser({username : data.username,role:data.role})
        setisLoggedIn(true);
        console.log(isLoggedIn?"hii dumb":"not dumb")
    }

  };


  const signup = async (username: string, password: string) => {

    const data = await signUpUser(username, password);
    if (data) {
        console.log(isLoggedIn?"first time huh!":"check your creds bruh")
    }

  };


  const logout = async () => {
    await logOut();
    setuser(null);
    setisLoggedIn(false);
    window.location.reload();
  };

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
