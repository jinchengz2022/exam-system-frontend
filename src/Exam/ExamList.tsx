import { useState, useEffect } from "react";
import { Button, Modal, Popconfirm, Table, message } from "antd";
import { examRequest } from "../request";
import dayjs from "dayjs";
import { PlusOutlined } from "@ant-design/icons";
import { AddAndEditExamModal } from "./AddAndEditExamModal";

export const ExamList = () => {
  const [dataSource, setDataSource] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const getList = async () => {
    try {
      const res = await examRequest.ExamList({
        pageNumber: 1,
        pageSize: 10,
        userId: 2,
      });
      if (res.data.list) {
        setDataSource(res.data.list);
      }
    } catch (error: any) {
      message.error(error.config.data.message);
    }
  };

  const deleteOrPublishExam = async (
    id: number,
    action: "delete" | "publish"
  ) => {
    try {
      const res =
        action === "delete"
          ? await examRequest.DeleteExam(id)
          : await examRequest.PublishExam(id);
      if (res.status === 201 || res.status === 200) {
        message.success("操作成功", 1, getList);
      }
    } catch (error) {}
  };

  const columns = [
    {
      key: "name",
      dataIndex: "name",
      title: "试卷名称",
    },
    {
      key: "isPublish",
      dataIndex: "isPublish",
      title: "是否已发布",
      render: (_: boolean) => (_ ? "是" : "否"),
    },
    {
      key: "content",
      dataIndex: "content",
      title: "试卷内容",
    },
    {
      key: "createTime",
      dataIndex: "createTime",
      title: "创建时间",
      render: (_: Date) => dayjs(_).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      key: "updateTime",
      dataIndex: "updateTime",
      title: "更新时间",
      render: (_: Date) => dayjs(_).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      key: "operate",
      dataIndex: "operate",
      render: (_: any, record: any) => {
        return (
          <div>
            <Button type="link" onClick={() => {}}>
              修改内容
            </Button>
            {record?.isPublish ? null : (
              <Popconfirm
                title="是否确定发布该试卷"
                onConfirm={() => deleteOrPublishExam(record.examId, "publish")}
              >
                <Button type="link">发布</Button>
              </Popconfirm>
            )}
            <Popconfirm
              title="是否确定删除"
              onConfirm={() => deleteOrPublishExam(record.examId, "delete")}
            >
              <Button type="link" danger>
                回收
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 12,
          // marginLeft: 4,
          height: 30,
          width: 122,
          backgroundColor: "#1677ff",
          color: "#fff",
          borderRadius: 4,
        }}
        onClick={() => setAddModalOpen(true)}
      >
        <PlusOutlined style={{ marginRight: 8, color: "#fff" }} />
        <div>创建试卷</div>
      </div>
      <Table
        rowKey={(row: any) => row.examId}
        columns={columns}
        dataSource={dataSource}
      />
      {addModalOpen ? (
        <AddAndEditExamModal
          open={addModalOpen}
          onClose={() => {
            setAddModalOpen(false);
            getList();
          }}
        />
      ) : null}
    </>
  );
};
