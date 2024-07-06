module.exports = (eleventyConfig) => {
	eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
    eleventyConfig.addPassthroughCopy("./asset/");
    eleventyConfig.addPassthroughCopy("./script/");
    eleventyConfig.addPassthroughCopy("./style/")
    eleventyConfig.addPassthroughCopy("./copyright");
    eleventyConfig.addPassthroughCopy({
        "./site/index.html": "./index.html"
    });
    eleventyConfig.addPassthroughCopy({
        "./tools/pull-latest.sh": "./pull-latest.sh"
    });

	eleventyConfig.addExtension("11ty.php", {
		key: "11ty.html",
	});

    return {
        dir: {
            input: "site",
            includes: "_includes",
			layouts: "_layouts",
            output: "dist",
        },
    };
};
