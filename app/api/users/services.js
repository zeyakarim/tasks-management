const { Op } = require("sequelize");
const sequelize = require("../../../config/database");
const AppError = require("../../utilities/appError");
const { Users } = require("./models");
const jwt = require('jsonwebtoken');
const ms = require('ms');

const signUpService = async (data) => {
    const transaction = await sequelize.transaction();
    try {
        const checkUser = await Users.findOne({
            where: {
                [Op.or]: [
                    { username: data?.username },
                    { email: data?.email }
                ]
            }
        });

        if (checkUser) {
            throw AppError('User already exists in the Database!', 422, 'UnprocessableEntity');
        }

        const user = await Users.create(data, {
            returning: true,
            transaction: transaction,
        });

        await transaction.commit();
        return user;
    } catch (error) {
        await transaction.rollback();
        throw(error)
    }
}

const loginService = async (data) => {
    const { username, password } = data;
    try {
        if (!username || !password) {
            throw AppError('Please provide username and password.', 422, 'UnprocessableEntity')
        }
        
        const user = await Users.findOne({
            where: {
                username,
                password
            }
        })

        if (!user) {
            throw AppError('Please provide correct credentials', 422, 'UnprocessableEntity')
        }

        const token = signToken(user.id);

        return { user, token };
    } catch (error) {
        throw(error)
    }
}

const signToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_COOKIE_EXPIRES_IN || '1d' }
    );
};

const sendAuthCookie = (token, res, exp) => {
    const cookieOptions = {
        expires: new Date(Date.now() + ms(exp || process.env.JWT_COOKIE_EXPIRES_IN)),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // HTTPS-only in production
        sameSite: 'strict', // Prevent CSRF
    };
    res.cookie('jwt', token, cookieOptions);
};

module.exports = {
    signUpService,
    loginService,
    sendAuthCookie
}