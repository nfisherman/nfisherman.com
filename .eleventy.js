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

	// Shortcodes
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
