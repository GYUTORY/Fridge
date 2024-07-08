import typia from 'typia';
import Logger from '../modules/Logger';

// 사용자 정보 인터페이스 정의
export interface User {
    id: string;
    name: string;
    email: string;
    age?: number;
}


// typia를 사용한 검증기 생성
const validator = typia.createAssert<User>();

// 사용자 객체의 유효성을 검사하는 함수
export function validateUser(user: User): void {
    try {
        Logger.info("Hello");
        Logger.info(JSON.stringify(user));
        validator(user); // typia를 사용하여 유효성 검사 수행
    } catch (error) {
        Logger.error('Validation error:', error);
        throw new Error('User validation failed');
    }
}
