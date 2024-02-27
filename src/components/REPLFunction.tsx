import { loadFile } from "./Load";
import View from "./View";
import csvDict from "./MockedCSVs";

export interface REPLFunction { 
    (args: string[]): string | string[][]| JSX.Element
   
}

let loadResult: string[][] = [];

const commandsObject = {
    load_file: (args: string[]) => {
        if (args.length === 1) {
            const filePath = args[0];
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
    }
  };
  
  export const commands = new Map<string, REPLFunction>();
  Object.entries(commandsObject).forEach(([key, value]) => {
    commands.set(key, value);
  });