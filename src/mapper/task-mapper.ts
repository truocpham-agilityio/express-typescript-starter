import { Mapper } from "../core/infra/mapper";
import { TaskOutput } from "../interfaces";

export default class TaskMapper extends Mapper<TaskOutput> {
  public static toDomain(task: TaskOutput): TaskOutput {
    return {
      id: task.id,
      projectId: task.projectId,
      project: task.project,
      title: task.title,
      description: task.description,
      archived: task.archived,
      completed: task.completed,
      priority: task.priority,
      dueDate: task.dueDate,
      assigneeId: task.assigneeId,
      assignee: task.assignee,
      reporterId: task.reporterId,
      reporter: task.reporter,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      deletedAt: task.deletedAt || null,
    };
  }
}
