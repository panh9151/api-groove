export declare class AuthUser {
    id_user: string;
    email: string;
    password: string;
    role: string;
    fullname: string;
    phone: string;
    gender: "male" | "female";
    url_avatar: string;
    birthday: Date;
    country: string;
    created_at: Date;
    last_update: Date;
    is_banned: 0 | 1;
    id_google: string;
    reset_token: string;
    reset_token_expired: string;
}
