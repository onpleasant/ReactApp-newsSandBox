import React ,{useEffect,useState}from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import './index.css';
import { useNavigate } from 'react-router-dom';
// import Sider from 'antd/lib/layout/Sider'
const { Sider } = Layout;
const { SubMenu } = Menu;

// 模拟数组结构
// const menuList = [
//   {
//     key: '/home',
//     title: '首页',
//     icon: <UserOutlined />,
//   },
//   {
//     key: '/user-manage',
//     title: '用户管理',
//     icon: <UserOutlined />,
//     children: [
//       {
//         key: '/user-manage/list',
//         title: '用户列表',
//         icon: <UserOutlined />,
//       },
//     ],
//   },
//   {
//     key: '/right-manage',
//     title: '权限管理',
//     icon: <UserOutlined />,
//     children: [
//       {
//         key: '/right-manage/role/list',
//         title: '角色列表',
//         icon: <UserOutlined />,
//       },
//       {
//         key: '/right-manage/right/list',
//         title: '权限列表',
//         icon: <UserOutlined />,
//       },
//     ],
//   },
// ];s

//侧边栏图标对象
const iconList = {
  "/home":<UserOutlined />,
  "/user-manage":<UserOutlined />,
  "/user-manage/list":<UserOutlined />,
  "/right-manage":<UserOutlined />,
  "/right-manage/role/list":<UserOutlined />,
  "/right-manage/right/list":<UserOutlined />
}

export default function SideMenu() {
  const [menu,setMenu] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:5050/rights?_embed=children").then(
      res => {
        console.log(res);
        setMenu(res.data)
      }
    )
  },[])

  let checkPagePermission = (item) => {
    return item.pagepermisson === 1
  }

  let navigate = useNavigate()
  const renderMenu = (menuList) => {
    return menuList.map((item) => {
      if (item.children?.length > 0 && checkPagePermission(item)) {
        return (
          <SubMenu key={item.key} icon={iconList[item.key]} title={item.title}>
            {renderMenu(item.children)}
          </SubMenu>
        );
      }
      return checkPagePermission(item) && 
        <Menu.Item
          key={item.key}
          icon={iconList[item.key]}
          onClick={() => navigate(item.key)}
        >{item.title}</Menu.Item>
      
    });
  };
  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <div style={{display:'flex',height:"100%","flexDirection":"column"}}>
        <div className="logo">版本发布管理系统</div>
        <div style={{flex:1,"overflow":"auto"}}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['3']}>
          {renderMenu(menu)}
        </Menu>
        </div>
        
      </div>
      
    </Sider>
  );
}
