import {Request, Response} from "express";
import BaseHandler from "../BaseHandler";
import {UserEmailValidate, UserJoinValidate, UserPhoneValidate} from "../../../models/UserModel";
import {DataValidator} from "../../../service/DataValiator";
import Logger from "../../../modules/Logger";
import UserService from "../../service/user/UserService";
import {UserJoin} from "../../../entity/user/User";
// import {UserJoin} from "../../../entity/user/User";


class UserController extends BaseHandler {

    public userJoin = async (req: Request, res: Response) => {
        try {

            // req.body를 Partial<User> 타입으로 전달하여 부분적으로 사용
            const data = await DataValidator(req.body, UserJoinValidate) as UserJoin;

            if(!data) {
                return this.validErr(res);
            }

            const userJoinRes = await UserService.userJoin(data);

            if(!userJoinRes.result)
                return this.false(res, userJoinRes.message);

            this.true(res, 'L01');

        } catch (err) { // 유효성 검사 에러 처리
            this.err(res, err);
        }
    }

    public userUpdate = async (req: Request, res: Response) => {
        try {

            // req.body를 Partial<User> 타입으로 전달하여 부분적으로 사용
            const data = await DataValidator(req.body, UserJoinValidate) as UserJoin;

            if(!data) {
                return this.validErr(res);
            }

            const userJoinRes = await UserService.userUpdate(data);

            if(!userJoinRes.result)
                return this.false(res, userJoinRes.message);

            this.true(res, 'L01');

        } catch (err) { // 유효성 검사 에러 처리
            this.err(res, err);
        }
    }

    public getUserPhone = async (req: Request, res: Response) => {
        try {

            // const data = await DataValidator(req.body, User)
            const data = await DataValidator(req.body, UserPhoneValidate) as UserJoin;

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

            const data = await DataValidator(req.body, UserEmailValidate) as UserJoin;

            if(!data) {
                return this.validErr(res);
            }

            const emailData = await UserService.getUserEmail(data.email);

            if(!emailData)
                return this.true(res, "EO1");

            this.false(res, "EO1");

        } catch (err) { // 유효성 검사 에러 처리
            this.err(res, err);
        }
    }



}


export default new UserController();
