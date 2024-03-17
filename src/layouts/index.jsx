import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  ScheduleOutlined,
  VideoCameraOutlined,
  LogoutOutlined, SnippetsOutlined, KeyOutlined
} from '@ant-design/icons';
import {Layout, Menu} from 'antd';
import React, {useState} from 'react';
import {Content, Header} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import './style.css'
import {Outlet} from "react-router-dom";
import logo from '../assets/images/Logo.png';

const Layouts = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`h-screen w-full`}>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed} className={`h-screen`}>
          <div className="logo"/>
          <div className={`text-white flex ${collapsed ? 'justify-center' : 'ml-5'} items-center h-12 w-full mt-2`}>
            <img
              className={`h-full w-auto`}
              src={logo}
            />
            <p className={`font-bold text-xl text-center my-auto ${collapsed ? 'hidden' : ''}`}>HealthPro</p>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            className={`mt-5`}
            items={[
              {
                key: '1',
                icon: <ScheduleOutlined />,
                label: 'Lịch khám',
              },
              {
                key: '2',
                icon: <SnippetsOutlined />,
                label: 'Cẩm nang',
              },
              {
                key: '3',
                icon: <UserOutlined />,
                label: 'Hồ sơ cá nhân',
              },{
                key: '4',
                icon: <KeyOutlined />,
                label: 'Đổi mật khẩu',
              },
              {
                key: '5',
                icon: <LogoutOutlined/>,
                label: 'Đăng xuất',
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background flex justify-between" style={{padding: 0}}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger mx-5',
              onClick: () => setCollapsed(!collapsed),
            })}
            <div className={`flex mx-5 items-center my-auto`}>
              <div>Nguyễn Tôn Phúc</div>
              <img
                src="https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"
                alt="logo"
                className={`w-10 h-10 items-center text-center`}/>
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Outlet/>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Layouts;