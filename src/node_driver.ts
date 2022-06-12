import {Node} from './node.js';

enum STATES {
    draw,
    select,
    drag
}

export class NodeDriver {
    context: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    nodes: Node[] = [];
    selectedNode: Node | null = null; 


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

    HandleMouseDown(event: MouseEvent) :void {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        for (let i = 0; i < this.nodes.length; i++) {
            const cur_node = this.nodes[i];
            if (cur_node.hit(mouseX, mouseY)) {
                this.selectedNode = cur_node;
                // start dragging
                break;
            }
        }
        // else if no object is hit then draw on empty space 
        // or other logic
    }

    initEventListeners(): void {
        this.canvas.addEventListener("mousedown", e => this.HandleMouseDown(e));
        // this.canvas.addEventListener("mouseup", e => this.drawAtMouse(e));
        // this.canvas.addEventListener("mouseover", e => this.drawAtMouse(e));
        // this.canvas.addEventListener("mouseleave", e => this.drawAtMouse(e));

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