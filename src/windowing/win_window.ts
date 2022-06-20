// interfaces
import { IContainer } from './win_interfaces/IContainer';
import { IWindow } from './win_interfaces/IWindow';

// classes
import { GUIContainer } from './win_container.js';
import { GUIObject } from './win_object.js';

//types
import { GRID } from "./win_types.js"

type GridContainer = {
    space: number,
    container: IContainer
}

export class GUIWindow extends GUIObject implements IWindow {
    draggable: boolean = true;
    scalable: boolean = true;
    closable: boolean = true;
    isVisible: boolean = true;
    #containers: GridContainer[] = [];
    // to track if anything was scaled/moved. That way recalculation of sizes
    // and children containers can start
    #changes: boolean = true;
    #padding: number = 10;
    #grid: GRID;

    constructor(context: CanvasRenderingContext2D, x: number, y: number, grid: GRID = GRID.VERTICAL) {
        super(context);
        this.#grid = grid;
        this.setX(x);
        this.setY(y);
        this.setHeight(500);
        this.setWidth(400);
        const contHeader = new GUIContainer(context);
        const tmp = new GUIContainer(context);
        const tmp2 = new GUIContainer(context);

        const contBody = new GUIContainer(context);
        this.addContainer(contHeader, 10);
        this.addContainer(tmp, 10);
        this.addContainer(tmp2, 10);

        this.addContainer(contBody, 60);
    }

    addContainer(container: IContainer, gridSpace: number = 100): void {
        this.#containers.push({container: container, space: gridSpace});
    }

    testHit(x: number, y: number): boolean {
        throw new Error('Method not implemented.');
    }

    getPercent(value: number, percent: number): number {
        return (value * percent) / 100;
    }

    // TODO normal system that goes through a grid selector
    // TODO get rid of anonymous functions as they are slow in a loop
    // TODO padding should be part of percent calculation, otherwise the offset and actual used space desyncs
    recalculateObjects(): void {
        let lastHeighOffset: number = 0;
        let lastYOffset: number = 0;
        let gridPercentAccum: number = 0;
        for (let i = 0; i < this.#containers.length; i++) {
            const cont = this.#containers[i].container;
            let gridPercent = this.#containers[i].space;
            // last element should fill all remainin space
            if (i == this.#containers.length - 1) {
                gridPercent = 100 - gridPercentAccum;
            } else {
                gridPercentAccum += gridPercent;
            }

            const YStart = () => {
                if (i == 0) {
                    return this.getY() + this.#padding;
                } else {
                    return  lastHeighOffset;
                }
            }

            cont.setX(this.getX() + this.#padding);
            lastYOffset += YStart();
            cont.setY(lastYOffset);
            lastHeighOffset = this.getPercent(this.getHeight(), gridPercent);
            cont.setHeight(lastHeighOffset);
            cont.setWidth(this.getWidth() - 2 * this.#padding);
        }
    }

    draw(): boolean {
        if (this.#changes) {
            this.recalculateObjects();
            this.#changes = false;
        }
        const ctx = this.getContext();
        ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.rect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
        ctx.stroke();
        for (let i = 0; i< this.#containers.length; i++) {
            const win = this.#containers[i].container;
            win.draw();
        }
        return true;
    }
    hit(x: number, y: number): boolean {
        throw new Error('Method not implemented.');
    }

}