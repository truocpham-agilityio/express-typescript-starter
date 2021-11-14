import { Tasks } from "../models";
import { GetAllTasksFilters } from "./types";
import { TaskInput, TaskOutput } from "../../interfaces";
import { NOT_FOUND, UNABLE_CREATE_PROJECT } from "../../core/constants/errors";

class TaskDal {
  public model = Tasks;

  public create = async (payload: TaskInput): Promise<TaskOutput> => {
    return Tasks.create(payload);
  };

  public findOrCreate = async (payload: TaskInput): Promise<TaskOutput> => {
    try {
      const [project] = await Tasks.findOrCreate({
        where: {
          id: payload.id,
        },
        defaults: payload,
      });

      return project;
    } catch (error) {
      throw new Error(UNABLE_CREATE_PROJECT);
    }
  };

  public update = async (
    id: number,
    payload: Partial<TaskInput>,
  ): Promise<TaskOutput> => {
    const project = await Tasks.findByPk(id);
    if (!project) {
      throw new Error(NOT_FOUND);
    }
    const updatedProject = await (project as Tasks).update(payload);

    return updatedProject;
  };

  public getById = async (id: number): Promise<TaskOutput> => {
    const project = await Tasks.findByPk(id);
    if (!project) {
      throw new Error(NOT_FOUND);
    }

    return project;
  };

  public deleteById = async (id: number): Promise<boolean> => {
    const deletedProjectCount = await Tasks.destroy({
      where: { id },
    });

    return !!deletedProjectCount;
  };

  public getAll = async (
    filters?: GetAllTasksFilters,
  ): Promise<TaskOutput[]> => {
    return Tasks.findAll({
      ...((filters?.isDeleted || filters?.includeDeleted) && {
        paranoid: true,
      }),
    });
  };
}

export default new TaskDal();
