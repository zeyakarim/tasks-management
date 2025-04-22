require('dotenv').config(); // this is important!
const AppError = require("../../utilities/appError");
const catchAsync = require("../../utilities/catchAsync");
const { success, failure } = require("../../utilities/responseHandler");
const { Users } = require("./models");
const { signUpService, loginService, sendAuthCookie } = require("./services");
const jwt = require('jsonwebtoken');

exports.signup = catchAsync(async (req, res, next) => {
    try {
        const { data } = req.body;
        const userSignedUp = await signUpService(data);
        res.json(success(userSignedUp, "User Sign-Up Successfully!"))
    }  catch (error) {
        res.json(failure(error, error?.message))
    }
});

exports.login = catchAsync(async (req, res, next) => {
    try {
        const { data } = req.body;
        const { user, token } = await loginService(data, res);

        sendAuthCookie(token, res);

        user.password = undefined;

        res.json(success(user, "User Logged-in Successfully!"));
    } catch (error) {
        res.json(failure(error, error?.message))
    }
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
    const cookie = req.cookies['jwt'];
  
    if (!cookie) {
        return next(
            AppError(
                'You are not logged in. Please login to continue.',
                401,
                'Unauthorized',
            ),
        );
    }
  
    const decoded = jwt.verify(cookie, process.env.JWT_SECRET, {
      complete: true,
    });
  
    if (!decoded) {
        return next(
            AppError(
                'You are not logged in. Please login to continue.',
                401,
                'Unauthorized',
            ),
        );
    }
  
    const user = await Users.findOne({
        attributes: {
            exclude: ['password', 'createdAt', 'updatedAt'],
        },
        where: {
            id: decoded.payload.id
        }
    });
  
    req.user = user.toJSON();
  
    next();
});

exports.getMe = catchAsync(async (req, res, next) => {  
    let cookie = req.cookies['jwt'];
    let decoded = jwt.verify(cookie, process.env.JWT_SECRET, {
        complete: true,
    });

    const user = await Users.findOne({
        where: { id : decoded?.payload?.id }
    });

    res.json(success(user, "User Logged-in Successfully!"));
});