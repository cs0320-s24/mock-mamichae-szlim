import "../styles/main.css";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { ControlledInput } from "./ControlledInput";
import { SourceTextModule } from "vm";
import { REPLFunction } from "./REPLFunction";
import { HistoryLog } from "./HistoryLog";
//import { LoadFunction } from "./Load";

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  // history: string[];
  // setHistory: Dispatch<SetStateAction<string[]>>;
  history: HistoryLog[];
  setHistory: Dispatch<SetStateAction<HistoryLog[]>>;
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
}

// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  // TODO WITH TA : add a count state
  const [count, setcount] = useState<number>(0);

  // mutable use let -> will this be allowed?
  const commandMap = new Map<string, REPLFunction>();

  // let commandArr = [];
  // let command = '';
  // TODO WITH TA: build a handleSubmit function called in button onClick
  // TODO: Once it increments, try to make it push commands... Note that you can use the `...` spread syntax to copy what was there before
  // add to it with new commands.
  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */

  // Function for toggling between 'brief' and 'verbose' modes
  const toggleModeCommand: REPLFunction = () => {
    props.setMode((prevMode) => (prevMode === "brief" ? "verbose" : "brief"));
    return [["mode switched"]];
  };

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

  const loadFileCommand: REPLFunction = (args) => {
    if (args.length === 1) {
      const filePath = args[0];
      const result = loadFile(filePath);
      // return result;
      return [["loaded successfully"]];
    } else {
      return [["unsuccessful load"]];
    }
  };

  //   const viewFile = (filePath: string): string[][] => {
  //     const datasets = new Map<string, string[][]>();
  //     if (datasets.has(filePath)) {
  //         // non-null assertion, cited in readme
  //         // but do we know it's really null?
  //       return datasets.get(filePath)!;
  //     } else {
  //       return [["error"]];
  //     }
  //  };

  commandMap.set("mode", toggleModeCommand);
  commandMap.set("load_file", loadFileCommand);

  // const extractCommands = () => {
  //   return "hey"
  //   const args = commandString.split(" ");
  //   const command = args[0];
  //   if (commandMap.has(command)) {
  //     const commandFunction = commandMap.get(command)!;
  //     // slice removes first element at zero, creates new array
  //     // cited in readme
  //     const result = commandFunction(args.slice(1));
  //     if (!result) {
  //       return null;
  //     }
  //   }
  // };

  function extractCommands(commandString: string) {
    const args = commandString.split(" ");
    const command = args[0];
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
    //setcount(count + 1);
    // props.setHistory([...props.history, commandString]);
    // extractCommands()

    props.setHistory((prevHistory) => [
      ...prevHistory,
      { type: "command", content: commandString },
    ]);

    const output = extractCommands(commandString);

    // if (output) {
    //   props.setHistory((prevHistory) => [
    //     ...prevHistory,
    //     { type: "output", content: output },
    //   ]);
    // }
    console.log("output " + output);

    if (output) {
      //why does it never enter this if statement
      props.setHistory((prevHistory) => [
        ...prevHistory,
        { type: "output", content: output },
      ]);
    } else {
      // If output is null (indicating an error), add an error message to the history
      props.setHistory((prevHistory) => [
        ...prevHistory,
        { type: "output", content: "Error: Unable to execute the command" }, //for some reason, it ALWAYYSSS is this
      ]);
    }

    setCommandString("");
  }

  return (
    <div className="repl-input">
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      {/* TODO WITH TA: Build a handleSubmit function that increments count and displays the text in the button */}
      {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}
      <p>
        You are in: {props.mode === "brief" ? "Brief Mode" : "Verbose Mode"}
      </p>
      <button aria-label="Submit" onClick={() => handleSubmit(commandString)}>
        Submit
      </button>
    </div>
  );
}