import { Request, Response, NextFunction } from "express";


const authorizedRoles = (...roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if(!roles.includes(user.role)){
        res.status(403).json({
            success: false,
            message: "Access denied"
        })
        return;
    }

    next();
}

export default authorizedRoles;