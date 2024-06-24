export interface Task {
    id: number,
    taskName: string,
    status: string
}

export interface FormEditProps {
    closeForm: () => void,
    taskSelected: Task | null
    editTask: (id: number, taskNameChanged: string) => void
}

export interface TaskTableProps {
    tasks: Task[],
    deleteTask: (id: number) => void,
    openEditForm: (task: Task) => void,
    editStatus: (id: number, newStatus: string) => void
}

export interface TaskItemProps {
    task: Task,
    deleteTask: (id: number) => void,
    openEditForm: (task: Task) => void,
    editStatus: (id: number, newStatus: string) => void
}

export interface AddFormProps {
    closeForm: () => void,
    addTask: (taskName: string) => void
}

export interface StatusButtonProps {
    status: string,
    editStatus: (id: number, newStatus: string) => void,
    taskId: number
}

export interface AddTaskProps {
    openForm: () => void
}