import Button from "./Button";
import googleBtn from "../../assets/images/googlebtn.png";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../utils/firebase";
import { useTheme } from "../../contexts/ThemeContext";

function GoogleLogin() {
  const { mainColor } = useTheme();
  const navigate = useNavigate();

  return (
    <>
      <div className="relative w-full z-10 text-center bg-yellow-500 my-7 mb-10">
        <p className="font-bold text-gray-400 cursor-pointer absolute  left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%] bg-white px-3">
          Or Login With
        </p>
        <span className="absolute w-[90%] h-[2px] bg-gray-300 left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%] -z-10"></span>
      </div>

      {/* GOOGLE BTN */}
      <Button
        type={"button"}
        myFunc={() => {
          signInWithGoogle(navigate);
        }}
        imgSrc={googleBtn}
        bgColor={"transparent"}
        txtColor={mainColor}
      />
    </>
  );
}

export default GoogleLogin;
