import {json, Router} from "express";

import UserController from '../../controller/User/UserController';



const router = Router();


// 회원가입 ✅
router.post("/join", UserController.userJoin);

// 전화번호 중복 검사 ✅
/*
router.post("/phone/check", UserController.getUserPhone);

// 전화번호 중복 검사 ✅
router.post("/email/check", UserController.getUserEmail);
*/
export default router;