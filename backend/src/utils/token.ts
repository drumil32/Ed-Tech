import jwt from 'jsonwebtoken';
import jwtTokenModel from '../models/jwtTokenModel.js';
import createHttpError from 'http-errors';

export const tokenGenerator = (payload: any) => {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRATION_TIME! });
}

export const manageUserTokens = async (phoneNumber: string) => {
    let userTokens = await jwtTokenModel.findOne({ phoneNumber });
    if (userTokens) {
        // If user already exists, check the token array length
        if (userTokens.token.length == 3) {
            // Return error if the token array length exceeds the limit
            userTokens = await deleteExpiredToken(phoneNumber);
            if (userTokens.token.length == 3) {
                throw createHttpError(403, 'Login limit exceeded. Please log out from other devices.');
            }
        }
        const token = tokenGenerator({ phoneNumber });
        // Add the new token to the array
        userTokens.token.push(token);
        await userTokens.save();
        return token;
    } else {
        const token = tokenGenerator({ phoneNumber });

        // If user does not exist, create a new entry with the token array
        userTokens = new jwtTokenModel({
            phoneNumber,
            token: [token]
        });
        await userTokens.save();
        return token;
    }
}

export const verifyJwtToken = async (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET) as { [key: string]: any };
}

export const verifyAdminJwtToken = async (token: string) => {
    return jwt.verify(token, process.env.ADMIN_JWT_SECRET) as { [key: string]: any };
}

export const decodeJwtToken = (token: string) => {
    return jwt.decode(token) as { [key: string]: any };
}

export const deleteExpiredToken = async (phoneNumber: string) => {

    const userTokens = await jwtTokenModel.findOne({ phoneNumber });

    userTokens.token = userTokens.token.filter(token => {
        try {
            jwt.verify(token, process.env.JWT_SECRET) as { [key: string]: any };
            return true;
        } catch (error) {
            return false;
        }
    });
    await userTokens.save();
    return userTokens;
}