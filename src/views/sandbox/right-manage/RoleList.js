import React, { useState, useEffect } from 'react';
import { Table,Button,Modal,Tree } from 'antd';
import axios from 'axios';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
const { confirm } = Modal;

export default function RoleList() {
  const [dataSource, setDataSource] = useState([]);
  const [rightList, setRightList] = useState([]);
  const [currentRights, setCurrentRights] = useState([]);
  const [currentId, setCurrentId] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5050/roles').then((res) => {
      // console.log(res);
      setDataSource(res.data)
    }).catch((e)=>console.log(e));

    axios.get('http://localhost:5050/rights?_embed=children').then((res) => {
      // console.log(res);
      setRightList(res.data)
    }).catch((e)=>console.log(e));
  },[refresh]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => {
        return <b>{id}</b>;
      },
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      render: (id) => {
        return <b>{id}</b>;
      },
    },
    {
      title: '操作',
      render: (item) => {
        // 对象里不写dataIndex，那么render接到的参数就是当前整一行的数据
        return (
          <div>
            <Button
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => {
                return confirmMethod(item);
              }}
            ></Button>
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                onClick={() => {
                  setIsModalVisible(true)
                  setCurrentRights(item.rights)
                  setCurrentId(item.id)
                }}
              ></Button>
          </div>
        );
      },
    },
  ];
  const confirmMethod = (item) => {
    confirm({
      title: '你确定要删除吗?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteMethod(item);
      },
      onCancel() {},
    });
  };
  const deleteMethod = (item) => {
      axios
        .delete(`http://localhost:5050/roles/${item.id}`)
        .then(setRefresh)
        .catch((e) => console.log(e));
   
  };
  const handleOk = () => {
    setIsModalVisible(false)
    // 向后端patch请求 并且刷新触发useEffect
    axios.patch(`http://localhost:5050/roles/${currentId}`,{
      rights:currentRights
    }).then(setRefresh).catch((e)=>{console.log(e);})
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const onCheck = (checkedKeys,info) => {
    // console.log(checkedKeys,info);
    setCurrentRights(checkedKeys.checked)
  }
  
  
  return (
    <div>
      {/* rowkey属性是table表单每一项的key，必填，如没有则报错 */}
      {/* item 是每一项的数据，table自带的参数 */}
      <Table 
        dataSource={dataSource} 
        columns={columns}
        rowKey={(item)=>item.id}
        pagination={{pageSize:5}}
      />
      <Modal 
        title="权限分配" 
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}>
        <Tree
          checkable
          // defaultCheckedKeys这个属性是非受控的，把default去掉才是受控的
          checkedKeys={currentRights}
          onCheck={onCheck}
          checkStrictly={true} // 严格选中模式，不会因为父节点是默认选中的而自动选中所有的子节点
          treeData={rightList}
        />
      </Modal>
    </div>
  );
}
