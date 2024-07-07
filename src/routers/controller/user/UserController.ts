import {Request, Response} from "express";
import BaseHandler from "../BaseHandler";



class UserController extends BaseHandler {

    public userJoin = async (req: Request, res: Response) => {

        try {

            this.true(res, "L01");

        } catch (err) { // 유효성 검사 에러
            this.err(res, err);
        }

    }


}


export default new UserController();
