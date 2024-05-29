import React, { useState } from "react";
import { Card } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { Text } from "../text";
import { Badge, List, Tooltip } from "antd/lib";
import UpcomingEventsSkeleton from "../skeleton/upcoming-events";
import { getDate } from "@/providers/utilities/helpers";
import { useList } from "@refinedev/core";
import { DASHBORAD_CALENDAR_UPCOMING_EVENTS_QUERY } from "@/graphql/queries";
import dayjs from "dayjs";
function UpcommingEvents() {
  const [isLoading, setIsLoading] = useState(false);
  const { data, isLoading: eventsLoading } = useList({
    resource: "events",
    pagination: { pageSize: 5 },
    sorters: [
      {
        field: "startDate",
        order: "asc",
      },
    ],
    filters: [
      {
        field: "startDate",
        operator: "gte",
        value: dayjs().format("YYYY-MM-DD"),
      },
    ],
    meta: {
      gqlQuery: DASHBORAD_CALENDAR_UPCOMING_EVENTS_QUERY,
    },
  });
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
            renderItem={() => <UpcomingEventsSkeleton />}
          />
        ) : (
          <List
            itemLayout="horizontal"
            //add data for your -Upcomming Events
            dataSource={data?.data || []}
            renderItem={(item) => {
              const renderData = getDate(item.startDate, item.endDate);
              return (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Badge color={item.color} />}
                    title={<Text size="xs">{renderData}</Text>}
                    description={
                      <Text ellipsis={{ tooltip: "true" }} strong>
                        {item.title}
                      </Text>
                    }
                  />
                </List.Item>
              );
            }}
          />
        )}
        {!isLoading && data?.data.length === 0 && (
          <span
            style={{
              display: "flex",
              justifyContent: "content",
              alignItems: "center",
              height: "220px",
            }}
          >
            No Up Comming Events
          </span>
        )}
      </Card>
    </div>
  );
}

export default UpcommingEvents;
