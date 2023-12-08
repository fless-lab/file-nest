class AppError extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode=statusCode
    }
}

class FileNotFoundError extends AppError{
    constructor(message="File Not Found"){
        super(message,404);
    }
}



module.exports = {
    AppError,
    FileNotFoundError
}