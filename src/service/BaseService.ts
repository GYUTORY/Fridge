import Logger from "../modules/Logger";

interface baseReply {
    result: boolean,
    message: string,
    obj: any
}
export default class BaseService {

    static objTrue(message: string, obj = {}) {
        const response = {
            result: true,
            message: message,
            ...obj
        } as baseReply;

        Logger.debug("API Response : " + JSON.stringify(response));

        return response;
    }

    static objFalse(message: string, obj = {}) {
        const response = {
            result: false,
            message: message,
            ...obj
        } as baseReply;

        Logger.debug("API Response : " + JSON.stringify(response));

        return response;
    }

    static objError(err: any, obj = {}) {
        Logger.error(err + ' is Occurred');

        const response = {
            result: false,
            message: err
        } as baseReply;

        return response;
    }
}
