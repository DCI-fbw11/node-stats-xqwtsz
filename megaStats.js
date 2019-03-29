const fs = require("fs");

// check the directory if it contains a node_modules folder
// ==> if yes then calculate size, push the size
// ==> if not, check if there are folders inside and if yes start checking inside each of those folders with the same function

// switched back from
// const megaResult = async path => {

const megaResult = path => {
  let megaSize = [];
  let projectTrack = { projectCount: 0, projectNames: [] };

  const megaCheck = path => {
    const items = fs.readdirSync(path);

    if (items.includes("node_modules")) {
      projectTrack.projectCount++;
      projectTrack.projectNames.push(path);
      megaStats(path);
    } else {
      const otherItems = fs.readdirSync(path, { withFileTypes: true });
      otherItems.forEach(item => {
        if (item.isDirectory() && item.name[0] !== ".") {
          megaCheck(path + "/" + item.name);
        }
      });
    }
  };

  const megaStats = path => {
    const items = fs.readdirSync(path, { withFileTypes: true });
    let sizes = items
      .filter(item => !item.isDirectory())
      .map(item => fs.statSync(`${path}/${item.name}`).size);
    items.forEach(item => {
      if (item.isDirectory() && item.name[0] !== ".") {
        megaStats(`${path}/${item.name}`);
      }
    });
    sizes = sizes.length > 0 ? sizes.reduce((acc, cur) => acc + cur) : 0;
    megaSize.push({ size: sizes, path });
  };

  megaCheck(path);

  return { megaSize, projectTrack };
};

module.exports = megaResult;
