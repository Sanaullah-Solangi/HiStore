// IMPORTING ELEMENTS & COMPONENTS
import { Checkbox, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { addUserToDB, signInWithGoogle } from "../../utils/firebase";
// CONTEXT
import FormInput from "./FormInput";
import FormButton from "./FormButton";
import { useTheme } from "../../contexts/ThemeContext";
import googleBtn from "../../assets/images/googlebtn.png";
import { CiUser } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import { IoCallOutline } from "react-icons/io5";
import { LiaCitySolid } from "react-icons/lia";
import { SiNationalrail } from "react-icons/si";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { MdOutlineHomeWork } from "react-icons/md";
import { LuCheckCheck } from "react-icons/lu";
import { TbBuildingEstate } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
// FUNCTION TO INDICATE ANY ERROR
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
// LOGIN FORM COMPONENT
const UpdateProfileForm = ({ logIn, enability, saveChanges }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { theme, color, bgColor, mainColor } = useTheme();
  const {
    isUser: { user },
  } = useContext(UserContext);

  if (user) {
    const {
      email,
      displayName,
      emailVerified,
      phoneNumber,
      company,
      city,
      country,
    } = user;
    return (
      // FORM WRAPPER
      <Form
        form={form}
        name="basic"
        className="profileDetails flex flex-col justify-center items-start shadow-2xl p-4 rounded-md md:w-[50%] w-[90%]"
        initialValues={{
          remember: true,
        }}
        onFinish={() => {
          saveChanges();
        }}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {/* NAME */}
        <div className="w-full text-md grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-0 items-center">
          <span className="w-[90%] flex items-center justify-start gap-2 md:border-b border-gray-300 pb-2">
            <FaRegUser fontSize={"22px"} /> Name :
          </span>
          <FormInput
            name={"displayName"}
            message={"Please input your displayName!"}
            lable={"Profile Name"}
            id={"displayName"}
            value={displayName}
            enability={enability}
          />
        </div>
        {/* EMAIL */}
        <div className="w-full text-md grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-0 items-center">
          <span className="w-[90%] flex items-center justify-start gap-2 md:border-b border-gray-300 pb-2">
            <AiOutlineMail fontSize={"22px"} />
            Email :
          </span>
          <FormInput
            name={"email"}
            message={"Please input your email!"}
            lable={"Email"}
            id={"email"}
            value={email}
            enability={enability}
          />
        </div>
        {/* VARIFICATION */}
        <div className="w-full text-md grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-0 items-center">
          <span className="w-[90%] flex items-center justify-start gap-2 md:border-b border-gray-300 pb-2">
            <LuCheckCheck fontSize={"22px"} />
            Email Varification :
          </span>
          <FormInput
            name={"emailVerified"}
            message={"emailVerified!"}
            lable={"Email Verification"}
            id={"emailVerified"}
            value={emailVerified ? "Done" : "Not Varified"}
            enability={enability}
          />
        </div>
        {/* PHONE NUMBER */}
        <div className="w-full text-md grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-0 items-center">
          <span className="w-[90%] flex items-center justify-start gap-2 md:border-b border-gray-300 pb-2">
            <IoCallOutline fontSize={"22px"} />
            Phone Number :
          </span>
          <FormInput
            name={"phoneNumber"}
            message={"Please input your phone Number!"}
            lable={"Phone Number"}
            id={"phoneNumber"}
            type={phoneNumber || !enability ? "number" : null}
            value={phoneNumber ? phoneNumber : "Not Provided"}
            enability={enability}
          />
        </div>
        {/* COMPANY NAME */}
        <div className="w-full text-md grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-0 items-center">
          <span className="w-[90%] flex items-center justify-start gap-2 md:border-b border-gray-300 pb-2">
            <MdOutlineHomeWork fontSize={"22px"} /> Company :
          </span>
          <FormInput
            name={"company"}
            message={"Please input your Company!"}
            lable={"Company"}
            id={"company"}
            value={company ? company : "Not Provided"}
            enability={enability}
          />
        </div>
        {/* CITY */}
        <div className="w-full text-md grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-0 items-center">
          <span className="w-[90%] flex items-center justify-start gap-2 md:border-b border-gray-300 pb-2">
            <LiaCitySolid fontSize={"22px"} /> City :
          </span>
          <FormInput
            name={"city"}
            message={"Please input your City!"}
            lable={"city"}
            id={"city"}
            value={city ? city : "Not Provided"}
            enability={enability}
          />
        </div>
        {/* COUNTRY */}
        <div className="w-full text-md grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-0 items-center">
          <span className="w-[90%] flex items-center justify-start gap-2 md:border-b border-gray-300 pb-2">
            <TbBuildingEstate fontSize={"22px"} /> Country :
          </span>
          <FormInput
            name={"country"}
            message={"Please input your Country!"}
            lable={"country"}
            id={"country"}
            value={country ? country : "Not Provided"}
            enability={enability}
          />
        </div>

        {/* SUBMIT BTN */}
        <FormButton
          type={"primary"}
          text={"Save Changes"}
          buttonVariant="contained"
        />
      </Form>
    );
  }
};

export default UpdateProfileForm;
