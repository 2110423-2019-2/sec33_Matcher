import { Request, Response } from 'express';
import HttpErrors from 'http-errors';

export const asyncHandler = (fn: any) => async (req: Request, res: Response, next: any): Promise<any> => {
    return Promise.resolve(fn(req, res, next)).catch(next);
};

export const errorHandler = (err: Error, req: Request, res: Response): void => {
    if (err instanceof HttpErrors.HttpError) {
        res.status(err.statusCode).json({ ...err, type: err.constructor.name, message: err.message });
    } else {
        res.status(500).json({ statusCode: 500 });
    }
};
