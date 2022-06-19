import { IObject } from "./IObject";

export interface IContainer extends IObject{
    addObject(obj: IObject): boolean;
    // test children, should not react itself
    testHit(x: number, y: number): boolean;
}