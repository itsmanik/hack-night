import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/auth-context";

const Home = () => {
  const context = useContext(AuthContext);
  console.log(context.role);
  return (
    <> 
      <section className="text-lightWhite -translate-y-14">
        <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
          <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
            <h1 className="text-5xl font-bold leading-none sm:text-6xl">
              Career <span className="dark:text-violet-600">Growth</span>{" "}
              Through Alumni{" "}
              <span className="dark:text-violet-600">Mentorship</span> and
              Networking
            </h1>
            
            <p className="mt-6 mb-8 text-lg sm:mb-12">
              Connect with alumni for career advice, mentorship, and networking
              opportunities.
              <br className="hidden md:inline lg:hidden" />
            </p>
            <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
              <Link
                to="/signup"
                className="px-8 py-3 text-lg font-semibold rounded dark:bg-violet-600 dark:text-gray-50"
              >
                Get Started
              </Link>
              <Link
                to="/explore"
                className="px-8 py-3 text-lg font-semibold border rounded dark:border-gray-800"
              >
                Explore Alumni
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
            <img
              src="https://mambaui.com/assets/svg/Business_SVG.svg"
              alt=""
              className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
            />
          </div>
        </div>
      </section>
    </>
  );
};
export default Home;
