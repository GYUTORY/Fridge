import {Router} from "express";
import UserRoutes from "./user/UserRoutes";
// import Logger from "../../modules/Logger";


const router = Router();

// 고객 서비스
router.use("/api/user", UserRoutes);

export default router;

