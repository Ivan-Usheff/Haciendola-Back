import { BaseEntityType } from "utils/types/base-entity.type";


type UserType = BaseEntityType & {
    user:string;
    email:string;
    password:string;
};

type NewUserType = Omit<UserType, 'status'>
type FindUserType = Partial<UserType>;

export type { 
    UserType, 
    NewUserType, 
    FindUserType 
}