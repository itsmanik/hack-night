import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the form from submitting and reloading the page

    // Validate the form data (optional)
    if (!username || !password) {
      setErrorMessage("Both username and password are required");
      return;
    }
    try {
      // Send the login request to the backend
      const response = await axiosInstance.post(
        "/api/login", // Adjust this URL based on your Flask server
        { username, password }
      );

      // Handle successful login (store the JWT token in localStorage)
      const { access_token } = response.data;
      localStorage.setItem("jwtToken", access_token); // Store the JWT token

      // Redirect the user to a different page (e.g., dashboard)
      navigate(`/signup/${params.id}`); // Adjust the path as necessary
    } catch (error) {
      // Handle errors (e.g., invalid credentials)
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid username or password");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="bg-black flex justify-center mt-10">
      <div className="flex border border-gray-700 shadow shadow-gray-400 text-lightWhite flex-col max-w-md min-w-[25rem] px-10 pt-7 pb-5 rounded-md sm:px-10">
        <div className="mb-8 text-center">
          <h1 className="my-1 text-lightWhite text-4xl font-bold">Log In</h1>
          <p className="text-sm dark:text-gray-600">Log into your account</p>
        </div>
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
        <form noValidate onSubmit={handleLogin} className="space-y-12">
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block mb-2 text-sm">
                Enter Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="jenkins"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm">
                  Enter Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <button
                type="submit"
                className="w-full px-8 py-3 font-semibold rounded-md bg-purple hover:bg-darkPurple dark:text-gray-50"
              >
                Log In
              </button>
            </div>
            <p className="px-6 text-sm text-center dark:text-gray-600">
              Don't have an account?,{" "}
              <Link
                rel="noopener noreferrer"
                to={"/signup"}
                className="hover:underline text-darkPurple"
              >
                Sign Up
              </Link>
              .
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
