// HOOKS
import { useContext } from "react";
// CONTEXT
import { LogoUrl } from "../../contexts/LogoContext";
// COMPONETS
import { Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
const links = [
  {
    heading: "INFORMATION",
    subLinks: ["First Link", "Second Link", "Third Link", "Forth Link"],
  },
  {
    heading: "CUSTOMER CARE",
    subLinks: ["First Link", "Second Link", "Third Link", "Forth Link"],
  },
  {
    heading: "FOLLOW SOCIAL MEDIA",
    subLinks: ["First Link", "Second Link", "Third Link", "Forth Link"],
  },
];
const socialMedia = [
  { id: "linkedin", icon: <FaLinkedinIn /> },
  { id: "instagram", icon: <FaInstagram /> },
  { id: "twitter", icon: <FaTwitter /> },
  { id: "facebook", icon: <FaFacebookF /> },
];

// FOOTER COMPONENTS
function Footer() {
  const { imgUrl, lightLogo } = useContext(LogoUrl);
  const { theme, bgColor, textColor } = useContext(ThemeContext);
  return (
    <footer
      className="text-gray-600 body-font"
      style={{ backgroundColor: `${bgColor}` }}
    >
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        {/* FOOTER HEADER */}
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          {/* LOGO */}
          <Link
            to={"/"}
            className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"
          >
            <img
              style={{ width: `${theme == "black" ? "130px" : ""}` }}
              src={`${theme == "light" ? imgUrl.current : lightLogo.current}`}
              alt=""
            />
          </Link>
          {/* PARAGRAPHR */}
          <p
            style={{ color: `${textColor}` }}
            className="mt-5 text-[1.4rem] capitalize text-gray-500"
          >
            Air plant banjo lyft occupy retro adaptogen indego
          </p>
        </div>
        {/* FOOTER LINKS */}
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          {links.map((link) => (
            <div key={link.heading} className="lg:w-1/3 md:w-1/2 w-full px-4">
              <h2
                style={{ color: `${textColor}` }}
                className="footer-menu-heading title-font font-medium text-gray-900 tracking-widest text-sm mb-3"
              >
                {link.heading}
              </h2>
              <nav className="list-none mb-10">
                {link.subLinks.map((subLink) => (
                  <li key={subLink}>
                    <a
                      style={{ color: `${textColor}` }}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      {subLink}
                    </a>
                  </li>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>
      {/* LAST PART */}
      <div className="bg-gray-100" style={{ backgroundColor: `${bgColor}` }}>
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          {/* COPYRIGHT */}
          <p
            style={{ color: `${textColor}` }}
            className="text-gray-500 text-[1.7rem] text-center sm:text-left"
          >
            © 2024 SANAULLAH
          </p>
          {/* SOCIAL MEDIA ICONS */}
          <span className="social-media-link inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start gap-5">
            {socialMedia.map((media) => (
              <a
                key={media.id}
                style={{ color: `${textColor}` }}
                className="text-gray-500"
              >
                {media.link}
              </a>
            ))}
          </span>
        </div>
      </div>
      <style>{`
        .footer-menu-heading {
          font-size: 1.7rem;
        }
        nav a {
          font-size: 1.5rem;
        }
        .social-media-link a {
          font-size: 2.6rem;
        }
      `}</style>
    </footer>
  );
}

export default Footer;
