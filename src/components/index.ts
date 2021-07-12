import express, { Response, Request } from "express";
import { AppResponse, SuccessResponse, Status } from "../helpers/response";
import { HttpStatusCode } from "../helpers/httpStatusCodes"
import users from "./user";

const router = express.Router();

const BASE_ROUTE_MESSAGE = ""

export const handleResponse = function(
    response: AppResponse,
    res: Response<any>,
  ) {
    let resp = Object.assign({}, response);
    delete resp.httpCode;
    res.status(response.httpCode as number).json(resp)
  };

router.get('/', (req: Request, res: Response) => {
    return handleResponse(new SuccessResponse(Status.SUCCESS, {}, BASE_ROUTE_MESSAGE, HttpStatusCode.OK), res);
});

router.use('/users', users);

export default router;