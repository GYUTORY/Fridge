import { Length, IsEmail, IsOptional, IsInt, Min, Max, IS_PHONE_NUMBER } from "class-validator";

export class User {
    @Length(3, 20, { message: "ID must be between 3 and 20 characters" })
    id: string;

    @Length(2, 50, { message: "Name must be between 2 and 50 characters" })
    name: string;

    @Length(2, 50, { message: "Name must be between 2 and 50 characters" })
    phone_number: string;

    @IsEmail({}, { message: "Invalid email format" })
    email: string;

    @IsOptional()
    @IsInt({ message: "Age must be an integer" })
    @Min(18, { message: "Age must be at least 18" })
    @Max(100, { message: "Age cannot be greater than 100" })
    age?: number;

    constructor(id: string, name: string, phone_number: string, email: string, age?: number) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.age = age;
        this.phone_number = phone_number;
    }
}

export class UserPhone {

    @IS_PHONE_NUMBER
    phone_number: string;
    constructor(phone_number: string) {
        this.phone_number = phone_number;
    }
}

export class UserEmail {

    @IsEmail({}, { message: "Invalid email format" })
    email: string;
    constructor(email: string) {
        this.email = email;
    }
}