// HOOKS
import { useContext, useState } from "react";
// IMPORTING CONTEXTS
import { ThemeContext } from "../../contexts/ThemeContext";
import { CartContext } from "../../contexts/CartContext";
import { UserContext } from "../../contexts/UserContext";
// ICONS & OTHER COMPONENTS
import { Modal, Image } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import UpdateProfileForm from "./UpdateProfile";

const FormModal = ({ isModalOpen, setIsModalOpen, setStates }) => {
  const { isUser } = useContext(UserContext);
  const onCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        className="FormModal md"
        open={isModalOpen}
        onCancel={onCancel}
        footer={false}
        closeIcon={
          <CloseOutlined
            style={{
              fontSize: "20px",
            }}
          />
        }
      >
        <>
          <h1 className="font-bold text-2xl capitalize p-4 pb-2">
            Update your profile
          </h1>
          <p className="px-4">
            Fields are pre-filled. To update, make a small change, e.g., add and
            remove a space in <span className="font-bold">'{isUser?.user?.displayName}'</span>.
          </p>
          <UpdateProfileForm
            setStates={setStates}
            setIsModalOpen={setIsModalOpen}
          />
        </>
      </Modal>
    </>
  );
};
export default FormModal;
