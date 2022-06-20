import { IButton } from "./win_interfaces/IButton";
import { IContainer } from "./win_interfaces/IContainer";
import { IDropdown } from "./win_interfaces/IDropdown";
import { IList } from "./win_interfaces/IList";
import { IText } from "./win_interfaces/IText";
import { IWindow } from "./win_interfaces/IWindow";

import { GUIContainer } from "./win_container.js";
import { GUIWindow } from "./win_window.js";
import { GRID } from "./win_types.js"

export class GUI {
    context: CanvasRenderingContext2D;
    #windows: IWindow[] = [];

    constructor(context: CanvasRenderingContext2D){
        this.context = context;
    }

    draw(): void {
        for (let i = 0; i< this.#windows.length; i++) {
            const win = this.#windows[i];
            win.draw();
        }
    }

    createWindow(x: number, y:number): IWindow {
        const win = new GUIWindow(this.context, x, y);
        this.#windows.push(win);
        return win;
    }

    createButton(): IButton {
        throw new Error("Not implemented")
    }

    createList(): IList{
        throw new Error("Not implemented")
    }

    createContainer(): IContainer{
        return new GUIContainer(this.context);
    }

    createDropdown(): IDropdown{
        throw new Error("Not implemented")
    }

    createText(): IText{
        throw new Error("Not implemented")
    }

}