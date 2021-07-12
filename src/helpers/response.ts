export enum Status {
    ERROR = "error",
    SUCCESS = "success"
}

export interface AppResponse {
    status: Status;
    message?: string;
    data?: any;
    httpCode?: number | null;
}

export class SuccessResponse implements AppResponse {
    status: Status;
    data?: any;
    httpCode?: number;
    message?: string

    constructor(status: Status, data: any, message: string, httpCode?: number) {
        this.status = status;
        this.data = data;
        this.httpCode = httpCode;
        this.message = message
    }
}

export class ErrorResponse implements AppResponse {
    status: Status;
    httpCode?: number | null;
    message: string;
    data?: any;
    constructor(status: Status, message: string, httpCode?: number | null, data?: any) {
        this.status = status;
        this.message = message;
        this.httpCode = httpCode;
        this.data = data || null;
    }
}