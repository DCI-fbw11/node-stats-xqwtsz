const fs = require("fs");
const megaResult = require("./megaStats");
const calcTotal = require("./calculations");
const helper = require("./helper");

const main = () => {
  const [, , ...args] = process.argv;
  const path = process.cwd();
  if (args[0] === ".") {
    mainCall(path);
  } else if (args[0] === "--ls") {
    mainCall(path, "--ls");
  } else if (args[0] === "--help") {
    helper();
  } else {
    console.log("Please type 'node-stats --help' to see how to use this app.");
  }
};

const mainCall = (path, args) => {
  megaResult(path).then(data => {
    if (data.megaSize.length === 0 && data.projectTrack.projectCount === 0) {
      console.log("There are no projects in this directory.");
    } else {
      calcTotal(data, args);
    }
  });
};

module.exports = main;
