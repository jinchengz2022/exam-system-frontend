import { useState, useEffect } from "react";
import { Layout, Menu, Avatar, Button, message } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { jsonTranstion } from "./utils/jsonTransition";

const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#fff",
  display: "inline-flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#fff",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#fff",
};

const layoutStyle = {
  overflow: "hidden",
  width: "100%",
};

const adminMenu = [
  {
    key: "/admin/meeting-room",
    label: "会议室管理",
  },
  {
    key: "/admin/meeting-room/booking",
    label: "预定管理",
  },
  {
    key: "/admin/list",
    label: "用户管理",
  },
];

const userMenu = [
  {
    key: "/exam",
    label: "全部问卷",
    icon: <OrderedListOutlined />,
  },
  {
    key: "/history",
    label: "回收站",
    icon: <DeleteOutlined />,
  },
];

function App() {
  const navigate = useNavigate();
  const { userName } = jsonTranstion(localStorage.getItem("userInfo"));
  const { pathname } = useLocation();
  const [selectKey, setSelectKey] = useState<string[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      message.info("未获取到当前用户信息，请重新登录", 1, () =>
        navigate("/login")
      );
    }
    if (pathname === "/") {
      navigate(`${userMenu[0].key}`);
    }

    setSelectKey([pathname]);
  }, [pathname]);

  const selectMenu = (keys: any) => {
    setSelectKey(keys.keyPath);
    navigate(keys.key);
  };

  return (
    <Layout style={layoutStyle}>
      <Sider style={{ backgroundColor: "#fff" }}>
        <Menu
          selectedKeys={selectKey}
          style={{ height: "100vh", border: "none" }}
          items={pathname.includes("admin") ? adminMenu : userMenu}
          onClick={selectMenu}
        />
      </Sider>
      <Layout>
        <Header style={headerStyle}>
          <div />
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              <Avatar
                // src={headPic}
                style={{ width: 30, marginRight: 12 }}
                alt=""
              />
              <span>{userName}</span>
            </div>
            <Button type="link" onClick={() => navigate("/login")}>
              退出
            </Button>
          </div>
        </Header>
        <Content style={contentStyle}>
          <Outlet />
        </Content>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
