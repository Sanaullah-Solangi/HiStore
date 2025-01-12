import React from "react";
import { Space, Button, Tooltip } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

const UserActions = ({ user }) => {
  const handleView = () => {
    // Implement view user details logic
    console.log("View user:", user);
  };

  const handleEdit = () => {
    // Implement edit user logic
    console.log("Edit user:", user);
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Implement delete user logic
        console.log("Delete user:", user);
        Swal.fire("Deleted!", "The user has been deleted.", "success");
      }
    });
  };

  return (
    <Space size="middle">
      <Tooltip title="View Details">
        <Button icon={<EyeOutlined />} onClick={handleView} />
      </Tooltip>
      <Tooltip title="Edit User">
        <Button icon={<EditOutlined />} onClick={handleEdit} />
      </Tooltip>
      <Tooltip title="Delete User">
        <Button icon={<DeleteOutlined />} onClick={handleDelete} danger />
      </Tooltip>
    </Space>
  );
};

export default UserActions;
