const HTTP_STATUS = {
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    204: 'NoContent',
    205: 'ResetContent',
    206: 'PartialContent',
    400: 'BadRequest',
    401: 'Unauthorized',
    402: 'PaymentRequired',
    403: 'Forbidden',
    404: 'NotFound',
    405: 'MethodNotAllowed',
    406: 'NotAcceptable',
    408: 'RequestTimeout',
    409: 'Conflict',
    422: 'UnprocessableEntity',
    429: 'TooManyRequests',
    500: 'ServerError',
    501: 'NotImplemented',
    502: 'BadGateway',
    503: 'ServiceUnavailable',
};
  
const response = {
    success: true,
    statusCode: 200,
    message: HTTP_STATUS['200'],
    data: null,
};

module.exports = {
    success(data, message, error = null, statusCode = 200) {
        return {
            ...response,
            statusCode: statusCode,
            statusMessage: HTTP_STATUS[statusCode],
            message,
            data,
            error
        };
    },

    failure(error, message, statusCode = 500) {
        return {
            ...response,
            success: false,
            statusCode: statusCode,
            statusMessage: HTTP_STATUS[statusCode],
            message,
            error,
        };
    },
};