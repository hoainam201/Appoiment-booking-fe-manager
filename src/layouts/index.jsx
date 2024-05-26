import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    ScheduleOutlined,
    LogoutOutlined, SnippetsOutlined, KeyOutlined, ProfileOutlined, HeartOutlined
} from '@ant-design/icons';
import {Layout, Menu} from 'antd';
import React, {useEffect, useMemo, useState} from 'react';
import {Content, Header} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import './style.css'
import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import logo from '../assets/images/Logo.png';
import U from "../services/staffService";
import {staffRole} from "../utils/constant";

const Layouts = () => {
    const [collapsed, setCollapsed] = useState(false);
    const token = useMemo(() => localStorage.getItem('token'), []);
    const navigate = useNavigate();
    const [role, setRole] = useState('');
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const location = useLocation();

    const adminUrl =[
        "/dashboard",
        "/facility",
        "/facility/*",
        "/profile",
        "/change-password",
    ]

    const doctorUrl = [
        "/appointment/*",
        "/news",
        "/news/*",
        "/profile",
        "/change-password",
    ]

    const managerUrl = [
        "/",
        "/facility-profile",
        "/staff",
        "/service/*",
        "/profile",
        "/change-password",
    ]

    const isTrueUrl = (pathname, urls) => {
        return urls.some(url => {
            if (url.includes('*')) {
                const baseUrl = url.replace('/*', '');
                return pathname.startsWith(baseUrl);
            }
            return pathname === url;
        });
    };

    const doctorMenu = [
        {
            key: '1',
            icon: <ScheduleOutlined/>,
            label: 'Lịch khám của bạn',
            onClick: () => navigate('/appointment')
        },
        {
            key: '2',
            icon: <SnippetsOutlined/>,
            label: 'Danh sách bài viết',
            onClick: () => navigate('/news  ')
        },
        {
            key: '3',
            icon: <UserOutlined/>,
            label: 'Hồ sơ cá nhân',
            onClick: () => navigate('/profile')
        }, {
            key: '4',
            icon: <KeyOutlined/>,
            label: 'Đổi mật khẩu',
            onClick: () => navigate('/change-password')
        },
        {
            key: '5',
            icon: <LogoutOutlined/>,
            label: 'Đăng xuất',
            onClick: () => {
                localStorage.removeItem('token')
                navigate('/login')
            }
        },

    ]

    const managerMenu = [
        {
            key: '1',
            icon: <ScheduleOutlined />,
            label: 'Lịch khám',
            onClick: () => navigate('/')
        },
        {
            key: '2',
            icon: <ProfileOutlined />,
            label: 'Thông tin cơ sở',
            onClick: () => navigate('/facility-profile')
        },
        {
            key: '3',
            icon: <SnippetsOutlined />,
            label: 'Quảng lý đánh giá',
            onClick: () => navigate('/review')
        },
        {
            key: '4',
            icon: <UserOutlined />,
            label: 'Quản lý nhân sự',
            onClick: () => navigate('/staff')
        },
        {
            key: '5',
            icon: <HeartOutlined />,
            label: 'Quản lý dịch vụ',
            onClick: () => navigate('/service')
        },
        {
            key: '6',
            icon: <UserOutlined />,
            label: 'Hồ sơ cá nhân',
            onClick: () => navigate('/profile')
        },{
            key: '7',
            icon: <KeyOutlined />,
            label: 'Đổi mật khẩu',
            onClick: () => navigate('/change-password')
        },
        {
            key: '8',
            icon: <LogoutOutlined/>,
            label: 'Đăng xuất',
            onClick: () => {
                localStorage.removeItem('token');
                navigate('/login')
            }
        },
    ]

    const adminMenu = [
        {
            key: '1',
            icon: <ScheduleOutlined/>,
            label: 'Thống kê',
            onClick: () => navigate('/dashboard')
        },
        {
            key: '2',
            icon: <SnippetsOutlined/>,
            label: 'Danh sách cs y tế',
            onClick: () => navigate('/facility')
        },
        {
            key: '3',
            icon: <UserOutlined/>,
            label: 'Hồ sơ cá nhân',
            onClick: () => navigate('/profile')
        }, {
            key: '4',
            icon: <KeyOutlined/>,
            label: 'Đổi mật khẩu',
            onClick: () => navigate('/change-password')
        },
        {
            key: '5',
            icon: <LogoutOutlined/>,
            label: 'Đăng xuất',
            onClick: () => {
                localStorage.removeItem('token')
                navigate('/login')
            }
        },

    ]

    useEffect(() => {
        const getRole = async () => {
            if (!token) {
                navigate('/login');
            } else {
                try {
                    const res = await U.getRole();
                    if (res.status === 200 && res.data) {
                        setRole(res.data.role);
                        setName(res.data.name);
                        setAvatar(res.data.avatar);
                        if(res.data.role == staffRole.ADMIN && !isTrueUrl(location.pathname, adminUrl)) {
                            navigate('/dashboard');
                        } else if(res.data.role == staffRole.DOCTOR && !isTrueUrl(location.pathname, doctorUrl)) {
                            navigate('/');
                        } else if(res.data.role == staffRole.MANAGER && !isTrueUrl(location.pathname, managerUrl)) {
                            navigate('/');
                        }
                    } else {
                        localStorage.removeItem('token');
                        navigate('/login');
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
        getRole();
    }, [token, navigate])


    return (
        <div className={`h-screen w-full`}>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed} className={`h-screen`}>
                    <div className="logo"/>
                    <div
                        className={`text-white flex ${collapsed ? 'justify-center' : 'ml-5'} items-center h-12 w-full mt-2`}>
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
                        items={role == staffRole.DOCTOR ? doctorMenu : role == staffRole.MANAGER ? managerMenu : adminMenu}
                    />
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background flex justify-between" style={{padding: 0}}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger mx-5',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                        <div className={`flex mx-5 items-center my-auto gap-2`}>
                            <div>{name}</div>
                            <img
                                src={avatar ? avatar : logo}
                                alt="logo"
                                className={`w-10 h-10 rounded-full object-cover items-center text-center`}/>
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