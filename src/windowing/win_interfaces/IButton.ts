import { IObject } from "./IObject";

export interface IButton extends IObject {
    handleClick(cb: Function): boolean;
}