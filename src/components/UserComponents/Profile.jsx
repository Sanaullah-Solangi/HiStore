import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

function Profile() {
  const {
    isUser: { user },
  } = useContext(UserContext);
  if (user) {
    const { displayName, email, emailVerified, phoneNumber, photoURL } = user;
    return (
      <div
        className="flex gap-5 w-full p-5 rounded-lg"
        style={{ boxShadow: "0 0 10px rgba(0,0,0,0.2)" }}
      >
        <div className="profileImage flex justify-center items-center w-1/3">
          <img
            src={photoURL}
            width={"100%"}
            height={"100%"}
            className="rounded-full"
          />
        </div>
        <div className="profileDetails flex flex-col justify-start items-center gap-10 w-2/3">
          <h1 className="text-4xl font-bold font-mono">Personal Details</h1>
          <div className="details flex flex-col justify-center items-start w-full">
            <div className="w-full text-xl flex items-center justify-between mt-2">
              <span className="w-[30%] whitespace-nowrap font-bold">Name:</span>
              <span className="w-[60%]">{displayName}</span>
            </div>
            <div className="w-full text-xl flex items-center justify-between mt-2">
              <span className="w-[30%] whitespace-nowrap font-bold">
                Email:
              </span>
              <span className="w-[60%]">{email}</span>
            </div>
            <div className="w-full text-xl flex items-center justify-between mt-2">
              <span className="w-[30%] whitespace-nowrap font-bold">
                Email Varification:
              </span>
              <span className="w-[60%]">
                {emailVerified ? "Done" : "Not Varified"}
              </span>
            </div>
            <div className="w-full text-xl flex items-center justify-between mt-2">
              <span className="w-[30%] whitespace-nowrap font-bold">
                Phone Number:
              </span>
              <span className="w-[60%]">
                {phoneNumber ? phoneNumber : "Not Provided"}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;
