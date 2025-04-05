const AppError = (message, statusCode, status) =>{
    const error = new Error(message);
  
    error.statusCode = statusCode; // HTTP status code (e.g., 404, 500)
    error.status = status; // HTTP status (e.g., 'fail', 'error')
    error.isOperational = true; // To distinguish operational errors
    error.errorMessage = error.message; // Retain the original message
  
    // Captures the stack trace, excluding this function from the trace
    Error.captureStackTrace(error, AppError);
  
    return error;
}

module.exports = AppError;