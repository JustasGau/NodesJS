import {NodeDriver} from './node_driver.js';

window.onload = main;

function getCanvas(): HTMLCanvasElement | null {
    const canvas = document.querySelector('canvas');

    if (!canvas) {
        throw 'Could not find canvas';
    }
    return canvas;
}
  
function getContext(
    canvas: HTMLCanvasElement
    ): CanvasRenderingContext2D | null {
    const c = canvas.getContext('2d');
    if (!c) {
        console.error('Failed to get canvas context');
        return null;
    }
    return c;
}

function initCanvas(canvas: HTMLCanvasElement): void {
    canvas.height = innerHeight ;
    canvas.width = innerWidth;
}

function main(): void {
    const canvas = getCanvas();
    if (!canvas) {
      console.error('Failed to get canvas');
      return;
    }
    const context = getContext(canvas);
    if (!context) {
      console.error('Failed to get context');
      return;
    }
  
    initCanvas(canvas);
    const node_context = new NodeDriver(context, canvas);
    node_context.start();
  }
  