import { IButton } from "./win_interfaces/IButton";
import { GUIObject } from "./win_object.js";

export class GUIButton extends GUIObject implements IButton {
    #text: string;
    isVisible: boolean = true;

    constructor(context: CanvasRenderingContext2D, text: string) {
        super(context);
        this.setHeight(50);
        this.setWidth(50);
        this.#text = text;
    }
    
    handleClick(cb: Function): boolean {
        throw new Error("Method not implemented.");
    }

    getHeight(): number {
        return 30;
    }
    
    testHit(x: number, y: number): boolean {
        throw new Error("Method not implemented.");
    }

    draw(): boolean {
        const ctx = this.getContext();
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.rect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
        ctx.stroke();
        ctx.font = "30px Arial";
        ctx.fillStyle = "green";
        ctx.fillText(this.#text, this.getX(), this.getY());
        return true
    }

    updateValue(text: string): boolean {
        this.#text = text;
        return true;
    }
}