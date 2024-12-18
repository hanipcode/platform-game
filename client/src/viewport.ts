type ListenerFn = (width: number, height: number) => void;
type Listeners = Map<string, ListenerFn>;

class BrowserViewport {
  width: number;
  height: number;
  #listeners: Listeners = new Map();

  constructor() {
    this.width =
      window.visualViewport?.width || document.documentElement.clientWidth;
    this.height =
      window.visualViewport?.height || document.documentElement.clientHeight;

    window.addEventListener("resize", () => {
      this.width = document.documentElement.clientWidth;
      this.height = document.documentElement.clientHeight;
      this.#listeners.forEach((listener) => listener(this.width, this.height));
    });
  }

  addListener(id: string, listenerFN: ListenerFn) {
    this.#listeners.set(id, listenerFN);
  }
}

export { BrowserViewport };
