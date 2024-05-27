import {
  KanBanBoard,
  KanBanBoardContainer,
} from "@/components/tasks/Kanban/board";
import KanbanColumn from "@/components/tasks/Kanban/column";
import React from "react";

function List() {
  return (
    <>
      <KanBanBoardContainer>
        <KanBanBoard>
          <KanbanColumn>
            <KanbanItem></KanbanItem>
          </KanbanColumn>
          <KanbanColumn></KanbanColumn>
        </KanBanBoard>
      </KanBanBoardContainer>
    </>
  );
}

export default List;
