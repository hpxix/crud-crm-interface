import CurrentUser from "./current-user";
import { Layout, Space } from "antd";

const Header = () => {

  const headerStyles: React.CSSProperties = {
    background: "#FFF",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0, 24px",
    position: "sticky",
    top: 0,
    zIndex: 999,
  }

  return (
    <div>
      <Layout.Header style={headerStyles}>
        <Space>
          <CurrentUser />
        </Space>
      </Layout.Header>
    </div>
  );
};
export default Header;
