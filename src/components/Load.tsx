import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { SourceTextModule } from "vm";
import { REPLFunction } from "./REPLFunction";
import { HistoryLog } from "./HistoryLog";

interface LoadProps {}

export function LoadFunction(props: LoadProps){

    const loadFile = (filePath: string): string[][] => {
      const datasets = new Map<string, string[][]>();
      if (datasets.has(filePath)) {
        // non-null assertion, cited in readme
        // but do we know it's really null?
        return datasets.get(filePath)!;
      } else {
        return [["error"]];
      }
    };

}

  