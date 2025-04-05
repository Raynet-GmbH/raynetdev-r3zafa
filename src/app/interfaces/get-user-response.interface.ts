import {IUser} from "./user.interface";

export interface GetUserResponseInterface {
  isOk: boolean,
  data: IUser | null
}
