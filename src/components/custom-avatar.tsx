import { getNameInitials } from "@/utilities-first";
import { useGetIdentity } from "@refinedev/core";
import { Avatar as AntdAvatar } from "antd";
import { AvatarProps } from "antd/lib";

type Props = AvatarProps & {
  name?: string;
};

function CustomAvatar({ name, style, ...rest }: Props) {
  const { data: user } = useGetIdentity();
  return (
    <AntdAvatar
      alt={name}
      size={"small"}
      style={{
        backgroundColor: "#87d068",
        display: "flex",
        alignItems: "center",
        border: "none",
        ...style
      }}
      {...rest}
    >
      {getNameInitials(name || "")}
    </AntdAvatar>
  );
}

export default CustomAvatar;
