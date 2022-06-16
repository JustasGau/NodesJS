import { Node } from './node.js';
import { vec2 } from './types.js';

enum STATES {
    DRAW,
    CAMERA,
}

export class NodeDriver {
    context: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    nodes: Node[] = [];
    selectedNode: Node | null = null;
    scale: number = 1;
    isDragging: boolean = false;
    currentState = STATES.DRAW;
    cameraOffset: vec2 = {x: 0, y: 0};
    momentOffset: vec2 = {x: 0, y: 0};
    dragStart: vec2 = {x: 0, y: 0};
    dragEnd: vec2 = {x: 0, y: 0};

    constructor(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        this.context = context;
        this.canvas = canvas;
    }

    start(): void {
        console.log('Nodes has started');
        this.initEventListeners();
        this.drawLoop();
    }

    startPan(event: MouseEvent): void {
        this.isDragging = true;
        this.dragStart = { x: event.clientX, y: event.clientY }
    }

    endPan(event: MouseEvent): void {
        this.isDragging = false;
    }

    atMouseDown(event: MouseEvent): void {
        console.log("Mouse down")
        switch (this.currentState) {
            case STATES.DRAW:
                const newNode = new Node(
                    this.context,
                    (event.clientX / this.scale - this.cameraOffset.x),
                    (event.clientY / this.scale - this.cameraOffset.y) 
                    );
                this.nodes.push(newNode);
                newNode.draw(this.scale, this.cameraOffset);
                break;
            case STATES.CAMERA:
                this.startPan(event);

            default:
                break;
        }
    }

    atMouseUp(event: MouseEvent): void {
        console.log("Mouse up")
        switch (this.currentState) {
            case STATES.CAMERA:
                this.endPan(event);
                console.log(this.cameraOffset)

            default:
                break;
        }
    }

    atMouseMove(event: MouseEvent): void {
        switch (this.currentState) {
            case STATES.CAMERA:
                if (!this.isDragging) return
                const offset: vec2 = {
                    x: event.clientX - this.dragStart.x,
                    y: event.clientY - this.dragStart.y,
                }
                this.cameraOffset.x += offset.x;
                this.cameraOffset.y += offset.y;
                this.dragStart = { x: event.clientX, y: event.clientY }


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
                this.currentState = STATES.CAMERA
            } else {
                this.currentState = STATES.DRAW
            }
        }
    }

    initEventListeners(): void {
        this.canvas.addEventListener("mousedown", e => this.atMouseDown(e));
        this.canvas.addEventListener("wheel", e => this.zoom(e));
        this.canvas.addEventListener("mouseup", e => this.atMouseUp(e));
        this.canvas.addEventListener("mousemove", e => this.atMouseMove(e));
        // this.canvas.addEventListener("mouseover", e => this.drawAtMouse(e));
        // this.canvas.addEventListener("mouseleave", e => this.drawAtMouse(e));
        addEventListener('keydown', e => this.tempSwitchStages(e));

    }

    drawLoop(): void {
        this.context.fillStyle = '#283F3B';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].draw(this.scale, this.cameraOffset);
        }
        window.requestAnimationFrame(() => this.drawLoop());
    }
}