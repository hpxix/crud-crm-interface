import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Space, Badge, Button } from "antd";
import { Text } from "@/components/text";
import { PlusOutlined } from "@ant-design/icons";

function KanbanColumn({ children }: React.PropsWithChildren) {
  //isOver is a boolean idicating weather the element is being hovering over the target,
  //setNodeRef is a function to pass to the ref prop you want to make dropable
  //active is an object that have information aboute the dropabble item that is currently being dragged
  const { isOver, setNodeRef, active } = useDroppable({
    id: "",
    data: "",
  });
  let count = 2;

  const onAddClickHandler = () => {};

  const description = "description";
  const title = "title";

  return (
    <div
      ref={setNodeRef}
      style={{ display: "flex", flexDirection: "column", padding: "0 16px" }}
    >
      <div style={{ padding: "12px" }}>
        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <Space>
            <Text
              ellipsis={{ tooltip: { title } }}
              size="xs"
              strong
              style={{ textTransform: "uppercase", whiteSpace: "nowrap" }}
            >
              TO-DO
            </Text>
            {!!count && <Badge count={count} color="cyan" />}
          </Space>
          <Button
            shape="circle"
            icon={<PlusOutlined />}
            onClick={onAddClickHandler}
          />
        </Space>
        {description}
      </div>
      <div
        style={{
          flex: 1,
          overflowY: active ? "unset" : "scroll",
          border: "2px dashed transparent",
          borderColor: isOver ? '#000040' : 'transparent',
          borderRadius: '4px'
        }}
      >
        <div style={{
          marginTop: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default KanbanColumn;
