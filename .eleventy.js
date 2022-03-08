require('dotenv').config();

module.exports = function (eleventyConfig) {
    eleventyConfig.addWatchTarget("./src/sass/");

    eleventyConfig.addNunjucksAsyncFilter("jsmin", async function (
        code,
        callback
    ) {
        try {
            if (process.env.ENVIRONMENT === "production") {
                const minified = await minify(code);
                callback(null, minified.code);
            } else {
                callback(null, code);
            }
        } catch (err) {
            console.error("Terser error: ", err);
            // Fail gracefully.
            callback(null, code);
        }
    });

    return {
        dir: {
            input: "src",
            output: "public",
        },
    };
};