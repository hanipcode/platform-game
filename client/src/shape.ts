export interface Shape {
  x: number;
  y: number;
  width: number;
  height: number;
}
export class Rect implements Shape {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
