import React, { useState, useEffect } from "react";
import { Layout, Menu, Dropdown, Switch, Avatar, Button } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  BarChartOutlined,
  BookOutlined,
  LogoutOutlined,
  MoonOutlined,
  SunOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import "./Dashboard.css";

const { Header, Sider, Content } = Layout;

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  // Adjust sidebar based on screen size
  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // User Profile Dropdown Menu
  const userMenu = (
    <Menu
      items={[
        {
          key: "/dashboard/profile",
          icon: <UserOutlined />,
          label: <Link to="/dashboard/profile">Profile</Link>,
        },
        {
          key: "logout",
          icon: <LogoutOutlined />,
          label: "Logout",
          onClick: () => navigate("/start-your-journey"),
        },
      ]}
    />
  );

  return (
    <Layout className={`dashboard-layout ${darkMode ? "dark-theme" : "light-theme"}`}>
      {/* Sidebar */}
      <Sider collapsed={collapsed} theme={darkMode ? "dark" : "light"} className="custom-sidebar">
        <div className="logo">{collapsed ? "PX" : "PrepXpert"}</div>
        <Menu
          theme={darkMode ? "dark" : "light"}
          mode="inline"
          selectedKeys={[location.pathname]} // Dynamically updates based on current route
        >
          <Menu.Item key="/dashboard/home" icon={<HomeOutlined />}>
            <Link to="/dashboard/home">Home</Link>
          </Menu.Item>
          <Menu.Item key="/dashboard/profile" icon={<UserOutlined />}>
            <Link to="/dashboard/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="/dashboard/score-analytics" icon={<BarChartOutlined />}>
            <Link to="/dashboard/score-analytics">Score Analytics</Link>
          </Menu.Item>
          <Menu.Item key="/dashboard/resources" icon={<BookOutlined />}>
            <Link to="/dashboard/resources">Resources</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Main Layout */}
      <Layout>
        {/* Top Navbar */}
        <Header className="dashboard-header">
          <div className="header-left">
            <Button style={{ color: "#6372ff" }}
              id="nav-closer"
              type="text"
              icon={<MenuUnfoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="toggle-button"
            />
            <Switch style={{ paddingTop: "5px", backgroundColor:"#6372ff" }}
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              checkedChildren={<SunOutlined />}
              unCheckedChildren={<MoonOutlined />}
            />
          </div>

          {/* User Profile Dropdown */}
          <Dropdown overlay={userMenu} placement="bottomRight" trigger={["click"]}>
            <Avatar style={{ backgroundColor: "#6372ff" }} className="user-avatar" icon={<UserOutlined />} />
          </Dropdown>
        </Header>

        {/* Page Content */}
        <Content className="dashboard-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
