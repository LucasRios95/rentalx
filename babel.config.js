module.exports = {
    presets: [
        ["@babel/preset-env", { targets: { node: "current" } }],
        "@babel/preset-typescript",
    ],

    plugins: [
        [
            "module-resolver",
            {
                alias: {
                    "@modules/*": ["./src/modules"],
                    "@config/*": ["./src/config"],
                    "@shared/*": ["./src/shared"],
                    "@errors/*": ["./src/errors"],
                    "@utils/*": ["./src/utils"],
                },
            },
        ],

        "babel-plugin-transformer-typescript-metadata",
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-transform-class-properties", { loose: true }],
    ],
}