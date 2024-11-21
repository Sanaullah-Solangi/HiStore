import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { MdCameraEnhance } from "react-icons/md";
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
function Profile() {
  const { bgColor, mainColor } = useContext(ThemeContext);
  const { profileDp, setProfileDp } = useContext(LogoUrl);
  const [loader, setLoader] = useState(false);
  const [enability, setEnability] = useState(true);

  const navigate = useNavigate();
  const {
    isUser: { user },
  } = useContext(UserContext);
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
  if (user) {
    const { photoURL } = user;
    return loader ? (
      <Loader />
    ) : (
      // MAIN CONTAINER
      <div
        className="flex flex-col  items-center gap-5 w-full rounded-lg  h-full pb-20"
        style={{ boxShadow: "0 0 10px rgba(0,0,0,0.2)" }}
      >
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
        <div>
          <FormButton
            type={"button"}
            text={"Update Profile"}
            txtColor={"white"}
            buttonVariant={"contained"}
            myFunc={() => {
              setEnability(false);
            }}
          />
        </div>
        {/* DETAILS FORM */}

        <UpdateProfileForm
          enability={enability}
          saveChanges={() => {
            setEnability(true);
          }}
        />
      </div>
    );
  }
}
export default Profile;
