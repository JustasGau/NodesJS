import { IObject } from "./win_interfaces/IObject";

export class GUIObject implements IObject {
    isVisible: boolean = true;
    #x: number = 0;
    #y: number = 0;
    #width: number = 0;
    #height: number = 0;
    #context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D) { this.#context = context;}

    setHeight(value: number): boolean {
        this.#height = value;
        return true;
    }

    setWidth(value: number): boolean {
        this.#width = value;
        return true;
    }

    getHeight(): number {
        return this.#height;
    }

    getWidth(): number {
        return this.#width;
    }

    getX(): number {
        return this.#x;
    }

    getY(): number {
        return this.#y;
    }

    getContext(): CanvasRenderingContext2D {
        return this.#context;
    }

    draw(): boolean {
        throw new Error("Method not implemented.");
    }

    testHit(x: number, y: number): boolean {
        throw new Error("Method not implemented.");
    }

    setX(x: number): boolean {
        this.#x = x;
        return true;
    }
    
    setY(y: number): boolean {
        this.#y = y;
        return true;
    }

}