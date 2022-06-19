import { vec2 } from "./types";

export interface IDrawable {
    x: number;
    y: number;
    context: CanvasRenderingContext2D;
    
    draw(scale: number, pan: vec2): void
    hit(x: number, y: number): boolean
    // Lower index means drawn sooner
    getIndex(): number

  }