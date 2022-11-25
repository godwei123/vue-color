import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from "vite-plugin-dts"
import libCss from 'vite-plugin-libcss';
import DefineOptions from 'unplugin-vue-define-options/vite';
import {resolve, join} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), dts(), libCss(), DefineOptions()],
    build: {
        outDir: 'dist',
        lib: {
            entry: resolve(__dirname, 'packages/index.ts'),
            name: 'color-picker-vue3',
            fileName: (format) => `color-picker-vue3.${format}.js`,
        },
        cssCodeSplit: false,
        rollupOptions: {
            external: ['vue'],
            output: {
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
