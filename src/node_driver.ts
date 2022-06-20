import { Node } from './node.js';
import { GUI } from './windowing/win_main.js';
import { vec2 } from './types.js';
import { IDrawable } from './interfaces.js';

enum STATES {
    DRAW,
    CAMERA,
    EDIT,
}

export class NodeDriver {
    context: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    nodes: IDrawable[][] = [];
    selectedNode: IDrawable | null = null;
    scale: number = 1;
    isDragging: boolean = false;
    currentState = STATES.DRAW;
    cameraOffset: vec2 = {x: 0, y: 0};
    momentOffset: vec2 = {x: 0, y: 0};
    dragStart: vec2 = {x: 0, y: 0};
    dragEnd: vec2 = {x: 0, y: 0};
    refs: { [val: string]: Text } = {};
    windows: GUI;

    constructor(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        this.context = context;
        this.canvas = canvas;
        // TODO questionable
        this.nodes[0] = [];
        this.nodes[1] = [];
        this.nodes[2] = [];

        this.windows = new GUI(context);
        this.windows.createWindow(10, 10);
    }

    addDrawableObject(node: IDrawable): void {
        const z = node.getIndex();
        this.nodes[z].push(node);
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
                this.addDrawableObject(newNode);
                newNode.draw(this.scale, this.cameraOffset);
                break;
            case STATES.CAMERA:
                this.startPan(event);
                break;
            case STATES.EDIT:
                const mouseX = event.clientX;
                const mouseY = event.clientY;
                for (let i = 0; i < this.nodes.length; i++) {
                    for (let j = 0; j < this.nodes[i].length; j++) {
                        const cur_node = this.nodes[i][j];
                        //  TODO hit detection with panning and zooming
                        if (cur_node.hit(mouseX, mouseY)) {
                            this.selectedNode = cur_node;
                            // start dragging
                            console.log("Hit node")
                            break;
                        }
                    }
                }
                // else if no object is hit then draw on empty space 
                // or other logic
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
                break;
            case STATES.DRAW:

                break;
            default:
                break;
        }
    }

    // TODO finish element dragging
    HandleMouseDown(event: MouseEvent): void {
       
    }

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
            console.log(this.currentState);

            this.currentState ++;
            console.log(this.currentState);

            if (this.currentState == Object.keys(STATES).length / 2) {
                this.currentState = 0;
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
        this.context.fillStyle = '#A6D9F7';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = 0; j < this.nodes[i].length; j++) {
                this.nodes[i][j].draw(this.scale, this.cameraOffset);
            }
        }
        this.windows.draw();
        window.requestAnimationFrame(() => this.drawLoop());
    }
}