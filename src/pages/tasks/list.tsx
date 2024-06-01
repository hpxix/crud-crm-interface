import {
  KanBanBoard,
  KanBanBoardContainer,
} from "@/components/tasks/Kanban/board";
import KanbanColumn from "@/components/tasks/Kanban/column";
import KanbanItem from "@/components/tasks/Kanban/item";
import { TASKS_QUERY, TASK_STAGES_QUERY } from "@/graphql/queries";
import { TaskStagesQuery, TasksQuery } from "@/graphql/types";
import { useList, useNavigation, useUpdate } from "@refinedev/core";
import { GetFieldsFromList, gql } from "@refinedev/nestjs-query";
import React, { useMemo } from "react";
import { ProjectCardMemo } from "@/components/tasks/Kanban/card";
import { KanbanAddCardButton } from "@/components/tasks/Kanban/add-card-button";
import KanbanColumnSkeleton from "@/components/skeleton/kanban";
import { ProjectCardSkeleton } from "@/components";
import { DragEndEvent } from "@dnd-kit/core";
import { UPDATE_TASK_STAGE_MUTATION } from "@/graphql/mutations";

type Task = GetFieldsFromList<TasksQuery>;
type TaskStage = GetFieldsFromList<TaskStagesQuery> & { tasks: Task[] };

function List({ children }: React.PropsWithChildren) {
  const { replace } = useNavigation();

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
  const { mutate: updateTask } = useUpdate();

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

  const handleAddCard = (args: { stageId: string }) => {
    const path =
      args.stageId === "unassigned"
        ? "/tasks/new"
        : `/tasks/new/?${args.stageId}`;
    replace(path);
  };

  //this function will update task stage when the task is dragged and droped
  const handleOnDragEnd = (event: DragEndEvent) => {
    let stageId = event.over?.id as undefined | string | null;
    const taskId = event.active.id as string;
    const taskStageId = event.active.data.current?.stageId;
    if (taskStageId === stageId) return;
    if (stageId === "unassigned") {
      stageId = null;
    }
    updateTask({
      resource: "tasks",
      id: taskId,
      values: {
        stageId: stageId,
      },
      successNotification: false,
      //to make our app to seam more performant because then the change will happen automatically and it's going to move it before it actually move it in the backend
      mutationMode: "optimistic",
      meta: {
        gqlMutation: UPDATE_TASK_STAGE_MUTATION,
      },
    });
  };

  const isLoading = isLoadinStages || isLoadingTask;
  if (isLoading) return <PageSkeleton />;
  return (
    <>
      <KanBanBoardContainer>
        <KanBanBoard onDragEnd={handleOnDragEnd}>
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
                <ProjectCardMemo
                  {...task}
                  dueDate={task.dueDate || undefined}
                />
              </KanbanItem>
            ))}
            {!taskStages.unassignedStage.length && (
              <KanbanAddCardButton
                onClick={() => {
                  handleAddCard({ stageId: "unassigned" });
                }}
              />
            )}
          </KanbanColumn>
          {taskStages.columns?.map((column) => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              count={column.tasks.length}
              onAddClick={() => handleAddCard({ stageId: column.id })}
            >
              {isLoading && <ProjectCardSkeleton />}
              {!isLoading &&
                column.tasks.map((task) => (
                  <KanbanItem key={task.id} id={task.id} data={task}>
                    <ProjectCardMemo
                      {...task}
                      dueDate={task.dueDate || undefined}
                    />
                  </KanbanItem>
                ))}
              {column.tasks.length < 1 && (
                <KanbanAddCardButton
                  onClick={() => handleAddCard({ stageId: column.id })}
                />
              )}
            </KanbanColumn>
          ))}
        </KanBanBoard>
      </KanBanBoardContainer>
      {/* children is for modal */}
      {children}
    </>
  );
}

export default List;

const PageSkeleton = () => {
  const columnCount = 6;
  const itemCount = 4;

  return (
    <KanBanBoardContainer>
      {Array.from({ length: columnCount }).map((e, index) => (
        <KanbanColumnSkeleton key={index}>
          {Array.from({ length: itemCount }).map((_, index) => (
            <ProjectCardSkeleton />
          ))}
        </KanbanColumnSkeleton>
      ))}
    </KanBanBoardContainer>
  );
};
