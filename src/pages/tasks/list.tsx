import {
  KanBanBoard,
  KanBanBoardContainer,
} from "@/components/tasks/Kanban/board";
import KanbanColumn from "@/components/tasks/Kanban/column";
import KanbanItem from "@/components/tasks/Kanban/item";
import { TASKS_QUERY, TASK_STAGES_QUERY } from "@/graphql/queries";
import { TaskStage } from "@/graphql/schema.types";
import { TasksQuery } from "@/graphql/types";
import { useList } from "@refinedev/core";
import { GetFieldsFromList, gql } from "@refinedev/nestjs-query";
import React, { useMemo } from "react";
import { ProjectCardMemo } from "@/components/tasks/Kanban/card";

type Task = GetFieldsFromList<TasksQuery>;

function List() {
  const { data: stages, isLoading: isLoadinStages } = useList<TaskStage>({
    resource: "taskStages",
    filters: [
      {
        field: "title",
        operator: "in",
        value: ["TODO", "IN PROGRESS", "IN REVIEW", "DONE"],
      },
    ],
    sorters: [
      {
        field: "createdAt",
        order: "asc",
      },
    ],
    meta: {
      gqlQuery: TASK_STAGES_QUERY,
    },
  });

  const { data: tasks, isLoading: isLoadingTask } = useList<Task>({
    resource: "tasks",
    sorters: [
      {
        field: "dueDate",
        order: "asc",
      },
    ],
    //only fetch query when stages exist.
    queryOptions: {
      enabled: !!stages,
    },
    pagination: {
      mode: "off",
    },
    meta: {
      gqlQuery: TASKS_QUERY,
    },
  });

  const taskStages = React.useMemo(() => {
    if (!tasks?.data || !stages?.data) {
      return {
        unassignedStage: [],
        stages: [],
      };
    }
    const unassignedStage = tasks?.data.filter((task) => task.stageId === null);

    const grouped: TaskStage[] = stages.data.map((stage) => ({
      ...stage,
      tasks: tasks.data.filter((task) => task.stageId?.toString() === stage.id),
    }));
    return {
      unassignedStage,
      columns: grouped,
    };
  }, [stages, tasks]);

  const handleAddCard = (args: { stageId: string }) => {};

  return (
    <>
      <KanBanBoardContainer>
        <KanBanBoard>
          <KanbanColumn
            id="unassigned"
            title={"unassigned"}
            count={taskStages.unassignedStage.length || 0}
            onAddClick={() => handleAddCard({ stageId: "unassigned" })}
          >
            {taskStages?.unassignedStage.map((task) => (
              <KanbanItem
                key={task.id}
                id={task?.id}
                data={{ ...task, stageId: "unassigned" }}
              >
                <ProjectCardMemo {...task} dueDate={task.dueDate || undefined} />
              </KanbanItem>
            ))}
          </KanbanColumn>
        </KanBanBoard>
      </KanBanBoardContainer>
    </>
  );
}

export default List;
