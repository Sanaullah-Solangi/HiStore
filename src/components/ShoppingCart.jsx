import {
  Layout,
  Row,
  Col,
  Input,
  Button,
  Card,
  Checkbox,
  InputNumber,
  Divider,
  Space,
  Typography,
  Badge,
} from "antd";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  HeartOutlined,
  CloseOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const ShoppingCart = () => {
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Header */}
      <Header
        style={{
          height: "auto",
          padding: 0,
          backgroundColor: "#333",
          color: "white",
        }}
      >
        <Row align="middle" style={{ padding: "8px 16px" }}>
          <Col span={4}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  backgroundColor: "black",
                  color: "white",
                  padding: "2px 6px",
                  fontWeight: "bold",
                  fontSize: "12px",
                }}
              >
                LOGO
              </div>
              <span style={{ marginLeft: "8px", fontSize: "12px" }}>
                Site / Shopping Cart
              </span>
            </div>
          </Col>
          <Col span={12}>
            <Input
              prefix={<SearchOutlined />}
              suffix={
                <Button
                  type="primary"
                  size="small"
                  style={{ backgroundColor: "#333", border: "none" }}
                >
                  GO
                </Button>
              }
              placeholder="Search for..."
              style={{ width: "100%" }}
            />
          </Col>
          <Col span={8}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <Badge count={1}>
                <ShoppingCartOutlined
                  style={{ fontSize: "18px", color: "white" }}
                />
              </Badge>
              <UserOutlined style={{ fontSize: "18px", color: "white" }} />
              <div style={{ fontSize: "12px" }}>My Account ▼</div>
            </div>
          </Col>
        </Row>
      </Header>

      {/* Yellow Bar */}
      <div
        style={{ height: "8px", backgroundColor: "#FFDE59", width: "100%" }}
      />

      {/* Navigation Menu */}
      <div
        style={{
          backgroundColor: "white",
          padding: "8px 16px",
          borderBottom: "1px solid #eee",
        }}
      >
        <Row>
          <Col span={24}>
            <Space size={24}>
              <span style={{ fontWeight: "bold" }}>HOME</span>
              <span>SHOP</span>
              <span>ABOUT</span>
              <span>CONTACT</span>
              <span>BLOG</span>
            </Space>
          </Col>
        </Row>
      </div>

      {/* Main Content */}
      <Content style={{ padding: "24px", backgroundColor: "#f5f5f5" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Card style={{ borderRadius: 0 }}>
            <Title level={4} style={{ marginTop: 0 }}>
              Shopping Cart
            </Title>

            {/* Delivery Options */}
            <div style={{ marginBottom: "16px" }}>
              <Checkbox>
                Ship items separately (Not all items ship to all locations)
              </Checkbox>
              <br />
              <Checkbox>
                Combine items in one shipping location (Saves on shipping)
              </Checkbox>
            </div>

            {/* Product List */}
            <Card
              style={{
                marginBottom: "24px",
                borderRadius: 0,
                border: "1px solid #ddd",
              }}
            >
              <Row gutter={16} align="middle">
                <Col span={4}>
                  <div style={{ textAlign: "center", fontWeight: "bold" }}>
                    PHOTO
                  </div>
                </Col>
                <Col span={12}>
                  <div style={{ fontWeight: "bold" }}>ITEM</div>
                </Col>
                <Col span={3} style={{ textAlign: "center" }}>
                  <div style={{ fontWeight: "bold" }}>QUANTITY</div>
                </Col>
                <Col span={3} style={{ textAlign: "center" }}>
                  <div style={{ fontWeight: "bold" }}>SUBTOTAL</div>
                </Col>
                <Col span={2} style={{ textAlign: "center" }}>
                  <CloseOutlined />
                </Col>
              </Row>

              <Divider style={{ margin: "12px 0" }} />

              {/* Product Item */}
              <Row gutter={16} align="middle">
                <Col span={4}>
                  <div
                    style={{
                      width: "100%",
                      height: "100px",
                      backgroundColor: "#8B0000",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    GIFT CARD IMAGE
                  </div>
                </Col>
                <Col span={12}>
                  <div style={{ fontWeight: "bold" }}>Gift Card</div>
                  <div style={{ fontSize: "12px", color: "#666" }}>
                    <div>Description line 1</div>
                    <div>Description line 2</div>
                    <div>Description line 3</div>
                  </div>
                </Col>
                <Col span={3} style={{ textAlign: "center" }}>
                  <InputNumber
                    min={1}
                    defaultValue={1}
                    style={{ width: "60px" }}
                  />
                </Col>
                <Col span={3} style={{ textAlign: "center" }}>
                  <div>$25.00</div>
                </Col>
                <Col span={2} style={{ textAlign: "center" }}>
                  <DeleteOutlined />
                </Col>
              </Row>

              <Divider style={{ margin: "12px 0" }} />

              <Row>
                <Col span={24}>
                  <Space>
                    <Button icon={<HeartOutlined />}>Save for later</Button>
                  </Space>
                </Col>
              </Row>
            </Card>

            {/* Summary Section */}
            <Row>
              <Col span={24}>
                <Title level={5} style={{ marginTop: 0 }}>
                  Summary
                </Title>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Button
                  type="primary"
                  block
                  style={{
                    marginBottom: "12px",
                    backgroundColor: "#FFDE59",
                    borderColor: "#FFDE59",
                    color: "black",
                    height: "40px",
                  }}
                >
                  Continue Shopping
                </Button>

                <Button
                  block
                  style={{
                    backgroundColor: "white",
                    borderColor: "#ddd",
                    height: "40px",
                  }}
                >
                  Proceed to Cart
                </Button>
              </Col>

              <Col span={12}>
                <Card
                  style={{
                    borderRadius: 0,
                    marginBottom: "16px",
                    border: "1px solid #ddd",
                  }}
                >
                  <Row justify="space-between" style={{ marginBottom: "8px" }}>
                    <Col>Subtotal</Col>
                    <Col>$25.00</Col>
                  </Row>
                  <Row justify="space-between" style={{ marginBottom: "8px" }}>
                    <Col>Shipping</Col>
                    <Col>$5.00</Col>
                  </Row>
                  <Divider style={{ margin: "8px 0" }} />
                  <Row justify="space-between" style={{ fontWeight: "bold" }}>
                    <Col>Total</Col>
                    <Col>$30.00</Col>
                  </Row>

                  <Button
                    type="primary"
                    block
                    style={{
                      marginTop: "16px",
                      backgroundColor: "#FFDE59",
                      borderColor: "#FFDE59",
                      color: "black",
                      height: "40px",
                    }}
                  >
                    PROCEED TO CHECKOUT
                  </Button>
                </Card>
              </Col>
            </Row>
          </Card>
        </div>
      </Content>

      {/* Yellow Bar */}
      <div
        style={{ height: "8px", backgroundColor: "#FFDE59", width: "100%" }}
      />

      {/* Footer */}
      <Footer
        style={{ backgroundColor: "#333", padding: "24px", color: "white" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Row gutter={24}>
            <Col span={4}>
              <div
                style={{
                  backgroundColor: "black",
                  color: "white",
                  padding: "2px 6px",
                  fontWeight: "bold",
                  fontSize: "12px",
                  display: "inline-block",
                  marginBottom: "16px",
                }}
              >
                LOGO
              </div>
              <div style={{ fontSize: "12px", color: "#aaa" }}>
                <div>Address line 1</div>
                <div>Address line 2</div>
                <div>Phone: +1 234 567 890</div>
                <div>Email: info@example.com</div>
              </div>
            </Col>

            <Col span={5}>
              <div
                style={{
                  fontWeight: "bold",
                  marginBottom: "12px",
                  fontSize: "14px",
                }}
              >
                INFORMATION
              </div>
              <div style={{ fontSize: "12px", color: "#aaa" }}>
                <div style={{ marginBottom: "8px" }}>About Us</div>
                <div style={{ marginBottom: "8px" }}>Delivery Information</div>
                <div style={{ marginBottom: "8px" }}>Privacy Policy</div>
                <div style={{ marginBottom: "8px" }}>Terms & Conditions</div>
                <div style={{ marginBottom: "8px" }}>Contact Us</div>
              </div>
            </Col>

            <Col span={5}>
              <div
                style={{
                  fontWeight: "bold",
                  marginBottom: "12px",
                  fontSize: "14px",
                }}
              >
                CUSTOMER SERVICE
              </div>
              <div style={{ fontSize: "12px", color: "#aaa" }}>
                <div style={{ marginBottom: "8px" }}>Site Map</div>
                <div style={{ marginBottom: "8px" }}>Wish List</div>
                <div style={{ marginBottom: "8px" }}>Brand</div>
                <div style={{ marginBottom: "8px" }}>Gift Certificates</div>
                <div style={{ marginBottom: "8px" }}>Affiliate</div>
                <div style={{ marginBottom: "8px" }}>Specials</div>
              </div>
            </Col>

            <Col span={5}>
              <div
                style={{
                  fontWeight: "bold",
                  marginBottom: "12px",
                  fontSize: "14px",
                }}
              >
                EXTRAS
              </div>
              <div style={{ fontSize: "12px", color: "#aaa" }}>
                <div style={{ marginBottom: "8px" }}>Brands</div>
                <div style={{ marginBottom: "8px" }}>Gift Certificates</div>
                <div style={{ marginBottom: "8px" }}>Affiliate</div>
                <div style={{ marginBottom: "8px" }}>Specials</div>
              </div>
            </Col>

            <Col span={5}>
              <div
                style={{
                  fontWeight: "bold",
                  marginBottom: "12px",
                  fontSize: "14px",
                }}
              >
                MY ACCOUNT
              </div>
              <div style={{ fontSize: "12px", color: "#aaa" }}>
                <div style={{ marginBottom: "8px" }}>My Account</div>
                <div style={{ marginBottom: "8px" }}>Order History</div>
                <div style={{ marginBottom: "8px" }}>Wish List</div>
                <div style={{ marginBottom: "8px" }}>Newsletter</div>
              </div>
              <Button
                type="primary"
                style={{
                  marginTop: "12px",
                  backgroundColor: "#555",
                  borderColor: "#555",
                  fontSize: "12px",
                }}
              >
                SUBSCRIBE
              </Button>
            </Col>
          </Row>

          <Divider style={{ borderColor: "#555", margin: "16px 0" }} />

          <Row justify="center">
            <Col>
              <Space>
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: "#FFDE59",
                    borderRadius: "50%",
                  }}
                ></div>
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: "#555",
                    borderRadius: "50%",
                  }}
                ></div>
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: "#555",
                    borderRadius: "50%",
                  }}
                ></div>
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: "#555",
                    borderRadius: "50%",
                  }}
                ></div>
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: "#555",
                    borderRadius: "50%",
                  }}
                ></div>
              </Space>
            </Col>
          </Row>
        </div>
      </Footer>
    </Layout>
  );
};

export default ShoppingCart;
