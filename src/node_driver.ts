import { Node } from './node.js';

enum STATES {
    DRAW,
    PAN,
}

// TODO move type definitions to seperate file
type MouseStruct = {
    x: number;
    y: number;
}

export class NodeDriver {
    context: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    nodes: Node[] = [];
    selectedNode: Node | null = null;
    scale: number = 1;
    currentState = STATES.DRAW;
    pan: MouseStruct = {
        x: 0,
        y: 0
    }

    constructor(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        this.context = context;
        this.canvas = canvas;
    }

    start(): void {
        console.log('Nodes has started');
        this.initEventListeners();
        this.drawLoop();
    }

    startPan(): void {

    }

    endPan(): void {
        
    }

    atMouseDown(event: MouseEvent): void {
        switch (this.currentState) {
            case STATES.DRAW:
                const newNode = new Node(this.context, event.clientX / this.scale, event.clientY / this.scale);
                this.nodes.push(newNode);
                newNode.draw(this.scale);
                break;
            case STATES.PAN:
                this.startPan();
                console.log("Mouse down")

            default:
                break;
        }
    }

    atMouseUp(event: MouseEvent): void {
        switch (this.currentState) {
            case STATES.PAN:
                this.endPan();
                console.log("Mouse up")

            default:
                break;
        }
    }

    // TODO finish element dragging
    // HandleMouseDown(event: MouseEvent): void {
    //     const mouseX = event.clientX;
    //     const mouseY = event.clientY;
    //     for (let i = 0; i < this.nodes.length; i++) {
    //         const cur_node = this.nodes[i];
    //         if (cur_node.hit(mouseX, mouseY)) {
    //             this.selectedNode = cur_node;
    //             // start dragging
    //             break;
    //         }
    //     }
    //     // else if no object is hit then draw on empty space 
    //     // or other logic
    // }

    // TODO improve zooming to use context instead of pure multiplication
    zoom(event: WheelEvent): void {
        event.preventDefault();

        this.scale += event.deltaY * -0.005;
        this.scale = Math.min(Math.max(.125, this.scale), 4);
    }

    tempSwitchStages(event: KeyboardEvent): void {
        const name = event.key;
        const code = event.code;
        console.log(`Key pressed ${name} \r\n Key code value: ${code}`);
        if (code === 'Enter') {
            if (this.currentState === STATES.DRAW) {
                this.currentState = STATES.PAN
            }
        }
    }

    initEventListeners(): void {
        this.canvas.addEventListener("mousedown", e => this.atMouseDown(e));
        this.canvas.addEventListener('wheel', e => this.zoom(e));
        this.canvas.addEventListener("mouseup", e => this.atMouseUp(e));
        // this.canvas.addEventListener("mouseover", e => this.drawAtMouse(e));
        // this.canvas.addEventListener("mouseleave", e => this.drawAtMouse(e));
        addEventListener('keydown', e => this.tempSwitchStages(e));

    }

    drawLoop(): void {
        this.context.fillStyle = '#283F3B';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].draw(this.scale);
        }
        window.requestAnimationFrame(() => this.drawLoop());
    }
}