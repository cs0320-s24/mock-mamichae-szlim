import { loadFile } from "./Load";
import View from "./View";
import csvDict from "./MockedCSVs";
import Search from "./Search";
import searchQueries from "./MockedSearchResults";

/**
 * Interface for REPLFunction. 
 * It takes an array of string arguments and can return strings, string arrays, or JSX elements.
 */

export interface REPLFunction {
  (args: string[]): string | string[][] | JSX.Element;
  //we added JSX element as our search returns a jsx element (a table structure representing search results)
}

let filePath: string;
let loadResult: string[][] | null = null;


const commandsObject = {
/**
 * Command function to load a CSV file.
 * @param args array containing the file path to load.
 * @returns message that states whether the file was loaded successfully or not.
 */
  load_file: (args: string[]) => {
    if (args.length === 1) {
      filePath = args[0];
      if (filePath === 'malformed') {
        return "Your CSV is malformed. Unsuccessful.";
      }
      if (filePath === "empty") {
        return "Your CSV is empty. Unsuccessful.";
      }

      loadResult = loadFile(filePath);
      
      if (loadResult.toString().includes("file path not found")) {
        return [["file path not found"]];
      } 
        return [["loaded successfully"]];
    } else {
      return [["unsuccessful load"]];
    }
  },
/**
 * Command function to view the loaded CSV data.
 * @param args array.
 * @returns JSX element representing the loaded CSV data or error message if not loaded.
 */
  view: (args: string[]) => {
    if (loadResult === null) {
      return "please load a file first";
    } else if (args.length !== 0) {
      return "incorrect number of arguments";
    } else {
      return <View data={loadResult} />;
    }
  },
/**
 * Command function to search within the loaded CSV.
 * @param args array containing the search query (with column id/name and value).
 * @returns JSX element representing the search results table or error message if not loaded or query not found.
 */
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
