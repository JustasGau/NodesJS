import { IContainer } from "./IContainer";
import { IObject } from "./IObject";

export interface IWindow extends IObject{
    draggable: boolean;
    scalable: boolean;
    closable: boolean;

    // gridSpace is the percentage of parent container the child can occupy 
    // e.g. cont1 - 20%; cont2 - 80%
    // TODO one container should not occupy 100% space if there are other containers
    addContainer(container: IContainer, gridSpace: number): void;
    testHit(x: number, y: number): boolean;
    recalculateObjects(): void;
}