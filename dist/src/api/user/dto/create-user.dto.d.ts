export declare enum UserRole {
    user = "user",
    admin = "admin"
}
export declare enum UserGender {
    male = "male",
    female = "female"
}
export declare enum BannedStatus {
    BANNED = 1,
    ACTIVE = 0
}
export declare class CreateUserDto {
    email: string;
    password: string;
    role: "user" | "admin";
    fullname: string;
    phone: string;
    gender: "male" | "female";
    url_avatar: string;
    birthday: string;
    country: string;
    is_banned: 0 | 1;
}
