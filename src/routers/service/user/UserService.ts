import {User} from "../../../models/UserModel";
import Logger from "../../../modules/Logger";
import { PrismaClient } from '@prisma/client';
import moment from "moment";
import  { v4 as uuidv4 } from "uuid";
const prisma = new PrismaClient();



export default class UserService {


    // https://www.prisma.io/docs/orm/prisma-client/client-extensions/query
    public static async userLogin(user: User): Promise<[boolean, string]> {

        try {

            const phoneData = await this.getUserPhone(user.phone_number);

            // 전화번호 예외처리
            if (phoneData)
                return [false, "FX0"];

            const userId = await this.generateUserId();

            // userId 예외처리
            if (!userId)
                return [false, "UC0"];





            const createdUser = await prisma.user.create({
                data : {
                    user_id: userId,
                    username: user.name,
                    email: user.email,
                    phone_number: user.phone_number
                }
            });



            return [true, "UC0"];

        } catch (err) {
            Logger.error(err);
            return [false, "UC0"];
        }
    }

    public static async generateUserId(): Promise<string | null> {
        try {
            // UUID 생성
            const uuid = uuidv4();

            // 현재 시간을 밀리초로 포맷팅
            const currentTime = moment().format('x');

            // UUID와 현재 시간 결합
            const combinedString = uuid + currentTime;

            // - 제거한다.
            const stringWithoutHyphens = combinedString.replace(/-/g, '');

            // 날짜와 UUID 랜더링
            const randomUserId = stringWithoutHyphens.split('').sort(() => Math.random() - 0.5).join('');

            // 35글자로 자르기
            const targetUserId = randomUserId.substring(0, 35);

            return targetUserId || null;
        } catch (err) {
            return null;
        }
    }



    public static async getUserPhone(phoneNumber: string) {
        try {


            const phoneData = await prisma.user.findFirst({
                where: {
                    phone_number: phoneNumber
                }
            });

            return !!phoneData;

        } catch (err) {
            Logger.error("getUserPhone " + err);
            return null;
        }
    }

}