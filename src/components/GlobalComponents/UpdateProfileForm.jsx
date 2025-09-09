// IMPORTING ELEMENTS & COMPONENTS
import { Form, message } from "antd";
import { db, doc, updateDoc } from "../../utils/firebase";
// CONTEXT
import FormInput from "../ui/FormInput";
import Button from "../ui/Button";
import { AiOutlineMail } from "react-icons/ai";
import { IoCallOutline } from "react-icons/io5";
import { LiaCitySolid } from "react-icons/lia";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { MdOutlineHomeWork } from "react-icons/md";
import { LuCheckCheck } from "react-icons/lu";
import { TbBuildingEstate } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import Loader from "../ui/Loader";

// INPUT FIELDS DATA
const inputFields = [
  {
    id: "displayName",
    name: "displayName",
    icon: <FaRegUser fontSize={"22px"} />,
    title: "Name",
    lable: "Profile Name",
    message: "Please input your displayName!",
  },
  {
    id: "email",
    name: "email",
    icon: <AiOutlineMail fontSize={"22px"} />,
    title: "Email",
    lable: "Email",
    message: "Please input your email!",
  },
  {
    id: "emailVerified",
    name: "emailVerified",
    icon: <LuCheckCheck fontSize={"22px"} />,
    title: "Email Varification",
    lable: "Email",
    message: "Please input your email!",
  },
  {
    id: "phoneNumber",
    name: "phoneNumber",
    icon: <IoCallOutline fontSize={"22px"} />,
    title: "Phone Number",
    lable: "Phone Number",
    message: "Please input your Phone Number",
  },
  {
    id: "company",
    name: "company",
    icon: <MdOutlineHomeWork fontSize={"22px"} />,
    title: "Company",
    lable: "Company",
    message: "Please input your Company",
  },
  {
    id: "city",
    name: "city",
    icon: <LiaCitySolid fontSize={"22px"} />,
    title: "City",
    lable: "City",
    message: "Please input your City",
  },
  {
    id: "country",
    name: "country",
    icon: <TbBuildingEstate fontSize={"22px"} />,
    title: "Country",
    lable: "Country",
    message: "Please input your Country",
  },
];
// FUNCTION TO INDICATE ANY ERROR
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
// UPDATE PROFILE FORM COMPONENT
const UpdateProfileForm = ({ setIsModalOpen }) => {
  const [form] = Form.useForm();
  const [loader, setLoader] = useState(false);
  const { user, setUser } = useContext(UserContext);
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
            ...user,
            ...values,
          };
          console.log(obj);
          setLoader(true);
          try {
            const userRef = doc(db, "Users", user.uid);
            const updated = await updateDoc(userRef, {
              ...obj,
            });
            setUser(obj);
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
        {/* INPUT FIELDS */}
        {inputFields.map((field) => (
          <div className="w-full text-md grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-0 items-center">
            <span className="w-[90%] flex items-center justify-start gap-2 md:border-b border-gray-300 pb-2">
              {field.icon} {field.title} :
            </span>
            <FormInput
              id={field.id}
              name={field.name}
              message={field.message}
              lable={field.lable}
            />
          </div>
        ))}

        {/* SUBMIT BTN */}
        <Button
          type={"submit"}
          text={"Save Changes"}
          buttonVariant="contained"
        />
      </Form>
    );
  }
};

export default UpdateProfileForm;
