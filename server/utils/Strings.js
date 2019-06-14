module.exports = {
  ERROR_MESSAGES: {
    AUTH_FAILURE: "Authentication Failed",
    SERVER_ERROR: "Server failed to process your request",
    DATA_NOT_FOUND: "Not Found",
    INVALID_ID: "Invalid Id. ID is in bad format or not present in database.",
    CONTAINS_SENSITIVE_INFORMATION:
      "Update body contains sensitive information",
    INVALID_PARAM: "Invalid parameter or queried data does not exist",
    EMPTY_UPDATE: "Body cannot be empty"
  },
  SUCCESS_MESSAGES: {
    SIGNUP_SUCCESS: "Signup Success",
    UPDATE_SUCCESS: "Update Complete",
    ROWS_DELETED: "Row/s Deleted",
    ROWS_UPDATED: "Row/s Updated"
  }
};
