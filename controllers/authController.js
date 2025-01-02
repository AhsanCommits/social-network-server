import Users from '../models/userModel.js'
import { hashString, compareString, createJWT } from '../utils/index.js';

export const register = async (req, res, next) => {
    const {firstName, lastName, email, password} = req.body;

    // validate fields
    if (!(firstName || lastName || email || password)) {
        next("Provide Required Fields");
        return;
    }

    try {
        const emailExists = await Users.findOne({ email });

        if (emailExists) {
            next("Email already exists");
            return;
        };
        
        const hashedPassword = await hashString(password);

        const user = await Users.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            status: "success",
            data: user,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json(
            {
                status: "fail",
                message: error.message,
            }
        );
        next(error);
    }
};                                                                                                  
export const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        if (!(email || password)) {
            next("Please provide email and password");
            return;
        }
        const user = await Users
            .findOne({ email })
            .select("+password").populate({ 
                path: "friends",
                select: "firstName lastName location profileUrl -password",
            });
            
        if (!user) {
            next("Invalid Credentials");
            return;
        }
        
        const isPasswordValid = await compareString(password, user?.password);

        if (!isPasswordValid) {
            next("Invalid Credentials");
            return;
        }

        user.password = undefined;

        const token = createJWT(user?._id);
        
        res.json({
            status: true,
            message: "Logged in successfully",
            token,
            user,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json(
            {
                status: "fail",
                message: error.message,
            }
        );
        next(error);
    }
};