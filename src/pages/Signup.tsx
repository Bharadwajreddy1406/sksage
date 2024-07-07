import React from "react";
import { useRef, FormEvent } from "react";

const Signup: React.FC = () => {
  // Define refs with proper types
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // Handle form submission
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Retrieve values from the refs, using nullish coalescing to handle possible null refs
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    // Alert the form details
    console.log(
      `Email: ${username}\nPassword: ${password}`
    );
  };

  return (
    <div className="max-w-lg  mx-auto  bg-neutral  mt-20" >
        <div className=" h-16 w-200 flex justify-center items-center text-center drop-shadow-sm font-bold from-neutral-700 text-2xl">
          Sign Up here!
        </div>
      <form className=" p-10 shadow-2xl rounded-xl" style={{height:"310px"}} onSubmit={handleSubmit}>
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
        <div className="flex justify-center align-center ">
          <button
            type="submit"
            className="text-slate-800 shadow-none bg-yellow-400 mt-5 hover:bg-yellow-400 hover:shadow-xl hover:px-12 hover:py-3 focus:outline-none active:bg-yellow-500 font-medium rounded-lg text-sm w-full transition-all duration-200 sm:w-auto px-10 py-2 text-center"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default Signup;