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
            throw createHttpError(403, 'Login limit exceeded. Please log out from other devices.');
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
    if (!token) {
        throw createHttpError(401, 'Please Login.');
    }
    const tokenString = token.replace('Bearer ', '');
    let decoded = null;
    try {
        decoded = jwt.verify(tokenString, process.env.JWT_SECRET) as { [key: string]: any };
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            const decoded = jwt.decode(tokenString);
            const userTokens = await jwtTokenModel.findOne({ phoneNumber: decoded.phoneNumber });
            userTokens.token = userTokens.token.filter(token => {
                try {
                    jwt.verify(token, process.env.JWT_SECRET) as { [key: string]: any };
                    return true;
                } catch (error) {
                    return false;
                }
            });
            await userTokens.save();
        }
        throw createHttpError(401, 'Please Login.');
    }

    const userTokens = await jwtTokenModel.findOne({ phoneNumber: decoded.phoneNumber });
    if (!userTokens) {
        throw createHttpError(401, 'Please Login.');
    }
    if (!userTokens.token.includes(tokenString)) {
        throw createHttpError(401, 'Please Login.');
    }
    return decoded;
}