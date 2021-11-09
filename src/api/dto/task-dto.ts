export interface TaskDTO {
  id: number;
  projectId: number;
  title: string;
  description: string;
  archived: boolean;
  completed: boolean;
  priority: number;
  dueDate: Date;
  assigneeId: number;
  reporterId: number;
}
