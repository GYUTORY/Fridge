import {Request, Response} from "express";
import BaseHandler from "../BaseHandler";
import {UserJoinValidate} from "../../../models/UserModel";
import {DataValidator} from "../../../service/DataValiator";
import Logger from "../../../modules/Logger";
import UserService from "../../service/user/UserService";


class UserController extends BaseHandler {

    public userJoin = async (req: Request, res: Response) => {
        try {

            // req.body를 Partial<User> 타입으로 전달하여 부분적으로 사용
            const data = await DataValidator(req.body, UserJoinValidate);

            if(!data) {
                return this.validErr(res);
            }

            const [joinRes, joinCode] = await UserService.userLogin(data);


            // todo 수정해야함
            /*if(!joinRes)
                return this.false(res, joinCode);*/

            this.true(res, 'L01');

        } catch (err) { // 유효성 검사 에러 처리
            this.err(res, err);
        }
    }
/*

    public getUserPhone = async (req: Request, res: Response) => {
        try {

            // const data = await DataValidator(req.body, User)
            const data = await DataValidator(req.body, User) as Pick<User, "phone_number">;

            if(!data) {
                return this.validErr(res);
            }

            const phoneData = await UserService.getUserPhone(data);

            if(!phoneData)
                return this.true(res, "PO1");

            this.false(res, "PO1");

        } catch (err) { // 유효성 검사 에러 처리
            this.err(res, err);
        }
    }

    public getUserEmail = async (req: Request, res: Response) => {
        try {

            const data = await DataValidator(req.body, User)

            if(!data) {
                return this.validErr(res);
            }

            const emailData = await UserService.getUserEmail(data);

            if(!emailData)
                return this.true(res, "EO1");

            this.false(res, "EO1");

        } catch (err) { // 유효성 검사 에러 처리
            this.err(res, err);
        }
    }
*/


}


export default new UserController();
