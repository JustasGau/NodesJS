import { IContainer } from './win_interfaces/IContainer';
import { IWindow } from './win_interfaces/IWindow';

import { GUIObject } from './win_object.js';

export class GUIWindow extends GUIObject implements IWindow {
    draggable: boolean = true;
    scalable: boolean = true;
    closable: boolean = true;
    isVisible: boolean = true;
    #height: number = 500;
    #width: number = 500;
    #containers: IContainer[] = [];

    constructor(context: CanvasRenderingContext2D, x: number, y: number) {
        super(context);
        this.setX(x);
        this.setY(y);
    }
    addContainer(container: IContainer): void {
        this.#containers.push(container);
    }
    testHit(x: number, y: number): boolean {
        throw new Error('Method not implemented.');
    }
    draw(): boolean {
        const ctx = this.getContext();
        ctx.rect(this.getX(), this.getY(), this.#width, this.#height);
        ctx.strokeStyle = "black";
        ctx.stroke();
        for (let i = 0; i< this.#containers.length; i++) {
            const win = this.#containers[i];
            win.draw();
        }
        return true;
    }
    hit(x: number, y: number): boolean {
        throw new Error('Method not implemented.');
    }

}