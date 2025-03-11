import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { manualChunksPlugin } from "vite-plugin-webpackchunkname";
import { visualizer } from "rollup-plugin-visualizer";
import AutoImport from "unplugin-auto-import/vite";
import federation from "@originjs/vite-plugin-federation";
import { dependencies } from "./package.json";

// https://vitejs.dev/config/
export default ({ mode, command }) => {
  const env = loadEnv(mode, process.cwd()); // 获取.env文件里定义的环境变量
  const analysPlugins: any[] =
    mode === "analys"
      ? [
          visualizer({
            emitFile: false,
            filename: "stats.html",
            gzipSize: true,
            open: true,
          }),
        ]
      : [];
  return defineConfig({
    plugins: [
      react(),
      federation({
        name: "remoteMain",
        filename: "remoteEntry.js",
        // library: { type: "module" },
        remotes: {
          remoteMain1: "http://192.168.120.178:8882/sys2/assets/remoteEntry.js",
        },
        exposes: {
          "./CommonNavComp": "./src/components/CommonNav.tsx",
          "./AboutPage": "./src/pages/About/index.tsx",
        },
        shared: { react: {}, "react-dom": {}, "react-router-dom": {} },
      }),
    ].concat(analysPlugins),
    build: {
      target: "esnext",
      // minify: false, // boolean | 'terser' | 'esbuild'
      // cssCodeSplit: false,
      // manifest: true, //开启manifest
      // rollupOptions: {
      //   output: {
      //     chunkFileNames: "static/js/[name].[hash].js",
      //     entryFileNames: "static/js/[name].[hash].js",
      //     assetFileNames: "static/[ext]/[name].[hash].[ext]",
      //     manualChunks(id: string) {
      //       if (id.includes("node_modules")) {
      //         return "vendor"; //代码宰割为第三方包
      //       }
      //     },
      //   },
      // },
    },
    define: {
      "process.env": process.env,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    preview: {
      port: 8882,
      host: true,
      cors: true,
    },
    server: {
      port: 8881,
      host: true,
      cors: true,
      proxy: {
        "/api": {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          secure: false, // 解决代理https协议报错问题
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          rewrite: (path: string) => path.replace(/^\/api/, ""),
        },
      },
    },
    css: {
      preprocessorOptions: {
        // 全局样式引入
        scss: {
          additionalData: `@use "@/assets/styles/global.scss";`,
        },
      },
    },
  });
};
