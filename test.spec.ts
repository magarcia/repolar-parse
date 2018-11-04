import fixtures, { FixtureType } from "./test/fixtures";
import { repolar } from "./index";
import { forEach } from "./lib/utils";
const unified = require("unified");

describe("fixtures", () => {
  forEach(Object.keys(fixtures), (fixtureName: string) => {
    const fixture: FixtureType = fixtures[fixtureName];

    test(fixtureName, () => {
      const tree = unified()
        .use(repolar)
        .parse(fixture.input);
      expect(tree).toEqual(fixture.tree);
    });
  });
});
