import { UnorderedListOutlined } from "@ant-design/icons";
import Card from "antd/es/card/Card";
import React from "react";
import { Text } from "../text";
import { List } from "antd";
import LatestActivitiesSkeleton from "../skeleton/latest-activities";
import { useList } from "@refinedev/core";
import { DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY, DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY } from "@/graphql/queries";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { DashboardLatestActivitiesAuditsQuery, DashboardLatestActivitiesDealsQuery } from "@/graphql/types";
import dayjs from "dayjs";
import CustomAvatar from "../custom-avatar";

function LatesActivities() {


  //Audit Data
  const { data: audit, isLoading: isLoadingAudit, isError, error } = useList<GetFieldsFromList<DashboardLatestActivitiesAuditsQuery>>({
    resource: 'audits',
    meta: {
      gqlQuery: DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY,
    }
  })

  const dealsId = audit?.data.map((audit) => audit?.targetId)
  
  //Deals Data
  const {data: deals, isLoading: isLoadingDeals} = useList<GetFieldsFromList<DashboardLatestActivitiesDealsQuery>>({
    resource: 'deals',
    queryOptions: {
      enabled: !!dealsId?.length
    },
    pagination: {
      mode: 'off'
    },
    filters: [{
      field: 'id', operator: 'in', value: dealsId
    }],
    meta: {
      gqlQuery: DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY
    }
  }
)

if(isError){
  console.log(error)
  return null
}
const isLoading = false

console.log(isLoadingAudit, isLoadingDeals)

  return (
    <Card
      headStyle={{ padding: "16px" }}
      bodyStyle={{ padding: "0 1rem" }}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <UnorderedListOutlined />
          <Text size="sm" style={{ marginLeft: "0.5rem" }}>
            Latest Activities
          </Text>
        </div>
      }
    >
      {isLoading ? (
        <List
          itemLayout="horizontal"
          dataSource={Array.from({ length: 5 }).map((_, i) => {
            id: i;
          })}
          renderItem={(_, i) => <LatestActivitiesSkeleton key={i} />}
        />
      ) : (
        <List
        itemLayout="horizontal" dataSource={audit?.data} renderItem={(item) => {
          const deal = deals?.data.find((deal) => deal.id == String(item.targetId))  || undefined; 
          const formattedDate = deal ? dayjs(deal?.createdAt).format("MMM/DD/YYYY - HH:mm") : ''
          console.log('deal?.company?.name:', deal?.company?.name)
          return (
            <List.Item>
              <List.Item.Meta 
              title={formattedDate}
              avatar={
                <CustomAvatar 
                shape="square"
                size={48}
                src={deal?.company.avatarUrl}
                name='commit number 2 motherfucker <3'/>
              }
              />
            </List.Item>
          ) 
        }} />
        
      )}
    </Card>
  );
}

export default LatesActivities;
