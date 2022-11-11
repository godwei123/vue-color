import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from "vite-plugin-dts"
import libCss from 'vite-plugin-libcss';
import {resolve, join} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), dts(), libCss()],
    build: {
        outDir: 'dist',
        lib: {
            entry: resolve(__dirname, 'packages/index.ts'),
            name: 'VueColor',
            fileName: (format) => `vue-color.${format}.js`,
        },
        cssCodeSplit: false,
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: ['vue'],
            output: {
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "/packages")
        }
    },
    css: {
        // css预处理器
        preprocessorOptions: {
            less: {
                charset: false,
                additionalData: '@import "@/assets/global.less";',
            },
        },
    },
})
