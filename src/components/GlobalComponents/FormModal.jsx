// HOOKS
// IMPORTING CONTEXTS
import { ThemeContext } from "../../contexts/ThemeContext";
// ICONS & OTHER COMPONENTS
import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import UpdateProfileForm from "./UpdateProfile";

const FormModal = ({ isModalOpen, setIsModalOpen, displayName }) => {
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
            remove a space in <span className="font-bold">'{displayName}'</span>
            .
          </p>
          <UpdateProfileForm setIsModalOpen={setIsModalOpen} />
        </>
      </Modal>
    </>
  );
};
export default FormModal;
