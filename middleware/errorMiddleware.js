// ERROR MIDDLEWARE | NEXT FUNCTION

export const errorMiddleware = (err, req, res, next) => {
    const defaultError = {
        statusCode: 404,
        status: "failed",
        message: err,
    };

    if (err?.name === "ValidationError") {
        defaultError.statusCode = 404;

        defaultError.message = Object.values(err.errors).map((val) => val.message);
        defaultError.success = "failed";
    }

    if (err?.code && err?.code === 11000) {
        defaultError.statusCode = 404;
        defaultError.message = `${Object.values(
            err.keyValue
        )} field has to be unique!`;
    }

    res.status(defaultError.statusCode).json({
        message: defaultError.message,
        success: defaultError.success
    });

};