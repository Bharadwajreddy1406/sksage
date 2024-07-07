import React, { useRef, FormEvent } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const rememberMeRef = useRef<HTMLInputElement>(null);

  // Handle form submission
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Retrieve values from the refs, using nullish coalescing to handle possible null refs
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const rememberMe = rememberMeRef.current?.checked || false;
    console.log(rememberMe ? "you are remembered" : "you are not remembered");
    // Alert the form details
    console.log(username, password, rememberMe);
    try {
      toast.loading("signing in..", { id: "login" });
      await auth?.login(username, password);
      toast.success("signed in", { id: "login" });
    } catch {
      toast.error("unable to get in", { id: "login" });
    }
  };

  useEffect(() => {
    if(auth?.user){
        return navigate("/");
    }
    
  }, [auth])
  

  return (
    <div className="max-w-lg  mx-auto  bg-neutral  mt-20">
      <div className=" h-16 w-200 flex justify-center items-center text-center drop-shadow-sm font-bold from-neutral-700 text-2xl">
        Log in here!
      </div>
      <form
        className=" p-10 shadow-2xl rounded-xl"
        style={{ height: "320px" }}
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Roll Number
          </label>
          <input
            type="text"
            id="email"
            ref={usernameRef}
            className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-300 block w-full p-2.5"
            placeholder="Roll Number"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            password
          </label>
          <input
            type="password"
            id="password"
            placeholder="password"
            ref={passwordRef}
            className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-300 block w-full p-2.5"
            required
          />
        </div>
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              ref={rememberMeRef}
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
            />
          </div>
          <label
            htmlFor="remember"
            className="ms-2 text-sm font-medium text-gray-900"
          >
            Remember me
          </label>
        </div>
        <div className="flex justify-center align-center ">
          <button
            type="submit"
            className="text-slate-800 shadow-none bg-yellow-400 hover:bg-yellow-400 hover:shadow-xl hover:px-12 hover:py-3 focus:outline-none active:bg-yellow-500 font-medium rounded-lg text-sm w-full transition-all duration-200 sm:w-auto px-10 py-2 text-center"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
