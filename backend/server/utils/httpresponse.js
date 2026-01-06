const success = (res, data, message = "Request successful") => {
    res.status(200).json({
        status: 'success',
        success: true,
        message,
        data
    });
};

const created = (res, data, message = "Resource created successfully") => {
    res.status(201).json({
        status: 'success',
        success: true,
        message,
        data
    });
}

const error = (res, data, message, statusCode) => {
    res.status(statusCode || 500).json({
        status: 'error',
        success: false,
        message: data.message || message,
        data: data.stack || null
    });
};

const notFound = (res, data, message = "Resource not found") => {
    res.status(404).json({
        status: 'error',
        success: false,
        message,
        data: data || null
    });
}

const unauthorized = (res, data, message = "Unauthorized access") => {
    res.status(401).json({
        status: 'error',
        success: false,
        message,
        data: data || null
    });
}

const forbidden = (res, data, message = "Forbidden access") => {
    res.status(403).json({
        status: 'error',
        success: false,
        message,
        data: data || null
    });
}

module.exports = {
    success,
    created,
    error,
    notFound,
    unauthorized,
    forbidden
};