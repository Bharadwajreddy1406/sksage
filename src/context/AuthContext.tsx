import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from "react";
import { loginUser } from "../helpers/api";

type User = {
  username: string;
  password:string;
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

  useEffect(() => {
    // todo
  }, []);

  const login = async (username: string, password: string) => {
    const data = await loginUser(username, password);
    if (data) {
        setuser({username : data.username, password:data.password})
        setisLoggedIn(true);
        console.log(isLoggedIn?"hii dumb":"not dumb")
    }

  };
  const signup = async (username: string, password: string) => {};
  const logout = async () => {};

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
