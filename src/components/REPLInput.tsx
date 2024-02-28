import "../styles/main.css";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { ControlledInput } from "./ControlledInput";
import { SourceTextModule } from "vm";
import { REPLFunction } from "./REPLFunction";
import { HistoryLog } from "./HistoryLog";
import { loadFile } from "./Load";
import { commands } from "./REPLFunction";

interface REPLInputProps {

  history: HistoryLog[];
  setHistory: Dispatch<SetStateAction<HistoryLog[]>>;
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
}


export function REPLInput(props: REPLInputProps) {

  const [commandString, setCommandString] = useState<string>("");

  const [count, setcount] = useState<number>(0);

  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */

  // Function for toggling between 'brief' and 'verbose' modes
  const toggleModeCommand: REPLFunction = () => {
    props.setMode((prevMode) => (prevMode === "brief" ? "verbose" : "brief"));
    // return "[["mode switched"]]";
    return "mode switched";
  };

  const commandMap = commands;
  commandMap.set("mode", toggleModeCommand);

  function extractCommands(commandString: string) {
    const args = commandString.split(" ");
    const command = args[0].toLowerCase();
    if (commandMap.has(command)) {
      const commandFunction = commandMap.get(command)!;
      // slice removes first element at zero, creates new array
      // cited in readme
      const result = commandFunction(args.slice(1));
      if (!result) {
        return null;
      }else{
        return result
      }
    }
  }

  function handleSubmit(commandString: string) {

    props.setHistory((prevHistory) => [
      ...prevHistory,
      { type: "command", content: commandString },
    ]);

    const output = extractCommands(commandString);

    if (output) {
      props.setHistory((prevHistory) => [
        ...prevHistory,
        { type: "output", content: output },
      ]);
    } else {
      // If output is null (indicating an error), add an error message to the history
      props.setHistory((prevHistory) => [
        ...prevHistory,
        { type: "output", content: "Error: Unable to execute the command" }, 
      ]);
    }

    setCommandString("");
  }

  return (
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <p>
        You are in: {props.mode === "brief" ? "Brief Mode" : "Verbose Mode"}
      </p>
      <button aria-label="Submit" onClick={() => handleSubmit(commandString)}>
        Submit
      </button>
    </div>
  );
}