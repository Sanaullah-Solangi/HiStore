import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { MdCameraEnhance, MdOutlineHomeWork } from "react-icons/md";
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
import { useNavigate } from "react-router-dom";
import Loader from "../GlobalComponents/Loader";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { LuCheckCheck } from "react-icons/lu";
import { IoCallOutline } from "react-icons/io5";
import { LiaCitySolid } from "react-icons/lia";
import { TbBuildingEstate } from "react-icons/tb";
import { Card, Container, Paper, Typography, Box, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";

const ProfileHeader = styled(Box)(({ theme, mainColor }) => ({
  background: `linear-gradient(135deg, ${mainColor} 0%, ${mainColor}dd 100%)`,
  padding: "2rem",
  borderRadius: "16px 16px 0 0",
  position: "relative",
  marginBottom: "4rem",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 150,
  height: 150,
  border: "4px solid white",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  position: "absolute",
  bottom: 0,
  left: "50%",
  transform: "translate(-50%, 50%)",
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  padding: "1rem",
  borderRadius: "12px",
  backgroundColor: "#f8f9fa",
  marginBottom: "1rem",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#f1f3f5",
    transform: "translateY(-5px)",
  },
}));

function Profile() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const { isUser, setIsUser } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mainColor } = useContext(ThemeContext);
  const navigate = useNavigate();

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
    <Container
      maxWidth="md"
      sx={{ py: 4 }}
      className="h-screen overflow-y-auto adminProfile"
    >
      <Card sx={{ borderRadius: "16px", overflow: "visible" }}>
        <FormModal
          displayName={displayName}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />

        <ProfileHeader mainColor={mainColor}>
          <Typography variant="h4" color="white" textAlign="center" mb={8}>
            Profile Details
          </Typography>
          <ProfileAvatar
            src={loggedInUser?.photoURL || defaultDp}
            alt={displayName}
          >
            {displayName?.charAt(0)}
          </ProfileAvatar>
          <label
            htmlFor="updateDP"
            style={{
              position: "absolute",
              bottom: "-75px",
              right: "calc(50% - 100px)",
              backgroundColor: "#fff",
              borderRadius: "50%",
              padding: "8px",
              cursor: "pointer",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              zIndex: 1,
            }}
          >
            <MdCameraEnhance size={24} color={mainColor} />
            <input
              type="file"
              id="updateDP"
              hidden
              onChange={(e) => updateProfileDP(e.target.files[0])}
            />
          </label>
        </ProfileHeader>

        <Box sx={{ p: 4, pt: 6 }}>
          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-2">
            <InfoItem>
              <FaRegUser size={24} color={mainColor} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Name
                </Typography>
                <Typography>{displayName || "Not Provided"}</Typography>
              </Box>
            </InfoItem>

            <InfoItem>
              <AiOutlineMail size={24} color={mainColor} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Email
                </Typography>
                <Typography>{email}</Typography>
              </Box>
            </InfoItem>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-2">
            <InfoItem>
              <LuCheckCheck size={24} color={mainColor} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Email Verification
                </Typography>
                <Typography>
                  {emailVerified ? "Verified" : "Not Verified"}
                </Typography>
              </Box>
            </InfoItem>

            <InfoItem>
              <IoCallOutline size={24} color={mainColor} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Phone Number
                </Typography>
                <Typography>{phoneNumber || "Not Provided"}</Typography>
              </Box>
            </InfoItem>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-2">
            <InfoItem>
              <MdOutlineHomeWork size={24} color={mainColor} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Company
                </Typography>
                <Typography>{company || "Not Provided"}</Typography>
              </Box>
            </InfoItem>

            <InfoItem>
              <LiaCitySolid size={24} color={mainColor} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  City
                </Typography>
                <Typography>{city || "Not Provided"}</Typography>
              </Box>
            </InfoItem>
          </div>

          <InfoItem>
            <TbBuildingEstate size={24} color={mainColor} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Country
              </Typography>
              <Typography>{country || "Not Provided"}</Typography>
            </Box>
          </InfoItem>

          <Box sx={{ mt: 4, textAlign: "center" }}>
            <FormButton
              type="primary"
              text="Update Profile"
              buttonVariant="contained"
              myFunc={() => setIsModalOpen(true)}
            />
          </Box>
        </Box>
      </Card>
    </Container>
  );
}

export default Profile;
