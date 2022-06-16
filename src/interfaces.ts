import { vec2 } from "./types";

export interface IDrawable {
    draw(scale: number, pan: vec2): void
  }