import { useContext, useState } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { UserContext } from "../../../contexts/UserContext";
import Button from "../../../components/ui/Button";
import FormInput from "../../../components/ui/FormInput";

function UpdateProfileForm() {
  const { bgColor, textColor } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    displayName: user.displayName || "",
    phoneNumber: user.phoneNumber || "",
    company: user.company || "",
    city: user.city || "",
    country: user.country || "",
  });

  const inputFields = [
    {
      label: "Dispaly Name",
      name: "displayName",
      value: formData.displayName,
    },
    {
      label: "Phone Number",
      name: "phoneNumber",
      value: formData.phoneNumber,
    },
    {
      label: "Company",
      name: "company",
      value: formData.company,
    },
    {
      label: "City",
      name: "city",
      value: formData.city,
    },
    {
      label: "Country",
      name: "country",
      value: formData.country,
    },
  ];

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
    setIsLoading(true);
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
      const userRef = doc(db, "Users", user.uid);
      await updateDoc(userRef, formData);

      const updatedUser = { ...user, ...formData };
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
      setUser(updatedUser);

      message.success("Profile updated successfully!");
      setIsModalOpen(false);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error updating profile:", error);
      message.error("Failed to update profile");
    }
  };

  return (
    <div
      style={{ background: bgColor, color: textColor }}
      className={`py-7 px-10 `}
    >
      <h1 className="font-bold text-2xl capitalize mb-2">
        Update your profile
      </h1>
      <p className="mb-4">
        Please ensure that all fields are accurate. If no updates are needed,
        simply close this form.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-7">
          {inputFields.map((field) => (
            <div key={field.label}>
              <FormInput
                fullWidth
                label={field.label}
                name={field.name}
                value={field.value}
                onChange={handleChange}
                radius={false}
                required
              />
              {errors.displayName && (
                <p
                  className="text-[0.75rem] mt-[0.25rem] ml-[0.5rem]"
                  style={{ color: "#ef4444" }}
                >
                  {errors.displayName}
                </p>
              )}
            </div>
          ))}
        </div>

        <Button type={"submit"} text={"Update Profile"} />
      </form>
    </div>
  );
}

export default UpdateProfileForm;
