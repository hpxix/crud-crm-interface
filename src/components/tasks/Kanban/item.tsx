import React from 'react'
import { useDraggable, UseDraggableArguments } from "@dnd-kit/core";

interface Props{ 
  id: string,
  data?: UseDraggableArguments['data']
}

function KanbanItem({children, id, data}: React.PropsWithChildren<Props>) {
  const { attributes, listeners, setNodeRef, active} = useDraggable({
    id: '',
    data: '',
  })
  return (
    <div style={{position: 'relative'}}>
      <div ref={setNodeRef}
      {...attributes}
      {...listeners} style={{
        opacity: active ? (active.id === id)
      }}></div>
    </div>
  )
}

export default KanbanItem