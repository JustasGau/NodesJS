import { IDrawable } from './interfaces.js';
import { vec2 } from './types.js';

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

    draw(scale: number, pan :vec2): void {
        const relativeX = this.x + pan.x;
        const relativeY = this.y + pan.y;

        this.context.beginPath();
        this.context.arc(
            relativeX * scale,
            relativeY * scale,
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
        return Math.round(Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2))) <= this.radius;
    }

    getIndex(): number {
        return 0;
    }

}