// IMPORTING ELEMENTS & COMPONENTS
import { Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import { db, doc, updateDoc } from "../../utils/firebase";
// CONTEXT
import FormInput from "./FormInput";
import FormButton from "./FormButton";
import { useTheme } from "../../contexts/ThemeContext";
import { AiOutlineMail } from "react-icons/ai";
import { IoCallOutline } from "react-icons/io5";
import { LiaCitySolid } from "react-icons/lia";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { MdOutlineHomeWork } from "react-icons/md";
import { LuCheckCheck } from "react-icons/lu";
import { TbBuildingEstate } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import Loader from "./Loader";
// FUNCTION TO INDICATE ANY ERROR
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
// UPDATE PROFILE FORM COMPONENT
const UpdateProfileForm = ({ setIsModalOpen }) => {
  const [form] = Form.useForm();
  const { theme, color, bgColor, mainColor } = useTheme();
  const [loader, setLoader] = useState(false);
  const { isUser, setIsUser } = useContext(UserContext);
  if (isUser) {
    const {
      email,
      displayName,
      emailVerified,
      phoneNumber,
      company,
      city,
      country,
    } = isUser;

    return loader ? (
      <Loader />
    ) : (
      // FORM WRAPPER
      <Form
        form={form}
        name="basic"
        className="profileDetails flex flex-col justify-center items-start shadow-2xl p-4 rounded-md  w-full"
        initialValues={{
          email,
          displayName,
          emailVerified,
          phoneNumber,
          company,
          city,
          country,
        }}
        onFinish={async () => {
          const values = form.getFieldValue();
          const obj = {
            ...isUser,
            ...values,
          };
          console.log(obj);
          setLoader(true);
          try {
            const userRef = doc(db, "Users", isUser.uid);
            const updated = await updateDoc(userRef, {
              ...obj,
            });
            setIsUser(obj);
            setIsModalOpen(false);
            setLoader(false);
            message.success("Your Profile Is Successfully Updated!");
          } catch (error) {
            setLoader(false);
            console.log("error of Uploading DP=>", error);
          }
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
          />
        </div>

        {/* SUBMIT BTN */}
        <FormButton
          type={"submit"}
          text={"Save Changes"}
          buttonVariant="contained"
        />
      </Form>
    );
  }
};

export default UpdateProfileForm;
