const fs = require("fs");
const megaResult = require("./megaStats");

let path = "/Users/gunesc/Documents/Coding/test-playground";

megaResult(path).then(data => {
  let totalSize = data.megaSize.reduce((acc, cur) => acc + cur.size, 0);
  // console.log(data.megaSize);
  console.log(
    `Total size for your ${data.projectTrack.projectCount} project${
      data.projectTrack.projectCount > 1 ? "s" : null
    } is ~${(totalSize / 1000000).toFixed(2)} MB.`
  );
  let projects = [];
  data.projectTrack.projectNames.forEach(project => {
    let projectSize = data.megaSize
      .filter(item => item.path.startsWith(project))
      .reduce((acc, cur) => acc + cur.size, 0);
    projects.push({ project, projectSize: projectSize / 1000000 });
  });
  // console.log(projects);
  projects.forEach(project => {
    console.log(
      `The size for your "${project.project.slice(
        path.length,
        project.project.length
      )}" project is ~${project.projectSize.toFixed(2)} MB.`
    );
  });
});
