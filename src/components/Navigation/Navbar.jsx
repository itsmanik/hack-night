import { useEffect, useState, useRef } from "react";
import classes from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/auth-context";

const ProfileDropDown = (props) => {
  const [state, setState] = useState(false);
  const profileRef = useRef();

  const navigation = [
    { title: "Dashboard", path: "" },
    { title: "Settings", path: "" },
    { title: "Log out", path: "" },
  ];

  useEffect(() => {
    const handleDropDown = (e) => {
      if (!profileRef.current.contains(e.target)) setState(false);
    };
    document.addEventListener("click", handleDropDown);
  }, []);

  return (
    <div className={`relative ${props} hidden lg:block`}>
      <div className="flex justify-center items-center h-full space-x-4">
        <button
          ref={profileRef}
          className="w-5 h-5 outline-none rounded-full ring-offset-2 lg:focus:ring-indigo-600"
          onClick={() => setState(!state)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            focusable="false"
            aria-hidden="true"
            role="presentation"
            className="w-full h-full rounded-full fill-white"
          >
            <path
              fillRule="evenodd"
              d="M5 7a5 5 0 1 1 6.192 4.857A2 2 0 0 0 13 13h1a3 3 0 0 1 3 3v2h-2v-2a1 1 0 0 0-1-1h-1a3.99 3.99 0 0 1-3-1.354A3.99 3.99 0 0 1 7 15H6a1 1 0 0 0-1 1v2H3v-2a3 3 0 0 1 3-3h1a2 2 0 0 0 1.808-1.143A5.002 5.002 0 0 1 5 7zm5 3a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <ul
        className={`bg-darkGray text-white bg-[#1b1b1b] top-15 right-0 hidden lg:inline-block mt-5 space-y-5 lg:absolute lg:text-sm lg:w-52 lg:shadow-lg lg:space-y-0 lg:mt-0 ${
          state ? "" : "lg:hidden"
        }`}
      >
        {navigation.map((item, idx) => (
          <li key={idx + 238}>
            <a
              key={idx}
              className="block text-inherit lg:hover:bg-[#9147FF] lg:p-2.5"
              href={item.path}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Navbar = () => {
  const context = useContext(AuthContext);
  const [state, setState] = useState(false);

  const navigation = [
    // {
    //   title: "Browse",
    // },
    // {
    //   title: "Profile",
    // },
    // {
    //   title: "Settings",
    // },
  ];

  return (
    <>
      <nav
        className={`relative shadow shadow-black z-30 bg-[#18181B] w-full lg:fixed lg:text-sm lg:border-none ${
          state ? "shadow-lg lg:shadow-none" : ""
        }`}
      >
        <div className="items-center gap-x-5 px-2 max-w-screen-xl mx-auto lg:flex lg:px-4">
          <div className="flex items-center justify-between py-2 lg:py-3 lg:block">
            <a href="#" className="text-lg font-bold text-[#9147FF]">
              {context.role === undefined ? "LOGO" : context.role.toUpperCase()}
            </a>
            <div className="lg:hidden">
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={() => setState(!state)}
              >
                {state ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm8.25 5.25a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div
            className={`nav-menu lg:flex-1 pb-3 mt-8 lg:block lg:pb-0 lg:mt-0 ${
              state ? "block" : "hidden"
            }`}
          >
            <ul className="lg:flex lg:space-x-6 lg:space-y-0 justify-between">
              <div className="items-center space-y-6 flex-1 justify-start lg:ml-8 lg:flex lg:space-x-6 lg:space-y-0">
                {navigation.map((item, idx) => {
                  return (
                    <li key={idx}>
                      <button className="w-full lg:flex items-center justify-between gap-1 text-white font-bold hover:text-purpleLogo">
                        {item.title}
                      </button>
                    </li>
                  );
                })}
              </div>
              <div className="flex align-middle items-center justify-center gap-x-6 space-y-3 lg:space-y-0">
                <li>
                  <Link
                    to="/login/alumni"
                    className="block my-3 lg:ml-10 py-[0.4rem] px-3 text-white font-bold text-center bg-[#2F2F35] hover:bg-[#3f3f45] border rounded lg:border-none"
                  >
                    Log In
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className={`block my-3 py-[0.4rem] font-bold px-3 text-center text-white bg-[#9147FF] hover:bg-[#822fff] active:bg-indigo-700 active:shadow-none rounded shadow lg:inline ${classes.signupbutton}`}
                  >
                    Sign Up
                  </Link>
                </li>
              </div>
              <ProfileDropDown />
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
