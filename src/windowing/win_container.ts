import { IContainer } from "./win_interfaces/IContainer";
import { IObject } from "./win_interfaces/IObject";

import { GUIObject } from "./win_object.js";

export class GUIContainer extends GUIObject implements IContainer {
    #objects: IObject[] = [];

    constructor(context: CanvasRenderingContext2D) {
        super(context);
        this.setHeight(100);
        this.setWidth(100);
    }
    draw(): boolean {
        const ctx = this.getContext();
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.rect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
        ctx.stroke();
        return true;
    }

    addObject(obj: IObject): boolean {
        this.#objects.push(obj);
        return true;
    }
}