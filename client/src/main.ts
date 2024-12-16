import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter";

const go = new Go(); // Initialize Go WebAssembly object

async function initWasm() {
  const result = await WebAssembly.instantiateStreaming(
    fetch("/main.wasm"),
    go.importObject,
  );
  go.run(result.instance);
  console.log("test run function from golang", add(1, 2));
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

initWasm();

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
