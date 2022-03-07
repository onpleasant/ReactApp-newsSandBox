import { Table, Tag, Button, Modal, Popover, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
const { confirm } = Modal;
export default function RightList() {
  const [dataSource, setDataSource] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    axios.get('http://localhost:5050/rights?_embed=children').then((res) => {
      res.data.forEach((item) =>
        item.children?.length === 0 ? (item.children = '') : item.children
      );
      setDataSource(res.data);
    });
  }, [refresh]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => {
        return <b>{id}</b>;
      },
    },
    {
      title: '权限名称',
      dataIndex: 'title',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render: (key) => {
        return <Tag color="orange">{key}</Tag>;
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
            <Popover
              content={
                <div style={{ textAlign: 'center' }}>
                  <Switch checked={item.pagepermisson} onChange={()=>switchMethod(item)}></Switch>
                </div>
              }
              title="页面配置项"
              trigger={item.pagepermisson === undefined ? "" : "click"}
            >
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                disabled={item.pagepermisson === undefined}
              ></Button>
            </Popover>
          </div>
        );
      },
    },
  ];

  const switchMethod = (item) => {
    item.pagepermisson === 0 ? item.pagepermisson = 1 : item.pagepermisson = 0
    console.log(item.pagepermisson);
    setDataSource([...dataSource])
    if(item.grade === 1) {
      axios.patch(`http://localhost:5050/rights/${item.id}`,{
        pagepermisson:item.pagepermisson
      })
    }else {
      axios.patch(`http://localhost:5050/children/${item.id}`,{
        pagepermisson:item.pagepermisson
      })
    }
  }

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
    // console.log('item',item);
    if (item.grade === 1) {
      // setDataSource(dataSource.filter(i => i.id !== item.id))
      axios
        .delete(`http://localhost:5050/rights/${item.id}`)
        .then(setRefresh)
        .catch((e) => console.log(e));
    } else {
      // let list = dataSource.filter(data => data.id === item.rightId)
      // list[0].children = list[0].children.filter(data => data.id !== item.id)
      axios
        .delete(`http://localhost:5050/children/${item.id}`)
        .then(setRefresh)
        .catch((e) => console.log(e));
    }
  };

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
    </div>
  );
}
