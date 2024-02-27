import { loadFile } from "./Load";
import View from "./View";
import csvDict from "./MockedCSVs";
import Search from "./Search";

export interface REPLFunction {
  (args: string[]): string | string[][] | JSX.Element;
}

let filePath: string;
let loadResult: string[][] | null = null;

const commandsObject = {
  load_file: (args: string[]) => {
    if (args.length === 1) {
      filePath = args[0];
      //loadResult = loadFile(filePath);
      loadResult = loadFile(filePath);
      // return result;
      return [["loaded successfully"]];
    } else {
      return [["unsuccessful load"]];
    }
  },
  view: (args: string[]) => {
    if (loadResult === null) {
      return <View data={[["please load a file first"]]} />;
    } else if (args.length !== 0) {
      return <View data={[["incorrect number of arguments"]]} />;
    } else {
      return <View data={loadResult} />;
    }
  },
  search: (args: string[]): JSX.Element => {
    if (loadResult === null) {
      return <Search results={[["please load a file first"]]} />;
    }
    if (args.length !== 2) {
      return <Search results={[["incorrect number of arguments"]]} />;
    }
    const column = args[0];
    const value = args[1];
    const dataset = csvDict[filePath];

    // const columnIdentifier = dataset[0].indexOf(column);
    let filteredResults;
    const columnIndex = parseInt(column);
    if (!isNaN(columnIndex)) {
      // If the column is given as an index
      filteredResults = dataset.filter(
        (row) => row[columnIndex] === value
      );
    } else{
      // If the column is given as a column name
      const columnIdentifier = dataset[0].indexOf(column);
      if (columnIdentifier !== -1) {
        filteredResults = dataset.filter(
          (row) => row[columnIdentifier] === value
        );
      } else {
        return (
          <Search results={[["Column not found in the top row of csv"]]} />
        );
      }
    }
    return <Search results={filteredResults} />;
  },
};

export const commands = new Map<string, REPLFunction>();
Object.entries(commandsObject).forEach(([key, value]) => {
  commands.set(key, value);
});
