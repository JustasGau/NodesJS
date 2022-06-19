import { IText } from "./win_interfaces/IText";
import { GUIObject } from "./win_object.js";

export class GUIText extends GUIObject implements IText {
    #text: string;
    isVisible: boolean = true;

    constructor(context: CanvasRenderingContext2D, text: string) {
        super(context);
        this.#text = text;
    }

    getHeight(): number {
        return 30;
    }
    
    testHit(x: number, y: number): boolean {
        throw new Error("Method not implemented.");
    }

    draw(): boolean {
        const ctx = this.getContext();
        ctx.font = "30px Arial";
        ctx.fillStyle = "red";
        ctx.fillText(this.#text, this.getX(), this.getY());
        return true
    }

    updateValue(text: string): boolean {
        this.#text = text;
        return true;
    }
}