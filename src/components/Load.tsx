import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { SourceTextModule } from "vm";
import { REPLFunction } from "./REPLFunction";
import { HistoryLog } from "./HistoryLog";
import csvDict from "./MockedCSVs";


interface LoadProps {}

export function loadFile(filePath: string): string[][] {
  // const datasets = new Map<string, string[][]>();
  // if (datasets.has(filePath)) {
  //   return datasets.get(filePath)!;
  // } else {
  //   return [["error"]];
  // }
  if (csvDict.hasOwnProperty(filePath)) {
    return csvDict[filePath];
} else {
    return [["error"]];
}
}

  