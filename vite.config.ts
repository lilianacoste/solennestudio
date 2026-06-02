import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

async function optionalPlugin<T>(loader: () => Promise<T>): Promise<T | null> {
  try {
    return await loader();
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      (error as NodeJS.ErrnoException).code === "ERR_MODULE_NOT_FOUND"
    ) {
      return null;
    }

    throw error;
  }
}

const rawPort = process.env.PORT ?? "5173";

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH ?? "/";

const runtimeErrorOverlay = await optionalPlugin(() =>
  import("@replit/vite-plugin-runtime-error-modal").then((m) => m.default()),
);

const cartographerPlugin =
  process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined
    ? await optionalPlugin(() =>
        import("@replit/vite-plugin-cartographer").then((m) =>
          m.cartographer({
            root: path.resolve(import.meta.dirname, ".."),
          }),
        ),
      )
    : null;

const devBannerPlugin =
  process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined
    ? await optionalPlugin(() =>
        import("@replit/vite-plugin-dev-banner").then((m) => m.devBanner()),
      )
    : null;

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay,
    cartographerPlugin,
    devBannerPlugin,
  ].filter((plugin) => plugin !== null),
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
