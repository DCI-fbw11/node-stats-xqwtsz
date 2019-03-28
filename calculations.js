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
    let path = process.cwd();
    console.log(
      `The size of your [${project.project.slice(
        path.length + 1,
        project.project.length
      )}] project is ~${pSize > 1000 ? (pSize / 1000).toFixed(2) : pSize} ${
        pSize > 1000 ? "GB" : "MB"
      } containing a [node_modules] folder with the size of ~${
        nSize > 1000 ? (nSize / 1000).toFixed(2) : nSize
      } ${nSize > 1000 ? "GB" : "MB"}`
    );
  });
};

module.exports = calcTotal;
