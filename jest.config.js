module.exports = {
	testMatch: ["**/*.test.ts"],
	collectCoverage: true,
	collectCoverageFrom: ["src/**/*.{ts,tsx}", "!<rootDir>/node_modules/", "!src/**/app.ts", "!src/**/test/*.{test.ts}"],
	coverageReporters: ["html", ["lcovonly", { projectRoot: __dirname }], "text-summary"],
};
