import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { SourceTextModule } from "vm";
import { REPLFunction } from "./REPLFunction";
import { HistoryLog } from "./HistoryLog";
import csvDict from "./MockedCSVs";


interface LoadProps {}

export function loadFile(filePath: string): string[][] {

  if (csvDict.hasOwnProperty(filePath)) {
    return csvDict[filePath];
} else {
    return [["loaded file path not found"]];
}
}

  