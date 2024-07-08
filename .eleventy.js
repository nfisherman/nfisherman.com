module.exports = (eleventyConfig) => {
	eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
	eleventyConfig.addPassthroughCopy("asset");
	eleventyConfig.addPassthroughCopy("script");
	eleventyConfig.addPassthroughCopy("style")
	eleventyConfig.addPassthroughCopy({
		"tools/pull-latest.sh": "pull-latest.sh"
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
