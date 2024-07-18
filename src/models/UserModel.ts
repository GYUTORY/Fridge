import {
    Length,
    IsEmail,
    IsOptional,
    IsInt,
    Min,
    Max,
    IS_PHONE_NUMBER,
    IsPhoneNumber,
    ValidationArguments, ValidationOptions, registerDecorator
} from "class-validator";

export class UserJoinValidate {
    @IsOptional()
    @Length(3, 20, { message: "ID must be between 3 and 20 characters" })
    id: string;

    @Length(2, 50, { message: "Name must be between 2 and 50 characters" })
    name: string;

    @Length(5, 10, { message: "Name must be between 5 and 10 characters" })
    login_id: string;

    @Length(8, 20, { message: "Name must be between 8 and 20 characters" })
    password: string;

    @IsKoreanPhoneNumber({ message: "Invalid Korean phone number format. Must be in the format 010-1234-5678" })
    phone_number: string;

    @IsEmail({}, { message: "Invalid email format" })
    email: string;

    @IsInt({ message: "Age must be an integer" })
    @Min(18, { message: "Age must be at least 18" })
    @Max(100, { message: "Age cannot be greater than 100" })
    age: number;

    @IsOptional()
    user_id: string;


    constructor(user_id: string, id: string, name: string, phone_number: string, email: string, age: number, login_id: string, password: string) {
        this.user_id = user_id;
        this.login_id = login_id;
        this.password = password;
        this.id = id;
        this.name = name;
        this.email = email;
        this.age = age;
        this.phone_number = phone_number;
    }
}

export class UserPhoneValidate {

    @IsKoreanPhoneNumber({ message: "Invalid Korean phone number format. Must be in the format 010-1234-5678" })
    phone_number: string;

    constructor(phone_number: string) {
        this.phone_number = phone_number;
    }
}


export class UserEmailValidate {

    @IsEmail({}, { message: "Invalid email format" })
    email: string;

    constructor(email: string) {
        this.email = email;
    }
}


export function IsKoreanPhoneNumber(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isKoreanPhoneNumber',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    // 정규 표현식을 사용하여 한국 전화번호 형식 검증
                    // 형식: 010-1234-5678
                    const regex = /^01(?:0|1|[6-9])-(\d{3}|\d{4})-\d{4}$/;
                    return typeof value === 'string' && regex.test(value);
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be a valid Korean phone number (e.g., 010-1234-5678)`;
                }
            }
        });
    };
}