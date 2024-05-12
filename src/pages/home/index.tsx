import React from "react";
import { Row, Col } from "antd";
import { UpcommingEvents, DealsCharts } from "@/components";

export const Home = () => {
  return (
    <div>
      <Row
        gutter={[32, 32]}
        style={{
          marginTop: "32px",
        }}
      >
        <Col
          xs={24}
          sm={24}
          xl={8}
          style={{
            height: "460px",
          }}
        >
          <UpcommingEvents />
        </Col>
        <Col
          xs={24}
          sm={24}
          xl={8}
          style={{
            height: "460px",
          }}
        >
          <DealsCharts />
        </Col>
      </Row>
    </div>
  );
};
