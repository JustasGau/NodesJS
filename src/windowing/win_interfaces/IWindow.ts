import { IContainer } from "./IContainer";
import { IObject } from "./IObject";

export interface IWindow extends IObject{
    draggable: boolean;
    scalable: boolean;
    closable: boolean;

    addContainer(container: IContainer): void;
    testHit(x: number, y: number): boolean;
}