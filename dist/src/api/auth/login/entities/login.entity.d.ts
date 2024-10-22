export declare enum ShowStatus {
    HIDDEN = 0,
    VISIBLE = 1
}
export declare class LoginEntity {
    id_user: string;
    email: string;
    password: string;
    role: "user" | "admin";
    is_banned: 0 | 1;
}
