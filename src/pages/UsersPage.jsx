import React, { useState, useContext } from "react";
import { Layout, Typography, Button, Input, Space } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { ThemeContext } from "../contexts/ThemeContext";
import UserTable from "../components/UserComponents/UserTable";
import AddUserModal from "../components/UserComponents/AddUserModal";

const { Content } = Layout;
const { Title } = Typography;

const UsersPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { bgColor, textColor } = useContext(ThemeContext);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  return (
    <Layout
      className="flex-1 overflow-auto transition-all duration-300 ease-in-out"
      style={{ minHeight: "100vh", backgroundColor: bgColor }}
    >
      <Content style={{ paddingInline: "24px", color: textColor }}>
        {/* <StickyHeader /> */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <Title level={2} style={{ color: textColor }}>
            User Management
          </Title>
          <Space>
            <Input
              placeholder="Search users"
              prefix={<SearchOutlined />}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ width: 200 }}
            />
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
              Add New User
            </Button>
          </Space>
        </div>
        <UserTable searchText={searchText} />
        <AddUserModal
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
        />
      </Content>
    </Layout>
  );
};

export default UsersPage;
