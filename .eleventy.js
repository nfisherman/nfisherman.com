module.exports = (eleventyConfig) => {
	eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
	eleventyConfig.addPassthroughCopy("asset");
	eleventyConfig.addPassthroughCopy("script");
	eleventyConfig.addPassthroughCopy("style")
	eleventyConfig.addPassthroughCopy({
		"tools/pull-latest.sh": "pull-latest.sh"
	});

	eleventyConfig.addShortcode(
		"header",
		(tag, text) =>
		  `<div class="box header-bar"><${tag}>${text}</${tag}></div>`
	);

	return {
		dir: {
			input: "site",
			includes: "_includes",
			layouts: "_layouts",
			output: "dist",
		},
	};
};
