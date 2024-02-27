import { loadFile } from "./Load";
import View from "./View";
import csvDict from "./MockedCSVs";
import Search from "./Search";

export interface REPLFunction { 
    (args: string[]): string | string[][]| JSX.Element
   
}

let filePath: string;
let loadResult: string[][] = [];

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
        //return "hi";
        return <View data={loadResult} />; 
    },
    search: (args: string[]): JSX.Element => {
        const column = args[0];
        const value = args[1]; 
        const dataset = csvDict[filePath];
    
        // Filter the dataset based on the column and value
        const filteredResults = dataset.filter(row => {
            const columnIndex = parseInt(column);
            if (!isNaN(columnIndex)) {
                // If the column is given as an index
                return row[columnIndex] === value;
            } else {
                // If the column is given as a column name
                return row.includes(value);
            }
        });
        // Render the search results component
        return <Search results={filteredResults} />;
    }
  };
  
  export const commands = new Map<string, REPLFunction>();
  Object.entries(commandsObject).forEach(([key, value]) => {
    commands.set(key, value);
  });