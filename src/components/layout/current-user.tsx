import { Popover, Button } from "antd";
import CustomAvatar from "../custom-avatar";
import { useGetIdentity } from "@refinedev/core";
import type { User } from "@/graphql/schema.types";
import { Text } from "../text";
import { SettingOutlined } from "@ant-design/icons";
import { useState } from "react";
import { AccountSettings } from "./account-settings-text";

const CurrentUser = () => {
  const { data: user } = useGetIdentity<User>();
  const [isOpen, setisOpen] = useState(false);

  const content = (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Text strong style={{ padding: "12px 20px" }}>
        {user?.name}
      </Text>
      <div
        style={{
          borderTop: "1px solid #d9d9d9",
          padding: "7px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      ></div>
      <Button
        style={{ textAlign: "left" }}
        icon={<SettingOutlined />}
        type="text"
        onClick={() => {
          setisOpen(true);
        }}
      >
        Account Settings
      </Button>
    </div>
  );
  return (
    <>
      <Popover
        placement="bottomRight"
        trigger="click"
        overlayInnerStyle={{ padding: 0 }}
        overlayStyle={{ zIndex: 999 }}
        content={content}
      >
        <CustomAvatar
          name={user?.name}
          src={user?.avatarUrl}
          size="default"
          style={{ cursor: "pointer" }}
        />
      </Popover>
      {user && (
        <AccountSettings opened={isOpen} setOpened={setisOpen} userId={user.id} />
      )}
    </>
  );
};
export default CurrentUser;
