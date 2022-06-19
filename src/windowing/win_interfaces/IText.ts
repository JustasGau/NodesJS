import { IObject } from "./IObject";

export interface IText extends IObject{
    updateValue(value: string): boolean;
}