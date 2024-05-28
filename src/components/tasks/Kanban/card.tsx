import { User } from "@/graphql/schema.types";
import { ConfigProvider, theme, Card, Button } from "antd";
import { Text } from "@/components/text";
import React from "react";
import { Dropdown, MenuProps } from "antd/lib";
import { EyeOutlined } from "@ant-design/icons";

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
  const edit = () => {};

  const dropDownItems = React.useMemo(() => {
    const dropDownItems: MenuProps["items"] = [
      {
        label: "View Card",
        key: 1,
        icon: <EyeOutlined />,
        onClick: () => {
          edit();
        },
      },
      {
        danger: true,
        label: "Delete Card",
        key: "2",
        onClick: () => {},
      },
    ];
    return dropDownItems;
  }, []);

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
          title={
            <Text
              ellipsis={{ tooltip: title }}
              onClick={() => {
                edit;
              }}
              extra={
                <Dropdown
                  trigger={["click"]}
                  menu={{ items: dropDownItems }}
                >
                  <Button>
                    Xd
                  </Button>
                </Dropdown>
              }
            >
              {title}
            </Text>
          }
        ></Card>
      </ConfigProvider>
    </>
  );
}

export default ProjectCard;
