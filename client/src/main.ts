import { Canvas } from "./canvas";
import { Graphics, Style } from "./graphics";
import { Rect } from "./shape";
import "./style.css";
import { BrowserViewport } from "./viewport";

const go = new Go(); // Initialize Go WebAssembly object

const flatten = <T>(arr: T[][]) => {
  const res: T[] = [];
  arr.forEach((row) => {
    row.forEach((col) => {
      res.push(col);
    });
  });

  return res;
};

async function start() {
  const result = await WebAssembly.instantiateStreaming(
    fetch("/main.wasm"),
    go.importObject,
  );
  go.run(result.instance);

  const browserViewport = new BrowserViewport();
  const canvas = new Canvas("app", browserViewport);
  const renderedTiles = flatten(GameState.Tilemap.Tiles);
  const renderedGraphics = renderedTiles.map((tile) => {
    const tileShape = new Rect(
      tile.Position.X,
      tile.Position.Y,
      tile.Size.Width,
      tile.Size.Height,
    );
    const style = new Style();
    style.borderWidth = 2;
    style.borderColor = "blue";
    style.background = "white";

    return new Graphics(tileShape, style);
  });

  renderedGraphics.forEach((g) => {
    canvas.draw(g);
  });
}

start();
