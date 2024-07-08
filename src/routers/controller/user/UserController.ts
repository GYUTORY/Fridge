import {Request, Response} from "express";
import BaseHandler from "../BaseHandler";
import {User, validateUser} from "../../../models/UserModel";

import DataValiator from "../../../service/DataValiator";


class UserController extends BaseHandler {

    public userJoin = async (req: Request, res: Response) => {
        try {
            // 클라이언트에서 전송된 데이터
            const userData: User = {
                id: req.body.id as string,
                name: req.body.name as string,
                email: req.body.email as string,
                age: req.body.age ? parseInt(req.body.age) : undefined,
            };

            // 유효성 검사
            validateUser(userData);


            this.true(res, 'L01');

        } catch (err) { // 유효성 검사 에러 처리
            this.err(res, err);
        }
    }


}


export default new UserController();
