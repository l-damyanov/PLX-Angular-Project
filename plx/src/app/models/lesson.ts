import { IImage } from "./image";
import { IUser } from "./user";

export interface ILesson {
    objectId: string;
    title: string;
    image: string;
    city: string;
    description: string;
    online: boolean;
    owner: IUser;
    likes: string[];
    results: ILesson[];
}