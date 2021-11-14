import { Mapper } from "../core/infra/mapper";
import { ProjectOutput } from "../interfaces";

export default class UserMapper extends Mapper<ProjectOutput> {
  public static toDomain(project: ProjectOutput): ProjectOutput {
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      createdById: project.createdById,
      createdBy: project.createdBy,
      tasks: project.tasks || [],
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      deletedAt: project.deletedAt || null,
    };
  }
}
