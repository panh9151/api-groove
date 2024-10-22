declare enum Gender {
    MALE = "male",
    FEMALE = "female"
}
declare enum Status {
    BANNED = 1,
    ACTIVE = 0
}
export declare class UpdateInforEntity {
    id_user: string;
    fullname: string;
    url_avatar: string;
    phone: string;
    gender: Gender;
    birthday: Date;
    country: string;
    is_banned: Status;
}
export {};
