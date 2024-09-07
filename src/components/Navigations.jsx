import { Link, NavLink } from "react-router-dom";

function Navigations() {
  return (
    <header className="text-white bg-black body-font">
      <div className="container mx-auto flex flex-wrap px-2 py-4  flex-col md:flex-row items-center">
        {/* LEFT SIDE NAVIGATION  */}
        <nav
          style={{ fontSize: "16px" }}
          className="md:mr-auto md:ml-4 md:py-1 md:pl-4 flex flex-wrap items-center text-base justify-center"
        >
          <Link
            to={"/"}
            className="mr-5  hover:text-orange-500 cursor-pointer font-medium "
          >
            HOME
          </Link>
          <Link
            to={"/services"}
            className="mr-5  hover:text-orange-500 cursor-pointer font-medium "
          >
            SERVICES
          </Link>
          <Link
            to={"/catogaries"}
            className="mr-5  hover:text-orange-500 cursor-pointer font-medium "
          >
            CATOGARIES
          </Link>
          <Link
            to={"/FeaturedProds"}
            className="mr-5  hover:text-orange-500 cursor-pointer font-medium "
          >
            FEATURED PROD
          </Link>
          <Link
            to={"/asdf"}
            className="mr-5  hover:text-orange-500 cursor-pointer font-medium "
          >
            BLOGS
          </Link>
          <Link
            to={"/blogs"}
            className="mr-5  hover:text-orange-500 cursor-pointer font-medium "
          >
            ABOUT US
          </Link>
          <Link
            to={"/asdf"}
            className="mr-5  hover:text-orange-500 cursor-pointer font-medium "
          >
            CONTACT
          </Link>
        </nav>
        {/* RIGHT SIDE NAVIGATIONS */}
        <nav className="rightNavigation  inline-flex items-center   mt-4 md:mt-0">
          <Link
            to={"/asdf"}
            className="rightSideLink relative mr-5  hover:text-orange-500 cursor-pointer font-medium "
          >
            NEW ARRIVALS
          </Link>
          <Link
            to={"/asdf"}
            className="rightSideLink relative mr-5  hover:text-orange-500 cursor-pointer font-medium "
          >
            HOT SALE
          </Link>
        </nav>
      </div>
    </header>
  );
}
export default Navigations;
