import { HttpStatusCode } from "./httpStatusCodes";
import Logger from "./logger";

export default class AppError extends Error {
    public readonly name: string;
    public httpCode: HttpStatusCode;
    public isOperational: boolean;
    public description: string;

    constructor(
        name: string,
        httpCode: HttpStatusCode,
        description: string,
        isOperational: boolean
    ) {
        super(description);
    
        Object.setPrototypeOf(this, new.target.prototype);
    
        this.name = name;
        this.httpCode = httpCode;
        this.isOperational = isOperational;
        this.description = description;
    
        Error.captureStackTrace(this);
    }
}

class ErrorHandler {
    public async handleError(err: Error): Promise<void> {
      await Logger.error(err);
    }
  
    public isTrustedError(error: Error) {
      if (error instanceof AppError) {
        return error.isOperational;
      }
      return false;
    }
  }
  
  export const handler = new ErrorHandler();