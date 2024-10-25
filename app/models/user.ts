export interface User  extends UserCreation{
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface UserCreation {
    _id?: string;
    email: string;
    password: string;
    username: string;
    createdAt?: Date;
    updatedAt?: Date;
}