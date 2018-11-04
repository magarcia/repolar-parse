import fs from "fs";
import path from "path";

const read = fs.readFileSync;
const exists = fs.existsSync;
const list = fs.readdirSync;
const inputs = path.join(__dirname, "./input");
const trees = path.join(__dirname, "./tree");

export interface FixtureType {
  input: string;
  tree: object | undefined;
}

let fixtures: any = {};

list(inputs).forEach(file => {
  const filename = path.basename(file, ".pb");
  const inputFile = path.join(inputs, `${filename}.pb`);
  const treeFile = path.join(trees, `${filename}.json`);
  let tree: object | undefined;

  if (exists(treeFile)) {
    tree = JSON.parse(read(treeFile).toString());
  }

  fixtures[filename] = {
    input: read(inputFile).toString(),
    tree
  } as FixtureType;
});

export default fixtures;
