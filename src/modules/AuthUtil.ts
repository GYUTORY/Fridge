import crypto from "crypto";
import {v4 as uuidv4} from "uuid";
import {Request, Response, NextFunction} from "express";

import jwt, {JwtPayload} from "jsonwebtoken";
import crypto from "crypto";
import CryptoJS from "crypto-js";
import moment from "moment";

import Logger from "./Logger";
import Config from "../../config"


interface JwtModel {
    userId: string;
}

export class MyAuth {


    // JWT Auth
    // 클래스를 통해 인스턴스를 생성할 필요 없이, 클래스의 속성 또는 메서드를 사용
    private static jwtModel: JwtModel;

    userId: string;

    constructor(obj: JwtModel) {
        this.userId = obj.userId;
    };


    public static createToken(jwtModel: JwtModel) {

        const payload: JwtModel = {
            userId: jwtModel.userId
        };

        return jwt.sign(payload, Config.SECRET.JWT_SECRET, {expiresIn: Config.SECRET.JWT_EXPIRES});
    }


    // ================================================================================================
    public static async getEncryptPwd(userId: string, pwd: string) {

        try {
            const encryptedPassword = crypto.createHash('sha256').update(pwd + userId).digest('base64');

            if (encryptedPassword)
                return encryptedPassword;
            else
                return null;

        } catch (err) {
            Logger.error(err);
            return null;
        }
    }

    public static async compareEncryptPwd(userId: string, pwd: string, inputPwd: string) {

        try {
            const targetPwd = await this.getEncryptPwd(userId, inputPwd);

            if (targetPwd === pwd)
                return true;
            else
                return false;


        } catch (err) {
            Logger.error(err);
            return false;
        }
    }

}

interface JwtModel {
    userId: string;
}


export function JwtCheck(req: Request, res: Response, next: NextFunction) {

    try {

        let token = req.headers.authorization;

        if(!token)
            throw new Error("Not Exist Headers")

        if (token && token.startsWith("Bearer ")) {
            token = token.slice(7); // "Bearer " 부분을 제거하고 나머지 문자열 반환
        } else {
            // 토큰이 없거나 형식이 올바르지 않으면 처리
            res.status(401).json({success: false, message: "Unauthorized"});
            return;
        }

        // 토큰을 검증하고 복호화하며, 여기서 타입 단언을 사용하여 타입을 명시적으로 지정합니다.
        const jwtCheck = jwt.verify(token, Config.SECRET.JWT_SECRET) as JwtPayload;

        // 토큰에 담긴 정보를 가져옵니다.
        const userInfo: JwtModel = {
            userId: jwtCheck.userId
        };

        req.body.userId = userInfo.userId;

        next();

    } catch (err) {
        Logger.debug(err.stack);
        res.status(401).json({success: false, message: "Unauthorized"});
        return;
    }

}
