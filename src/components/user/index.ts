import express, { Request, Response, NextFunction} from "express";
import UserModel from "./models/user";
import { ErrorResponse, Status, SuccessResponse } from "../../helpers/response";
import { HttpStatusCode } from "../../helpers/httpStatusCodes";
import { handleResponse } from "..";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get('/', async (req, res) => {
    const users = await UserModel.find({});
    try {
        res.status(200).json(users)
    } catch (error) {
        res.status(500).send(error);
    } 
})

router.post('/', async (req: Request, res: Response) => {
    const user = new UserModel(req.body);
    console.log(user);
    try {
        await user.save();
        handleResponse(new SuccessResponse(Status.SUCCESS, {}, "Sign up Successful", HttpStatusCode.OK), res);
    } catch (error) {
        handleResponse(new ErrorResponse(Status.ERROR, "Signup failed", HttpStatusCode.INTERNAL_SERVER_ERROR), res);
    } 
})

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserModel.findOne({email: req.body.email});
        const match = await user.comparePasswords(req.body.password);
        if (!user || !match) {
            return handleResponse(new ErrorResponse(Status.ERROR, "Authentication failed. Invalid user or password.", HttpStatusCode.UNAUTHORIZED), res);
        }

        const token = jwt.sign({email: user.email, fullName: user.fullName, _id: user._id}, process.env.TOKEN_SECRET as string, { expiresIn: '1800s' });
        
        return handleResponse(new SuccessResponse(Status.SUCCESS, token, "login Successful", HttpStatusCode.OK), res);
    } catch (error) {
        handleResponse(new ErrorResponse(Status.ERROR, "login failed", HttpStatusCode.INTERNAL_SERVER_ERROR), res);
    } 
    
});


export default router;