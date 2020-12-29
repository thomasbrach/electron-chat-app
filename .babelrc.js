module.exports = {
    presets: [
        "@babel/preset-env",
        "@babel/preset-react",
        "@babel/typescript"
    ],
    plugins: [
        [
            "@babel/plugin-transform-runtime",
            {
                "regenerator": true
            }
        ]
    ]
}
