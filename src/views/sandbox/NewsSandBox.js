import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
import Home from './home/Home'
import NoPermission from './nopermission/NoPermission'
import RightList from './right-manage/RightList'
import RoleList from './right-manage/RoleList'
import UserList from './user-manage/UserList'
//css
import './NewsSandBox.css'
//antd
import { Layout } from 'antd'
const {Content} = Layout

export default function NewsSandBox() {
  return (
    <Layout>
      <SideMenu></SideMenu>
      <Layout className='site-layout'>
        <TopHeader></TopHeader>
        <Content
          className='site-layout-background'
          style={{
            margin:'24px 16px',
            padding:24,
            minHeight:280,
            overflow:"auto"
          }}
        >
          <Routes>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/user-manage/list" element={<UserList />}></Route>
            <Route path="/right-manage/role/list" element={<RoleList />}></Route>
            <Route path="/right-manage/right/list" element={<RightList />}></Route>
            <Route path="/" element={<Navigate replace from="/" to="home" />} />
            <Route path="/*" element={<NoPermission />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  )
}
