import { Graphics, Style } from "./graphics";
import { toUnit } from "./helper";
import { Shape } from "./shape";
import { BrowserViewport } from "./viewport";

class Canvas {
  #parentElement: HTMLDivElement;
  #canvasElement: HTMLCanvasElement;
  #canvasContext: CanvasRenderingContext2D;
  #style = new Style();

  width: number;
  height: number;

  constructor(parentId: string, browserViewport: BrowserViewport) {
    const parent = document.querySelector<HTMLDivElement>(`#${parentId}`);
    if (!parent) {
      throw new Error("Canvas is rendered without a parent");
    }
    this.#parentElement = parent;
    // cleanup parent
    this.#parentElement.innerHTML = "";
    this.width = browserViewport.width;
    this.height = browserViewport.height;
    this.#canvasElement = document.createElement("canvas");
    this.applyDimensionStyle();

    browserViewport.addListener("canvas", (width, height) => {
      this.width = width;
      this.height = height;

      this.applyDimensionStyle();
    });

    const context = this.#canvasElement.getContext("2d");

    if (!context) {
      throw new Error("Canvas context not found");
    }

    this.#canvasContext = context;
    this.resetStyle();
    this.clear();

    this.#parentElement.append(this.#canvasElement);
  }

  private applyDimensionStyle() {
    this.#canvasElement.style.width = toUnit(this.width);
    this.#canvasElement.style.height = toUnit(this.height);
  }

  private setFill(fillStyle: string) {
    this.#canvasContext.fillStyle = fillStyle;
  }
  private setStroke(strokeStyle: string, strokeWidth: number) {
    this.#canvasContext.strokeStyle = strokeStyle;
    this.#canvasContext.lineWidth = strokeWidth;
  }

  private resetStyle() {
    this.setFill(this.#style.background);
    this.setStroke(this.#style.borderColor, this.#style.borderWidth);
  }

  clear() {
    this.resetStyle();
    this.#canvasContext.fillRect(0, 0, this.width, this.height);
  }

  prepareStyle(graphic: Graphics) {
    if (graphic.style.background) {
      this.setFill(graphic.style.background);
    }
    if (graphic.style.borderWidth > 0) {
      this.setStroke(graphic.style.borderColor, graphic.style.borderWidth);
    }
  }

  draw(graphic: Graphics) {
    this.prepareStyle(graphic);
    this.#canvasContext.fillRect(
      graphic.shape.x,
      graphic.shape.y,
      graphic.shape.width,
      graphic.shape.height,
    );
    this.#canvasContext.strokeRect(
      graphic.shape.x,
      graphic.shape.y,
      graphic.shape.width,
      graphic.shape.height,
    );
    this.resetStyle();
  }
}

export { Canvas };
