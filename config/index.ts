import dotenv from "dotenv";
import path from "path";
import * as process from "process";

process.env.ROOT_PATH = path.join(__dirname, "..");

// 환경 변수 파일 경로 설정
const envPath = path.join(__dirname, `/${process.argv[3]}/.env.${process.argv[2].toLowerCase()}`);

// 환경 변수 로드
dotenv.config({ path: envPath });

interface LogConfig {
    LEVEL: string;
    FILE_CNT: string;
    FILE_SIZE: string;
    PATH: string;
}

interface ServerConfig {
    PORT: string;
}

class Config {
    LOG: LogConfig;
    SERVER:  ServerConfig

    constructor() {
        this.LOG = {
            LEVEL: process.env.LOG_LEVEL || "info",
            FILE_CNT: process.env.LOG_FILE_CNT || "5",
            FILE_SIZE: process.env.LOG_FILE_SIZE || "10m",
            PATH: process.env.LOG_PATH || "",
        };
        this.SERVER = {
            PORT: process.env.SERVER_PORT || "0",
        };
    }
}


export default new Config();