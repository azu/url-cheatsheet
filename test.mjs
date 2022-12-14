import { test } from "@power-doctest/tester";
import { parse } from "@power-doctest/markdown";
import * as  fs from "node:fs";
import * as path from "node:path";
import { describe, it} from "node:test"
import url from "node:url";
const __filename__ = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename__);

describe("doctest:md", function () {
  const filePath = path.join(__dirname, "README.md");
  const content = fs.readFileSync(filePath, "utf-8");
  const parsedCodes = parse({
    filePath,
    content
  });
  // try to eval
  const dirName = path.dirname(filePath).split(path.sep).pop();
  parsedCodes.forEach((parsedCode) => {
    const codeValue = parsedCode.code;
    const testCaseName = codeValue.slice(0, 64).replace(/[\r\n]/g, "_");
    it(dirName + ": " + testCaseName, function () {
      return test({
        ...parsedCode,
        doctestOptions: {
          // TODO: Is this required?
          context: {
            URL,
            URLSearchParams
          }
        }
      }, {
        defaultDoctestRunnerOptions: {
          // Default timeout: 2sec
          timeout: 1000 * 2
        },
      }).catch(error => {
        const filePathLineColumn = `${error.fileName}:${error.lineNumber}:${error.columnNumber}`;
        console.error(`Markdown Doctest is failed
  at ${filePathLineColumn}

----------
${codeValue}
----------
`);
        return Promise.reject(error);
      });
    });
  })
});