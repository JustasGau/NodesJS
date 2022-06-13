import { IDrawable } from './interfaces';

// add cubes, circles, possible other shapes as nodes
export class Node implements IDrawable {
    x: number;
    y: number;
    context: CanvasRenderingContext2D;
    radius = 50;

    constructor(context: CanvasRenderingContext2D, x: number, y: number) {
        this.context = context;
        this.x = x;
        this.y = y;
    }

    // addSelectableOutline(): void {
    //     this.addEventListener("click", e => this.drawAtMouse(e));
    // }

    draw(scale: number): void {
        this.context.beginPath();
        this.context.arc(
            this.x * scale,
            this.y * scale,
            this.radius * scale,
            0,
            Math.PI * 2,
            false
        );
        this.context.stroke();
        this.context.fillStyle = "#54251B"

        this.context.fill();
    }

    hit(x: number, y: number): boolean {
        return true;
    }

}