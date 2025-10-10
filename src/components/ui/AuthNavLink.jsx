import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";

function AuthNavLink({ path, title, para }) {
  const { textColor } = useTheme();
  return (
    <p style={{ color: `${textColor}` }} className="my-5 text-2xl">
      {para}{" "}
      <Link to={path} className="text-blue-500 font-bold">
        {title}
      </Link>
    </p>
  );
}

export default AuthNavLink;
