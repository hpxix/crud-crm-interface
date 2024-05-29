import React from "react";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

export const KanBanBoardContainer = ({
  children,
}: React.PropsWithChildren) => {
  return (
    <div
      style={{
        width: "calc(100% + 64px",
        height: "calc(100vh -64px)",
        display: "flex",
        justifyContent: "column",
        margin: "-32px",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: "32px",
          overflow: "scroll",
        }}
      >
        {children}
      </div>
    </div>
  );
};

interface Props {
  onDragEnd: (even: DragEndEvent) => void;
}

export const KanBanBoard = ({
  children,
  onDragEnd,
}: React.PropsWithChildren<Props>) => {
  const mouseSensor = useSensor(MouseSensor, {
    //activationConstarint is a prop we can use to specify a position under which a draggable options becomes active or in simple words where we actually dragging it
    activationConstraint: {
      distance: 5,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      distance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <DndContext onDragEnd={onDragEnd} sensors={sensors}>
      {children}
    </DndContext>
  );
};
