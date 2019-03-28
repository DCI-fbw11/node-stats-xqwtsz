const fs = require("fs");
const megaResult = require("./megaStats");

let path = "/Users/gunesc/Documents/Coding/react-playground";

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

const calcTotal = (data, args) => {
  let totalSize = (
    data.megaSize.reduce((acc, cur) => acc + cur.size, 0) / 1000000
  ).toFixed(2);
  if (args !== "--ls") {
    console.log(
      `You have ${data.projectTrack.projectCount} project${
        data.projectTrack.projectCount > 1 ? "s" : null
      } with a total size of ~${
        totalSize > 1000 ? (totalSize / 1000).toFixed(2) : totalSize
      } ${totalSize > 1000 ? "GB" : "MB"}`
    );
  } else if (args === "--ls") {
    calcSub(data);
  }
};

const calcSub = data => {
  let projects = [];
  data.projectTrack.projectNames.forEach(project => {
    let projectSize = data.megaSize
      .filter(item => item.path.startsWith(project))
      .reduce((acc, cur) => acc + cur.size, 0);
    let nodeModulesSize = data.megaSize
      .filter(item => item.path.startsWith(`${project}/node_modules`))
      .reduce((acc, cur) => acc + cur.size, 0);
    projects.push({
      project,
      projectSize: projectSize / 1000000,
      nodeModulesSize: nodeModulesSize / 1000000
    });
  });
  projects.forEach(project => {
    let pSize = project.projectSize.toFixed(2);
    let nSize = project.nodeModulesSize.toFixed(2);
    console.log(
      `The size of your [${project.project.slice(
        path.length,
        project.project.length
      )}] project is ~${pSize > 1000 ? (pSize / 1000).toFixed(2) : pSize} ${
        pSize > 1000 ? "GB" : "MB"
      } containing a [node_modules] folder with the size of ~${
        nSize > 1000 ? (nSize / 1000).toFixed(2) : nSize
      } ${nSize > 1000 ? "GB" : "MB"}`
    );
  });
};

const helper = () => {
  console.log(
    "\n  Usage: node-stats [options]\n\n  Options:\n    .          to see total size of current directory\n    --ls       to list all project folder names & sizes /w node_module sizes\n"
  );
};

module.exports = main;
