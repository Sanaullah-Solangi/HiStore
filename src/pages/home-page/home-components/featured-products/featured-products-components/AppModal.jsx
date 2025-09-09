// HOOKS
import { useContext } from "react";
// IMPORTING CONTEXTS
import { ThemeContext } from "../../../../../contexts/ThemeContext";
// ICONS & OTHER COMPONENTS
import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import ProductDetails from "./ProductDetails";

const AppModal = ({ isModalOpen, setIsModalOpen, children }) => {
  // CONTEXT
  const { textColor } = useContext(ThemeContext);

  const onCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        onCancel={onCancel}
        footer={false}
        closeIcon={<CloseOutlined className="close-icon" />}
      >
        {children}
      </Modal>
      <style>{`
        .ant-modal-content {
          border-radius:16px;
          overflow:hidden;
        }
        .ant-modal-close {
          top: 1% !important;
          right: 0.1% !important;
        }

        .ant-modal-close:hover .anticon-close {
          color: red !important;
        }
        .anticon-close {
          font-size: 2rem;
          color: ${textColor};
          font-weight: 900;
        }
        .ant-modal{
           width:fit-content !important;
        }
       .ant-modal-wrap::-webkit-scrollbar {
          display: none;
        }
           
         @media(width<=820px){
         .ant-modal{
           width:90% !important;
        }
        }
      `}</style>
    </>
  );
};
export default AppModal;
