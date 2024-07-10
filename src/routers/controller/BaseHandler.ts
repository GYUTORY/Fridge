import express, {Response} from "express";

import Logger from "../../modules/Logger";


export default class BaseHandler {

    validErr(res: express.Response) {

        const response = {
            success: false,
            message: "데이터 검증에 실패하였습니다."
        };
/*
        Logger.debug("API Response : " + JSON.stringify({
            success: false,
            message: "데이터 검증에 실패하였습니다."
        }));*/

        return res.status(200).json(response);
    }


    false(res: express.Response, message: string) {

        const response = {
            success: false,
            message: message
        };

  /*      Logger.debug("API Response : " + JSON.stringify({
            success: false,
            message: message
        }));
*/
        return res.status(200).json(response);

    }


    true(res: express.Response, message: string) {

        const response = {
            success: true,
            message: message
        };

/*        Logger.debug("API Response : " + JSON.stringify({
            success: true,
            message: message
        }));*/

        return res.status(200).json(response);

    }


    err(res: express.Response, err: any) {

        Logger.error(err + ' is Occurred');

        const response = {
            success: false,
            err: err
        };

        return res.status(200).json(response);

    }


}