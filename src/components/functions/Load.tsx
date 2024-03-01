import "../../styles/main.css";
// import { Dispatch, SetStateAction, useState } from "react";
// import { ControlledInput } from "./ControlledInput";
// import { SourceTextModule } from "vm";
// import { REPLFunction } from "./REPLFunction";
// import { HistoryLog } from "./HistoryLog";
import csvDict from "../mocked/MockedCSVs";


/**
 * Loads a CSV file from the provided file path, in this case returns mocked data. 
 * @param filePath the path of the CSV file to load
 * @returns a 2D array containing the CSV data, or an error message stating that the filepath was not found. 
 */

export function loadFile(filePath: string): string[][] {

  if (csvDict.hasOwnProperty(filePath)) {
    return csvDict[filePath];
} else {
    return [["loaded file path not found"]];
}
}

  