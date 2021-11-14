import Logger from "../../utils/logger";
import TaskDal from "../dal/task-dal";
import { Tasks } from "../models";
import { CrudService } from "../../core/services/crud-service";
import { TaskInput, TaskOutput } from "../../interfaces";
import ProjectService from "./project-service";
import UserService from "./user-service";

export default class TaskService extends CrudService {
  public model = Tasks;
  public modelName = "tasks";

  public create = async (payload: TaskInput): Promise<TaskOutput> => {
    const { reporter, assignee, project, id } = payload;
    let reporterRes = null;
    let assigneeRes = null;
    let projectRes = null;

    try {
      const projectService = new ProjectService();
      const projectName = project?.name || "";
      projectRes = await projectService.findProjectByName(projectName);
      Logger.debug(
        `Project response in task service: ${JSON.stringify(projectRes)}`,
      );
    } catch (error) {
      Logger.error(error.message);
    }

    const userService = new UserService();
    try {
      const reporterEmail = reporter?.email || "";
      reporterRes = await userService.findUserByEmail(reporterEmail);
      Logger.debug(
        `Reporter response in task service: ${JSON.stringify(reporterRes)}`,
      );
    } catch (error) {
      Logger.error(error.message);
    }

    try {
      const assigneeEmail = assignee?.email || "";
      assigneeRes = await userService.findUserByEmail(assigneeEmail);
      Logger.debug(
        `Assignee response in task service: ${JSON.stringify(assigneeRes)}`,
      );
    } catch (error) {
      Logger.error(error.message);
    }

    const taskData: TaskInput = {
      ...payload,
      assigneeId: assigneeRes?.id || null,
      reporterId: reporterRes?.id,
      projectId: projectRes?.id,
      dueDate: new Date(),
    };
    Logger.debug(`Task input data: ${JSON.stringify(taskData)}`);

    if (!id) {
      const createdTask = await TaskDal.create(taskData);
      Logger.debug(
        `Created task in task service: ${JSON.stringify(createdTask)}`,
      );

      return createdTask;
    } else {
      const updatedTask = await TaskDal.update(id, taskData);
      Logger.debug(
        `Updated task in task service: ${JSON.stringify(updatedTask)}`,
      );

      return updatedTask;
    }
  };
}
