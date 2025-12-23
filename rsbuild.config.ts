import { defineConfig } from "@rsbuild/core";
import { pluginSass } from "@rsbuild/plugin-sass";

export default defineConfig({
    plugins: [pluginSass()],
    source: {
        entry: {
            index: "./src/divetools.tsx",
        },
    },
    html: {
        template: "./src/index.html",
    },
    tools: {
        rspack: {
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        use: [
                            {
                                loader: "builtin:swc-loader",
                                options: {
                                    jsc: {
                                        parser: {
                                            syntax: "typescript",
                                            tsx: true,
                                        },
                                        transform: {
                                            react: {
                                                pragma: "h",
                                                pragmaFrag: "Fragment",
                                                runtime: "classic",
                                            },
                                        },
                                    },
                                },
                            },
                        ],
                    },
                ],
            },
        },
    },
    server: {
        port: 1236,
    },
});
