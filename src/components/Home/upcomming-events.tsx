import React, { useState } from "react";
import { Card } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { Text } from "../text";
import { List } from "antd/lib";

function UpcommingEvents() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      <Card
        style={{ height: "100%" }}
        headStyle={{ padding: "8px 16px" }}
        bodyStyle={{ padding: "0 1rem" }}
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <CalendarOutlined />
            <Text size="sm" style={{ marginLeft: "0.7rem" }}>
              Upcomming Events
            </Text>
          </div>
        }
      >
        {isLoading ? (
          <List
            itemLayout="horizontal"
            dataSource={Array.from({ length: 5 }).map((_, index) => ({
              id: index,
            }))}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <Card>{/* Card content */}</Card>
              </List.Item>
            )}
          />
        ) : (
          <List />
        )}
      </Card>
    </div>
  );
}

export default UpcommingEvents;
