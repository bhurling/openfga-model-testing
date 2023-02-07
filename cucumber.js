let common = [
  "features/**/*.feature",
  "--require-module ts-node/register",
  "--require steps/**/*.ts"
].join(" ");

module.exports = {
  default: common,
};
