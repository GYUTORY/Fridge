import {Request, Response} from "express";
import BaseHandler from "../BaseHandler";
import {User, UserEmail, UserPhone} from "../../../models/UserModel";
import {DataValidator} from "../../../service/DataValiator";
import Logger from "../../../modules/Logger";
import UserService from "../../service/user/UserService";


class UserController extends BaseHandler {

    public userJoin = async (req: Request, res: Response) => {
        try {

            const data = await DataValidator<User>(req.body)

            if(!data) {
                return this.validErr(res);
            }

            const [joinRes, joinCode] = await UserService.userLogin(data);

            if(!joinRes)
                return this.false(res, joinCode);

            this.true(res, 'L01');

        } catch (err) { // 유효성 검사 에러 처리
            this.err(res, err);
        }
    }

    public getUserPhone = async (req: Request, res: Response) => {
        try {

            const data = await DataValidator<UserPhone>(req.body)

            if(!data) {
                return this.validErr(res);
            }

            const phoneData = await UserService.getUserPhone(data.phone_number);

            if(!phoneData)
                return this.true(res, "PO1");

            this.false(res, "PO1");

        } catch (err) { // 유효성 검사 에러 처리
            this.err(res, err);
        }
    }

    public getUserEmail = async (req: Request, res: Response) => {
        try {

            const data = await DataValidator<UserEmail>(req.body)

            if(!data) {
                return this.validErr(res);
            }

            const emailData = await UserService.getUserPhone(data.email);

            if(!emailData)
                return this.true(res, "EO1");

            this.false(res, "EO1");

        } catch (err) { // 유효성 검사 에러 처리
            this.err(res, err);
        }
    }


}


export default new UserController();
