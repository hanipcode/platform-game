import { Shape } from "./shape";

export class Style {
  borderWidth: number = 0;
  background: string = "";
  borderColor: string = "#000";
}

export class Graphics {
  shape: Shape;
  style: Style;

  constructor(shape: Shape, style: Style) {
    this.shape = shape;
    this.style = style;
  }
}
