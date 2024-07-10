// validationUtils.ts

import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import Logger from "../modules/Logger";

/**
 * 데이터를 클래스의 인스턴스로 변환하고 유효성 검사를 수행하는 함수
 * @param data 변환 및 유효성 검사할 데이터 객체
 * @returns 유효성 검사를 통과한 경우 T 타입의 객체, 실패한 경우 false 반환
 */
export async function DataValidator<T extends object>(data: any): Promise<T | false> {

    // 데이터 객체의 생성자 함수를 추출하여 T 타입의 클래스 생성자로 캐스팅
    // { new(...args: any[]): T } : TypeScript에서 제네릭 클래스 타입을 정의하는 방법입니다. 이 구문은 클래스의 생성자 함수 시그니처를 나타냅니다.
    const classType = data.constructor as { new(...args: any[]): T };

    // 데이터 객체를 T 타입의 클래스 인스턴스로 변환
    const instance = plainToClass(classType, data);

    // 변환된 인스턴스를 통해 유효성 검사 수행
    const errors = await validate(instance);

    if (errors.length > 0) {
        Logger.error(errors.map(error => Object.values(error.constraints!)).join(', '));
        return false;
    }

    // 유효성 검사를 통과한 인스턴스를 반환
    return instance;
}