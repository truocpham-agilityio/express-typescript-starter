import { Projects } from "../models";
import { GetAllProjectsFilters } from "./types";
import { ProjectInput, ProjectOutput } from "../../interfaces";
import { NOT_FOUND, UNABLE_CREATE_PROJECT } from "../../core/constants/errors";

class ProjectDal {
  public model = Projects;

  public create = async (payload: ProjectInput): Promise<ProjectOutput> => {
    return Projects.create(payload);
  };

  public findOrCreate = async (
    payload: ProjectInput,
  ): Promise<ProjectOutput> => {
    try {
      const [project] = await Projects.findOrCreate({
        where: {
          name: payload.name,
        },
        defaults: payload,
      });

      return project;
    } catch (error) {
      throw new Error(UNABLE_CREATE_PROJECT);
    }
  };

  public getAll = async (
    filters?: GetAllProjectsFilters,
  ): Promise<ProjectOutput[]> => {
    return Projects.findAll({
      ...((filters?.isDeleted || filters?.includeDeleted) && {
        paranoid: true,
      }),
    });
  };

  public getById = async (id: number): Promise<ProjectOutput> => {
    const project = await Projects.findByPk(id);
    if (!project) {
      throw new Error(NOT_FOUND);
    }

    return project;
  };

  public getByName = async (name: string): Promise<ProjectOutput | null> => {
    const project = await Projects.findOne({
      where: {
        name,
      },
    });

    if (!project) {
      throw new Error(NOT_FOUND);
    }

    return project;
  };

  public update = async (
    id: number,
    payload: Partial<ProjectInput>,
  ): Promise<ProjectOutput> => {
    const project = await Projects.findByPk(id);
    if (!project) {
      throw new Error(NOT_FOUND);
    }
    const updatedProject = await (project as Projects).update(payload);

    return updatedProject;
  };

  public deleteById = async (id: number): Promise<boolean> => {
    const deletedProjectCount = await Projects.destroy({
      where: { id },
    });

    return !!deletedProjectCount;
  };
}

export default new ProjectDal();
