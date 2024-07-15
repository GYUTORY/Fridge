import {Request, Response} from "express";
import BaseHandler from "../BaseHandler";
import {User} from "../../../models/UserModel";
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


}


export default new UserController();
