import { Card } from "antd/lib";
import React from "react";

type Props = {
  resources: "companies" | "contacts" | "deals";
  isLoading: boolean;
  totalCount: number;
};

function DashboardTotalCountCard({ resources, isLoading, totalCount }: Props) {
  return (
    <Card
      style={{ height: "96px", padding: 0 }}
      bodyStyle={{ padding: "8px 8px 8px 12px" }}
      size="small"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          whiteSpace: "nowrap",
        }}
      >
        {icons}
      </div>
    </Card>
  );
}

export default DashboardTotalCountCard;
