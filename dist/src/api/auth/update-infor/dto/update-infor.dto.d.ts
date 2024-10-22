declare enum Gender {
    MALE = "male",
    FEMALE = "female"
}
declare enum Status {
    BANNED = 1,
    ACTIVE = 0
}
export declare class UpdateInforDto {
    fullname: string;
    url_avatar: string;
    phone: string;
    gender: Gender;
    age: number;
    birthday: Date;
    country: string;
    is_banned: Status;
}
export {};
