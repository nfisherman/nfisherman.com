module.exports = (eleventyConfig) => {
	// Passthroughs
	eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
	eleventyConfig.addPassthroughCopy({
		"site/asset": "asset"
	});
	eleventyConfig.addPassthroughCopy({
		"site/script": "script" 
	});
	eleventyConfig.addPassthroughCopy({
		"site/style": "style"
	});
	eleventyConfig.addPassthroughCopy({
		"tools/pull-latest.sh": "pull-latest.sh"
	});
	eleventyConfig.addPassthroughCopy({
		"copyright": "copyright.txt"
	});

	// Shortcodes
	eleventyConfig.addShortcode(
		"header",
		(tag, text) =>
		  `<div class="header-bar header"><${tag}>${text}</${tag}></div>`
	);
	eleventyConfig.addShortcode(
		"miniheader",
		(tag, text) =>
		  `<div class="mini-header-bar header"><${tag}>${text}</${tag}></div>`
	);

	// Filter
	eleventyConfig.addCollection("posts", function (collection) {
		return collection.getFilteredByTag("posts");
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
