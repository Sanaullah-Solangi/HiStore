import React, { useState, useEffect, useContext } from "react";
import { Table, Tag } from "antd";
import { ThemeContext } from "../../contexts/ThemeContext";
import UserActions from "../../actions/UserActions";

const UserTable = ({ searchText }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { bgColor, textColor } = useContext(ThemeContext);
  console.log("bgColor", bgColor);
  useEffect(() => {
    // Dummy users for UI testing
    const dummyUsers = [
      {
        uid: "1",
        displayName: "John Doe",
        photoURL: "https://randomuser.me/api/portraits/men/1.jpg",
        email: "john.doe@example.com",
        phoneNumber: "+1234567890",
        emailVerified: true,
        company: "Tech Corp",
        city: "New York",
        country: "USA",
        role: "User",
        status: "Active",
      },
      {
        uid: "2",
        displayName: "Jane Smith",
        photoURL: "https://randomuser.me/api/portraits/women/2.jpg",
        email: "jane.smith@example.com",
        phoneNumber: "+0987654321",
        emailVerified: false,
        company: "Creative Solutions",
        city: "Los Angeles",
        country: "USA",
        role: "Admin",
        status: "Blocked",
      },
      {
        uid: "3",
        displayName: "Ali Khan",
        photoURL: "https://randomuser.me/api/portraits/men/3.jpg",
        email: "ali.khan@example.com",
        phoneNumber: "+923001234567",
        emailVerified: true,
        company: "HiStore",
        city: "Karachi",
        country: "Pakistan",
        role: "User",
        status: "Active",
      },
    ];

    setUsers(dummyUsers);
    setFilteredUsers(dummyUsers);
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.displayName.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase()) ||
        user.phoneNumber.includes(searchText)
    );
    setFilteredUsers(filtered);
  }, [searchText, users]);

  const columns = [
    {
      title: "Name",
      dataIndex: "displayName",
      key: "displayName",
      sorter: (a, b) => a.displayName.localeCompare(b.displayName),
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record.photoURL || "https://via.placeholder.com/32"}
            alt={text}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              marginRight: 8,
            }}
          />
          {text}
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Verified",
      dataIndex: "emailVerified",
      key: "emailVerified",
      render: (verified) => (
        <Tag color={verified ? "green" : "red"}>
          {verified ? "Verified" : "Not Verified"}
        </Tag>
      ),
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Location",
      key: "location",
      render: (_, record) => `${record.city}, ${record.country}`,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => <UserActions user={record} />,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={filteredUsers}
      rowKey="uid"
      style={{ backgroundColor: bgColor, color: textColor }}
    />
  );
};

export default UserTable;
