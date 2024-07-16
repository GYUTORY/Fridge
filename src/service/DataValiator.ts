import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import Logger from "../modules/Logger";

/**
 * 데이터를 클래스의 인스턴스로 변환하고 유효성 검사를 수행하는 함수
 * @param data 변환 및 유효성 검사할 데이터 객체
 * @param classType 데이터를 변환할 클래스의 타입
 * @returns 유효성 검사를 통과한 경우 T 타입의 객체, 실패한 경우 false 반환
 */
export async function DataValidator<T extends object>(data: any, classType: { new(...args: any[]): T }): Promise<T | false> {
    try {
        // 데이터 객체를 T 타입의 클래스 인스턴스로 변환
        const instance = plainToClass(classType, data);

        // Validate the instance
        const errors: ValidationError[] = await validate(instance);

        if (errors.length > 0) {
            Logger.error(errors.map(error => Object.values(error.constraints!)).join(', '));
            return false;
        }

        // 유효성 검사를 통과한 인스턴스를 반환
        return instance;
    } catch (err) {
        Logger.error('Error during data validation:', err);
        return false;
    }
}
