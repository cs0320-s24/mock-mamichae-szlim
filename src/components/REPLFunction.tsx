import { loadFile } from "./Load";
import View from "./View";
import csvDict from "./MockedCSVs";
import Search from "./Search";
import searchQueries from "./MockedSearchResults";

export interface REPLFunction {
  (args: string[]): string | string[][] | JSX.Element;
  //we added JSX element as our search returns a jsx element (a table structure representing search results)
}

let filePath: string;
let loadResult: string[][] | null = null;

const commandsObject = {
  load_file: (args: string[]) => {
    if (args.length === 1) {
      filePath = args[0];
      loadResult = loadFile(filePath);
      if (loadResult.toString().includes("file path not found")){
        return [["file path not found"]]
      }
        return [["loaded successfully"]];
    } else {
      return [["unsuccessful load"]];
    }
  },
  view: (args: string[]) => {
    if (loadResult === null) {
      return "please load a file first";
    } else if (args.length !== 0) {
      return "incorrect number of arguments";;
    } else {
      return <View data={loadResult} />;
    }
  },
  search: (args: string[]): JSX.Element | string=> {
    if (loadResult === null) {
      return "please load a file first";
    }
    if (args.length !== 2) {
      return "incorrect number of arguments";
    }

    const query = args.join(" ").trim();
    const searchResult = searchQueries[query];

    if (searchResult) {
        return <Search results={searchResult} />;
    } else {
        return "query not found";
    }
  },
};

export const commands = new Map<string, REPLFunction>();
Object.entries(commandsObject).forEach(([key, value]) => {
  commands.set(key, value);
});
