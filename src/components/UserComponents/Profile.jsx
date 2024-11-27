import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { MdCameraEnhance, MdOutlineHomeWork } from "react-icons/md";
import FormButton from "../GlobalComponents/FormButton";
import UpdateProfileForm from "../GlobalComponents/UpdateProfile";
import defaultDp from "../../assets/images/dp.jpeg";
import {
  db,
  doc,
  getDownloadURL,
  ref,
  storage,
  updateDoc,
  uploadBytes,
} from "../../utils/firebase";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import Loader from "../GlobalComponents/Loader";
import { LogoUrl } from "../../contexts/LogoContext";
import FormInput from "../GlobalComponents/FormInput";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { LuCheckCheck } from "react-icons/lu";
import { IoCallOutline } from "react-icons/io5";
import { LiaCitySolid } from "react-icons/lia";
import { TbBuildingEstate } from "react-icons/tb";
import FormModal from "../GlobalComponents/FormModal";
function Profile() {
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
      photoURL,
    } = user;
    // CONTEXTS
    const { mainColor } = useContext(ThemeContext);
    const { profileDp, setProfileDp } = useContext(LogoUrl);
    // STATES
    const [emailState, setEmail] = useState(email);
    const [displayNameState, setDisplayName] = useState(displayName);
    const [emailVerifiedState, setEmailVerified] = useState(emailVerified);
    const [phoneNumberState, setPhoneNumber] = useState(phoneNumber);
    const [companyState, setCompany] = useState(company);
    const [cityState, setCity] = useState(city);
    const [countryState, setCountry] = useState(country);
    const [loader, setLoader] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    setProfileDp(photoURL);
    //! FUNCTION TO UPDATE PROFILE DP
    const updateProfileDP = async (file) => {
      setLoader(true);
      const DPsRef = ref(storage, `usersDP/${file.name}`);
      try {
        message.info("Uploading Your DP");
        const data = await uploadBytes(DPsRef, file);
        message.success("Your DP Is Susseccfully Uploaded!");
        const DpUrl = await getDownloadURL(DPsRef);
        message.info("Updating Your DP!");
        const userRef = doc(db, "Users", user.uid);
        const updated = await updateDoc(userRef, {
          photoURL: DpUrl,
        });
        message.success("Your DP Is Successfully Updated!");
        setProfileDp(DpUrl);

        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.log("error of Uploading DP=>", error.message);
      }
    };
    //! FUNCTION TO SET STATES
    const setStates = (
      email,
      displayName,
      emailVerified,
      phoneNumber,
      company,
      city,
      country
    ) => {
      setEmail(email);
      setDisplayName(displayName);
      setEmailVerified(emailVerified);
      setPhoneNumber(phoneNumber);
      setCompany(company);
      setCity(city);
      setCountry(country);
    };
    return loader ? (
      <Loader />
    ) : (
      // MAIN CONTAINER
      <div
        className="flex flex-col  items-center gap-5 w-full rounded-lg  h-full pb-20"
        style={{ boxShadow: "0 0 10px rgba(0,0,0,0.2)" }}
      >
        <FormModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setStates={setStates}
        />
        {/* PROFILE HEADER */}
        <div
          className="profileImage flex justify-center  items-center w-full h-[160px] relative mb-20"
          style={{ backgroundColor: `${mainColor}` }}
        >
          {/* HEADING */}
          <h1 className="text-white font-medium text-2xl mb-10">
            Profile Details
          </h1>
          {/* DP WRAPPER */}
          <div className="w-[170px] h-[170px] overflowh rounded-[100%] absolute left-[50%] -translate-x-[50%] bottom-[0%] translate-y-[50%] flex justify-center items-center p-2 bg-white">
            {/* DP */}
            <img
              src={profileDp ? profileDp : defaultDp}
              width={"100%"}
              height={"100%"}
              className="rounded-full "
            />
            {/* LABEL OF UPDATE DP BTN */}
            <label
              htmlFor="updateDP"
              className=" rounded-[100%] absolute left-[70%]  top-[0] flex justify-center items-center p-2 bg-gray-200 cursor-pointer"
            >
              {/* CAMERA ICON */}
              <MdCameraEnhance fontSize={"22px"} />
              {/* INPUT FOR UPDATE DP */}
              <input
                type="file"
                name="updateDP"
                id="updateDP"
                className="hidden"
                onChange={(e) => {
                  console.log("Updating Profile DP=>", e.target.files[0]);
                  updateProfileDP(e.target.files[0]);
                }}
              />
            </label>
          </div>
        </div>
        <div></div>
        {/*================ DETAILS FORM ================*/}
        <div className="profileDetails flex flex-col justify-center items-start shadow-2xl p-4 rounded-md md:w-[50%] w-[90%]">
          {/* NAME */}
          <div className="w-full text-md grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-0 items-center">
            <span className="w-[90%] flex items-center justify-start gap-2 md:border-b border-gray-300 pb-2 md:mb-5">
              <FaRegUser fontSize={"22px"} /> Name :
            </span>
            <span className="w-[90%] flex items-center justify-start gap-2 border md:border-b border-gray-300 rounded-full md:pb-2 p-2 mb-5 ">
              {displayNameState ? displayNameState : "Not Provided"}
            </span>
          </div>
          {/* EMAIL */}
          <div className="w-full text-md grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-0 items-center">
            <span className="w-[90%] flex items-center justify-start gap-2 md:border-b border-gray-300 pb-2 md:mb-5">
              <AiOutlineMail fontSize={"22px"} />
              Email :
            </span>

            <span className="w-[90%] flex items-center justify-start gap-2 border md:border-b border-gray-300 rounded-full md:pb-2 p-2 mb-5 ">
              {emailState}
            </span>
          </div>
          {/* VARIFICATION */}
          <div className="w-full text-md grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-0 items-center">
            <span className="w-[90%] flex items-center justify-start gap-2 md:border-b border-gray-300 pb-2 md:mb-5">
              <LuCheckCheck fontSize={"22px"} />
              Email Varification :
            </span>
            <span className="w-[90%] flex items-center justify-start gap-2 border md:border-b border-gray-300 rounded-full md:pb-2 p-2 mb-5 ">
              {emailVerifiedState ? "Done" : "Not Varified"}
            </span>
          </div>
          {/* PHONE NUMBER */}
          <div className="w-full text-md grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-0 items-center">
            <span className="w-[90%] flex items-center justify-start gap-2 md:border-b border-gray-300 pb-2 md:mb-5">
              <IoCallOutline fontSize={"22px"} />
              Phone Number :
            </span>
            <span className="w-[90%] flex items-center justify-start gap-2 border md:border-b border-gray-300 rounded-full md:pb-2 p-2 mb-5 ">
              {phoneNumberState ? phoneNumberState : "Not Provided"}
            </span>
          </div>
          {/* COMPANY NAME */}
          <div className="w-full text-md grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-0 items-center">
            <span className="w-[90%] flex items-center justify-start gap-2 md:border-b border-gray-300 pb-2 md:mb-5">
              <MdOutlineHomeWork fontSize={"22px"} /> Company :
            </span>

            <span className="w-[90%] flex items-center justify-start gap-2 border md:border-b border-gray-300 rounded-full md:pb-2 p-2 mb-5 ">
              {companyState ? companyState : "Not Provided"}
            </span>
          </div>
          {/* CITY */}
          <div className="w-full text-md grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-0 items-center">
            <span className="w-[90%] flex items-center justify-start gap-2 md:border-b border-gray-300 pb-2 md:mb-5">
              <LiaCitySolid fontSize={"22px"} /> City :
            </span>
            <span className="w-[90%] flex items-center justify-start gap-2 border md:border-b border-gray-300 rounded-full md:pb-2 p-2 mb-5 ">
              {cityState ? cityState : "Not Provided"}
            </span>
          </div>
          {/* COUNTRY */}
          <div className="w-full text-md grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-0 items-center">
            <span className="w-[90%] flex items-center justify-start gap-2 md:border-b border-gray-300 pb-2 md:mb-5">
              <TbBuildingEstate fontSize={"22px"} /> Country :
            </span>
            <span className="w-[90%] flex items-center justify-start gap-2 border md:border-b border-gray-300 rounded-full md:pb-2 p-2 mb-5 ">
              {countryState ? countryState : "Not Provided"}
            </span>
          </div>

          {/* SUBMIT BTN */}
          <FormButton
            type={"primary"}
            text={"Update Profile"}
            buttonVariant="contained"
            myFunc={() => {
              setIsModalOpen(true);
            }}
          />
        </div>
        {/* <UpdateProfileForm
          enability={enability}
          updateProfileFields={updateProfileFields}
        /> */}
      </div>
    );
  }
}
export default Profile;
