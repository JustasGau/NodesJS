export interface IObject {
    isVisible: boolean; // for ofscreen drawing or general hidding

    draw(): boolean;
    testHit(x: number, y: number): boolean;
    setX(x: number): boolean;
    setY(y: number): boolean;
    getX(): number;
    getY(): number;
    // for grid like structures, so a parent container can calculate follwong children positions
    getHeight(): number;
    // might be needed
    // getWidth(): number;
    getContext(): CanvasRenderingContext2D;

}