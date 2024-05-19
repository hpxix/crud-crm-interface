import { Card, Skeleton } from "antd/lib";
import React from "react";
import { totalCountVariants } from "../constants";
import { Text } from "../text";
import { Area, AreaConfig } from "@ant-design/plots";

type Props = {
  resources: "companies" | "contacts" | "deals";
  isLoading: boolean;
  totalCount?: number;
};

function DashboardTotalCountCard({ resources, isLoading, totalCount }: Props) {
  const { primaryColor, secondaryColor, icon, title } =
    totalCountVariants[resources];
  const config: AreaConfig = {
    data: totalCountVariants[resources].data,
    xField: "index",
    yField: "value",
    appendPadding: [1, 0, 0, 0],
    padding: 0,
    syncViewPadding: true,
    autoFit: true,
    tooltip: false,
    animation: false,
    xAxis: false,
    yAxis: {
      tickCount: 12,
      label: {
        style: {
          stroke: "transparent",
        },
      },
      grid: {
        line: {
          style: {
            stroke: 'transparent'
          },
        },
      },
    },
    smooth: true,
    line: {
      color: primaryColor, 
    },
    areaStyle: () => {
      return {
        fill: `l(270) 0:#FFF 0.2${secondaryColor} 1:${primaryColor}`
      }
    }
  };
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
        {icon}
        <Text size="md" className="secondary" style={{ marginLeft: "8px" }}>
          {title}
        </Text>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Text
          size="xxxl"
          strong
          style={{
            flex: 1,
            whiteSpace: "nowrap",
            flexShrink: 0,
            textAlign: "start",
            marginLeft: "48px",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {isLoading ? (
            <Skeleton.Button style={{ marginTop: "8px", width: "74px" }} />
          ) : (
            totalCount
          )}
        </Text>
        <Area {...config} style={{ width: "50%", paddingBottom: '10px' }} />
      </div>
    </Card>
  );
}

export default DashboardTotalCountCard;
