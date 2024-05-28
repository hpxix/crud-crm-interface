import { User } from "@/graphql/schema.types";
import { ConfigProvider, theme, Card, Button } from "antd";
import { Text } from "@/components/text";
import React, { useMemo } from "react";
import { Dropdown, MenuProps, Space, Tag, Tooltip } from "antd/lib";
import {
  ClockCircleOutlined,
  DeleteOutlined,
  EyeOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { CustomAvatar } from "@/components/custom-avatar";
import { TextIcon } from "@/components/icon";
import dayjs from "dayjs";
import { getDateColor } from "@/utilities-first";
import { useDelete, useNavigation } from "@refinedev/core";

interface ProjectCardProps {
  id: string;
  title: string;
  updateAt: string;
  dueDate?: string;
  users?: {
    id: string;
    namme: string;
    avatarUrl?: User["avatarUrl"];
  }[];
}

function ProjectCard({ id, title, dueDate, users }: ProjectCardProps) {
  const token = theme.useToken();
  const { edit } = useNavigation();
  const { mutate } = useDelete();

  const dropdownItems = useMemo(() => {
    const dropdownItems: MenuProps["items"] = [
      {
        label: "View card",
        key: "1",
        icon: <EyeOutlined />,
        onClick: () => {
          edit("tasks", id, "replace");
        },
      },
      {
        danger: true,
        label: "Delete card",
        key: "2",
        icon: <DeleteOutlined />,
        onClick: () => {
          mutate({
            resource: "tasks",
            id,
            meta: {
              operation: "task",
            },
          });
        },
      },
    ];

    return dropdownItems;
  }, []);

  const dueDateOptions = useMemo(() => {
    if (!dueDate) return null;

    const date = dayjs(dueDate);

    return {
      color: getDateColor({ date: dueDate }) as string,
      text: date.format("MMM D"),
    };
  }, [dueDate]);

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Tag: {
              colorText: token.token?.colorTextSecondary,
            },
            Card: {
              headerBg: "transparent",
            },
          },
        }}
      >
        <Card
          size="small"
          title={<Text ellipsis={{ tooltip: title }}>{title}</Text>}
          onClick={() => {
            edit("tasks", id, "replace");
          }}
          extra={
            <Dropdown
              trigger={["click"]}
              menu={{
                items: dropdownItems,
                onPointerDown: (e) => {
                  e.stopPropagation();
                },
                onClick: (e) => {
                  e.domEvent.stopPropagation();
                },
              }}
              placement="bottom"
              arrow={{ pointAtCenter: true }}
            >
              <Button
                type="text"
                shape="circle"
                icon={
                  <MoreOutlined
                    style={{
                      transform: "rotate(90deg)",
                    }}
                  />
                }
                onPointerDown={(e) => {
                  e.stopPropagation();
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              />
            </Dropdown>
          }
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <TextIcon
              style={{
                marginRight: "4px",
              }}
            />
            {dueDateOptions && (
              <Tag
                icon={
                  <ClockCircleOutlined
                    style={{
                      fontSize: "12px",
                    }}
                  />
                }
                style={{
                  padding: "0 4px",
                  marginInlineEnd: "0",
                  backgroundColor:
                    dueDateOptions.color === "default"
                      ? "transparent"
                      : "unset",
                }}
                color={dueDateOptions.color}
                bordered={dueDateOptions.color !== "default"}
              >
                {dueDateOptions.text}
              </Tag>
            )}
            {!!users?.length && (
              <Space
                size={4}
                wrap
                direction="horizontal"
                align="center"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginLeft: "auto",
                  marginRight: "0",
                }}
              >
                {users.map((user) => {
                  return (
                    <Tooltip key={user.id} title={user.namme}>
                      <CustomAvatar name={user.namme} src={user.avatarUrl} />
                    </Tooltip>
                  );
                })}
              </Space>
            )}
          </div>
        </Card>
      </ConfigProvider>
    </>
  );
}

export default ProjectCard;
