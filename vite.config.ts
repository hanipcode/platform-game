import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  plugins: [
    {
      name: "golang",
      handleHotUpdate({ file, server }) {
        if (file.endsWith(".go")) {
          server.ws.send({
            type: "full-reload",
            path: "*",
          });
        }
      },
    },
  ],

  build: {
    target: "esnext",
    assetsInlineLimit: 0,
  },
  server: {
    fs: {
      allow: ["."],
    },
  },
});
