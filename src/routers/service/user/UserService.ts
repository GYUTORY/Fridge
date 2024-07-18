import { UserEmailValidate, UserJoinValidate, UserPhoneValidate } from "../../../models/UserModel";
import Logger from "../../../modules/Logger";
import { PrismaClient } from '@prisma/client';
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { UserJoin } from "../../../entity/user/User";
import BaseService from "../../../service/BaseService";

const prisma = new PrismaClient();

export default class UserService extends BaseService {

    public static async userJoin(userInfo: UserJoin) {
        try {

            // 전화번호 중복 검증
            const phoneData = await this.getUserPhone(userInfo.phone_number);
            if (!phoneData) return this.objFalse("FX0");

            // 유저아이디
            const userId = await this.setUserId();
            if (!userId.result) return this.objFalse("UC0");

            // userId Setting
            userInfo.user_id = userId.obj;

            // 회원가입
            const userRegRes = await this.setUserInfo(userInfo);

            if (!userRegRes) return this.objFalse("UR0");

            return this.objTrue("UJS");

        } catch (err) {
            Logger.error(err);
            return this.objError(err);
        }
    }

    public static async userUpdate(userInfo: UserJoin) {
        try {

            await prisma.user.update({
                where: {
                    user_id: userInfo.user_id,  // 업데이트할 사용자의 ID를 지정
                },
                data: {
                    username: userInfo?.name ?? '',  // 업데이트할 사용자 이름
                    email: userInfo?.email ?? '',  // 업데이트할 사용자 이메일
                    phone_number: userInfo.phone_number ?? ''  // 업데이트할 사용자 전화번호
                }
            });

            return this.objTrue("U01");


        } catch (err) {
            Logger.info("잉 시발")
            Logger.error(err);
            return this.objError(err);
        }
    }



    public static async setUserInfo(userInfo: UserJoin) {
        try {

            const newUser = await prisma.user.create({
                data: {
                    user_id: userInfo.user_id,
                    username: userInfo.name,
                    email: userInfo.email,
                    phone_number: userInfo.phone_number,
                    logins: {
                        create: [{
                                login_id: userInfo.login_id,
                                pwd: userInfo.password
                            }]
                    }
                },
                include: {
                    logins: true
                }
            });


            return this.objTrue("U01");

        } catch (err) {
            Logger.error(err);
            return this.objError(err);
        }
    }



    public static async setUserId() {
        try {
            const uuid = uuidv4();
            const currentTime = moment().format('x');
            const combinedString = uuid + currentTime;
            const stringWithoutHyphens = combinedString.replace(/-/g, '');
            const randomUserId = stringWithoutHyphens.split('').sort(() => Math.random() - 0.5).join('');
            const targetUserId = randomUserId.substring(0, 35);

            return this.objTrue("P01", {userId: targetUserId});

        } catch (err) {
            return this.objError(err);
        }
    }

    public static async getUserPhone(phoneNumber: string) {
        try {
            const phoneData = await prisma.user.findFirst({
                where: {
                    phone_number: phoneNumber
                }
            });

            if(!phoneData)
                return this.objTrue("P01");

            return this.objFalse("P01", phoneData);

        } catch (err) {
            return this.objError(err);
        }
    }

    public static async getUserEmail(email: string) {
        try {
            const emailData = await prisma.user.findFirst({
                where: {
                    email: email
                }
            });

            if(!emailData)
                return this.objTrue("E01");

            return this.objFalse("E01", emailData);

        } catch (err) {
            return this.objError(err);
        }
    }
}
