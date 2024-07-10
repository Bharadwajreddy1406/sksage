import { Link } from "react-router-dom";

export const OutNav = () => {
  return (
    <nav className="bg-white-900 p-5 shadow-md">
      <div className="container mx-auto flex justify-between items-center align-middle">
        {/* Logo Section */}
        <div className="text-white text-2xl font-bold">
          <img src="logo.png" alt="Logo" className="h-10 w-59 inline-block mr-3" />
        </div>
        
        {/* Buttons Section */}
        <div className="flex space-x-7">
          <Link to={"/login"} className="bg-slate-300 text-bold px-8 py-1 border border-slate-200 shadow-sm hover:border-yellow-300 hover:shadow-lg hover:bg-yellow-400 hover:text-white rounded transition duration-300">
            Login
          </Link>
          <Link to={"/signup"} className="bg-slate-300 text-bold px-8 py-1 border border-slate-200 shadow-sm hover:border-yellow-300 hover:shadow-lg hover:bg-yellow-400 hover:text-white rounded transition duration-300">
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default OutNav;
