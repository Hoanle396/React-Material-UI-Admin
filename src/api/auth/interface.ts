export type Role = "User" | "SuperAdmin" | "Admin"
export interface ILoginResponse {
    token: string
    refreshToken: string
    user: {
        id: number;
        email: string;
        isVerify: boolean;
        roles: Role
    }
}
export interface IUser {
    id: number,
    fullname: string,
    email: string,
    password: string | null,
    avatar: string,
    roles: Role,
    isVerify: boolean,
    createAt: string,
    updateAt: string,
}
export interface IPayloadCreateUser {
    fullname: string,
    email: string,
}
export interface IListUsers{
    rows: IUser[]
    count:number
}