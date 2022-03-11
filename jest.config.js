module.exports = {
	testMatch: ["**/*.test.ts"],
	collectCoverage: true,
	collectCoverageFrom: [
		"src/**/*.{js,jsx,ts,tsx,vue}",
		"!<rootDir>/node_modules/"
	],
	coverageReporters: ['html', ["lcovonly", {"projectRoot": __dirname}], 'text-summary']
};
