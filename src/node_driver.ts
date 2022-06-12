import {Node} from './node.js';


export class NodeDriver {
    context: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    nodes: Node[] = [];

    constructor(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        this.context = context;
        this.canvas = canvas;
    }

    start(): void {
        console.log('Nodes has started');
        this.initEventListeners();
        this.drawLoop();
    }

    drawAtMouse(event: MouseEvent): void {
        const newNode = new Node(this.context, event.clientX, event.clientY);
        this.nodes.push(newNode);
        newNode.draw();
    }

    initEventListeners(): void {
        this.canvas.addEventListener("click", e => this.drawAtMouse(e));
    }

    drawLoop(): void {
        this.context.fillStyle = '#283F3B';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].draw();
        }
        window.requestAnimationFrame(() => this.drawLoop());
    }
}