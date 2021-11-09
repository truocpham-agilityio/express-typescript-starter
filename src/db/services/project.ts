import Logger from "../../utils/logger";
import UserDal from "../dal/user";
import ProjectDal from "../dal/project";
import { CrudService } from "../../core/services/crud";
import { ProjectInput, ProjectOutput, UserInput } from "../interfaces";
import { Projects } from "../models";

export default class ProjectService extends CrudService {
  public model = Projects;
  public modelName = "projects";

  public create = async (payload: ProjectInput): Promise<ProjectOutput> => {
    const { createdBy, id } = payload;
    const userRes = await UserDal.findOrCreate(createdBy as UserInput);

    Logger.debug(`Created user in project service: ${JSON.stringify(userRes)}`);

    const projectData = {
      ...payload,
      createdById: userRes.id,
    };

    if (!id) {
      const createdProject = await ProjectDal.create(projectData);

      Logger.debug(
        `Created project in project service: ${JSON.stringify(createdProject)}`,
      );

      return createdProject;
    } else {
      const updatedProject = await ProjectDal.update(id, projectData);

      Logger.debug(
        `Updated project in project service: ${JSON.stringify(updatedProject)}`,
      );

      return updatedProject;
    }
  };
}
