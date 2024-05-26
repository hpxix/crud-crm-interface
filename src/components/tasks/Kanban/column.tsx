import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Space, Badge, Button } from "antd";
import { Text } from "@/components/text";
import { PlusOutlined } from "@ant-design/icons";

function KanbanColumn() {
  //isOver is a boolean idicating weather the element is being hovering over the target,
  //setNodeRef is a function to pass to the ref prop you want to make dropable
  //active is an object that have information aboute the dropabble item that is currently being dragged
  const { isOver, setNodeRef, active } = useDroppable({
    id: "",
    data: "",
  });
  let count = 2;

  const onAddClickHandler = () => {

  }

  const description = 'description'

  return (
    <div
      ref={setNodeRef}
      style={{ display: "flex", flexDirection: "column", padding: "0 16px" }}
    >
      <div style={{ padding: "12px" }}>
        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <Space>
            <Text
              ellipsis={{ tooltip: "TITLE TODO" }}
              size="xs"
              strong
              style={{ textTransform: "uppercase", whiteSpace: "nowrap" }}
            >
              TO-DO
            </Text>
            {!!count && <Badge count={count} color="cyan" />}
          </Space>
          <Button shape="circle" icon={<PlusOutlined/>} onClick={onAddClickHandler}/>
        </Space>
      </div>
    </div>
  );
}

export default KanbanColumn;
