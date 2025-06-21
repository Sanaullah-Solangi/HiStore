import { Table } from "antd";

const PriceHistory = ({ priceHistory, priceHistoryColumns }) => {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Price History</h2>
      <Table
        dataSource={priceHistory}
        columns={priceHistoryColumns}
        pagination={false}
        rowKey="date"
      />
    </div>
  );
};
export default PriceHistory;
