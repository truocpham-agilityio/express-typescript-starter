const HTTP_STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  UNPROCESSABLE_ENTITY: 422,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const HTTP_MESSAGE = {
  OK: "Success",
  CREATED: "Created",
  NO_CONTENT: "No content",
  BAD_REQUEST: "Bad request",
  UNAUTHORIZED: "Unauthorized",
  UNPROCESSABLE_ENTITY: "Unprocessable entity",
  NOT_FOUND: "Not found",
  INTERNAL_SERVER_ERROR: "Internal server error",
};

export { HTTP_MESSAGE, HTTP_STATUS_CODE };
