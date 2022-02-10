import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
import Home from './home/Home'
import NoPermission from './nopermission/NoPermission'
import RightList from './right-manage/RightList'
import RoleList from './right-manage/RoleList'
import UserList from './user-manage/UserList'


export default function NewsSandBox() {
  return (
    <div>
      <SideMenu></SideMenu>
      <TopHeader></TopHeader>

      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/user-manage/role/list" element={<UserList />}></Route>
        <Route path="/right-manage/role/list" element={<RoleList />}></Route>
        <Route path="/right-manage/right/list" element={<RightList />}></Route>
        <Route path="/" element={<Navigate replace from="/" to="home" />} />
        <Route path="/*" element={<NoPermission />} />
      </Routes>
    </div>
  )
}
