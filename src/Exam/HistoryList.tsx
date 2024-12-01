import * as React from "react";
import { Table } from "antd";

export const HistoryList = () => {
  const columns = [{}];
  
  return (
    <>
      <h2>试卷列表</h2>
      <Table columns={columns} dataSource={[]} />
    </>
  );
};
