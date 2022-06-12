"use strict";
window.onload = main;
function getCanvas() {
    const canvas = document.querySelector('canvas');
    if (!canvas) {
        throw 'Davai seni';
    }
    return canvas;
}
function getContext(canvas) {
    const c = canvas.getContext('2d');
    if (!c) {
        console.error('Failed to get canvas context');
        return null;
    }
    return c;
}
function main() {
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
    console.log("Gucchi");
}
