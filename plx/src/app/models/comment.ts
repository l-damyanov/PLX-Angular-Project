import { IUser } from "./user";

export interface IComment {
    objectId: string;
    lessonId: string;
    ownerId: string;
    content: string;
    owner: IUser;
}