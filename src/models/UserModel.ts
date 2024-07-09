import { Length, IsEmail, IsOptional, IsInt, Min, Max } from "class-validator";

export class User {
    @Length(3, 20, { message: "ID must be between 3 and 20 characters" })
    id: string;

    @Length(2, 50, { message: "Name must be between 2 and 50 characters" })
    name: string;

    @IsEmail({}, { message: "Invalid email format" })
    email: string;

    @IsOptional()
    @IsInt({ message: "Age must be an integer" })
    @Min(18, { message: "Age must be at least 18" })
    @Max(100, { message: "Age cannot be greater than 100" })
    age?: number;

    constructor(id: string, name: string, email: string, age?: number) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.age = age;
    }
}
