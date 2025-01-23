import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { MdCameraEnhance } from "react-icons/md";
import FormButton from "../GlobalComponents/FormButton";
import FormModal from "../GlobalComponents/FormModal";
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
import Loader from "../GlobalComponents/Loader";

function Profile() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const { isUser, setIsUser } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mainColor } = useContext(ThemeContext);

  if (!isUser) return null;

  const {
    email,
    displayName,
    emailVerified,
    phoneNumber,
    company,
    city,
    country,
  } = isUser;

  const updateProfileDP = async (file) => {
    setLoader(true);
    const DPsRef = ref(storage, `usersDP/${file.name}`);
    try {
      message.info("Uploading Your DP");
      const data = await uploadBytes(DPsRef, file);
      message.success("Your DP Is Successfully Uploaded!");
      const DpUrl = await getDownloadURL(DPsRef);
      message.info("Updating Your DP!");
      const userRef = doc(db, "Users", isUser.uid);
      const obj = {
        ...isUser,
        photoURL: DpUrl,
      };
      await updateDoc(userRef, {
        photoURL: DpUrl,
      });
      localStorage.setItem("loggedInUser", JSON.stringify(obj));
      setIsUser(obj);
      message.success("Your DP Is Successfully Updated!");
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log("error of Uploading DP=>", error.message);
    }
  };

  return loader ? (
    <Loader />
  ) : (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-64 overflow-hidden">
          {/* Wave Pattern */}
          <div className="absolute bottom-0 left-0 w-full">
            <svg
              viewBox="0 0 1440 320"
              className="w-full h-auto"
              preserveAspectRatio="none"
            >
              <path
                fill={mainColor}
                fillOpacity="0.15"
                d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              />
            </svg>
          </div>
          {/* Circular Decorations */}
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full"
            style={{ backgroundColor: mainColor, opacity: 0.15 }}
          />
          <div
            className="absolute -top-10 -left-10 w-40 h-40 rounded-full"
            style={{ backgroundColor: mainColor, opacity: 0.15 }}
          />
          <div
            className="absolute top-0 left-0 w-full h-64"
            style={{ backgroundColor: mainColor, opacity: 0.1 }}
          />
        </div>

        <FormModal
          displayName={displayName}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />

        <div className="relative z-10 p-8">
          <h1
            className="text-3xl font-bold mb-8 text-center"
            style={{ color: mainColor }}
          >
            Profile Details
          </h1>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Image Section */}
            <div className="relative w-48 h-48 mx-auto md:mx-0">
              <img
                src={loggedInUser?.photoURL || defaultDp}
                alt={displayName || "Profile Picture"}
                className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
              />
              <label
                htmlFor="updateDP"
                className="absolute bottom-2 right-2 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
                style={{ backgroundColor: mainColor }}
              >
                <MdCameraEnhance className="text-white text-xl" />
                <input
                  type="file"
                  id="updateDP"
                  className="hidden"
                  onChange={(e) => updateProfileDP(e.target.files[0])}
                />
              </label>
            </div>

            {/* Info Section */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-500">Full Name</label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    {displayName || "Not Provided"}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-500">Email Address</label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    {email}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-500">Phone Number</label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    {phoneNumber || "Not Provided"}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-500">Email Status</label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    {emailVerified ? "Verified" : "Not Verified"}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-500">Company</label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    {company || "Not Provided"}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-500">City</label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    {city || "Not Provided"}
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm text-gray-500">Country</label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    {country || "Not Provided"}
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <FormButton
                  type="primary"
                  text="Update Profile"
                  buttonVariant="contained"
                  myFunc={() => setIsModalOpen(true)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            viewBox="0 0 1440 320"
            className="w-full h-auto transform rotate-360"
            preserveAspectRatio="none"
          >
            <path
              fill={mainColor}
              fillOpacity="0.15"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>

        {/* Additional Decorative Circles */}
        <div
          className="absolute bottom-20 right-10 w-32 h-32 rounded-full"
          style={{ backgroundColor: mainColor, opacity: 0.15 }}
        />
        <div
          className="absolute bottom-40 left-10 w-24 h-24 rounded-full"
          style={{ backgroundColor: mainColor, opacity: 0.15 }}
        />
      </div>
    </div>
  );
}

export default Profile;
