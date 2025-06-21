import React, { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { UserContext } from "../../contexts/UserContext";
import { db, doc, updateDoc } from "../../utils/firebase";
import { message } from "antd";
import {
  Container,
  Card,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme, mainColor, isDark }) => ({
  padding: "2rem",
  borderRadius: "16px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  background: isDark ? "#1a1a1a" : "#ffffff",
  color: isDark ? "#ffffff" : "#000000",
}));

const StyledTextField = styled(TextField)(({ theme, mainColor }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(0, 0, 0, 0.23)",
      transition: "border-color 0.3s",
    },
    "&:hover fieldset": {
      borderColor: mainColor,
    },
    "&.Mui-focused fieldset": {
      borderColor: mainColor,
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: mainColor,
  },
}));

const SubmitButton = styled(Button)(({ mainColor }) => ({
  backgroundColor: mainColor,
  color: "white",
  padding: "0.75rem 1.5rem",
  borderRadius: "12px",
  fontSize: "1rem",
  fontWeight: "600",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: mainColor,
    opacity: 0.9,
    transform: "translateY(-2px)",
    boxShadow: `0 4px 12px ${mainColor}66`,
  },
}));

const ValidationMessage = styled(Typography)(({ isError }) => ({
  fontSize: "0.75rem",
  color: isError ? "#ef4444" : "#10b981",
  marginTop: "0.25rem",
  marginLeft: "0.5rem",
}));

function UpdateProductForm({ setIsModalOpen }) {
  const { mainColor, isDark } = useContext(ThemeContext);
  const { isUser, setIsUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    displayName: isUser.displayName || "",
    phoneNumber: isUser.phoneNumber || "",
    company: isUser.company || "",
    city: isUser.city || "",
    country: isUser.country || "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    if (!formData.displayName)
      newErrors.displayName = "Display name is required";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone number is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      message.error("Please fill in all required fields");
      return;
    }

    try {
      const userRef = doc(db, "Users", isUser.uid);
      await updateDoc(userRef, formData);

      const updatedUser = { ...isUser, ...formData };
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
      setIsUser(updatedUser);

      message.success("Profile updated successfully!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("Failed to update profile");
    }
  };

  return (
    <Container maxWidth="sm">
      <StyledCard mainColor={mainColor} isDark={isDark}>
        <Typography variant="h5" align="center" gutterBottom>
          Update Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 2,
            }}
          >
            <Box>
              <StyledTextField
                fullWidth
                label="Display Name"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                required
                mainColor={mainColor}
              />
              {errors.displayName && (
                <ValidationMessage isError>
                  {errors.displayName}
                </ValidationMessage>
              )}
            </Box>
            <Box>
              <StyledTextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                mainColor={mainColor}
              />
              {errors.phoneNumber && (
                <ValidationMessage isError>
                  {errors.phoneNumber}
                </ValidationMessage>
              )}
            </Box>
            <Box>
              <StyledTextField
                fullWidth
                label="Company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                mainColor={mainColor}
              />
            </Box>
            <Box>
              <StyledTextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                mainColor={mainColor}
              />
            </Box>
            <Box sx={{ gridColumn: { xs: "1", md: "1 / -1" } }}>
              <StyledTextField
                fullWidth
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                mainColor={mainColor}
              />
            </Box>
          </Box>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <SubmitButton type="submit" mainColor={mainColor}>
              Update Profile
            </SubmitButton>
          </Box>
        </form>
      </StyledCard>
    </Container>
  );
}

export default UpdateProductForm;
