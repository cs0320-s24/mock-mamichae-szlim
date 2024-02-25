import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { SourceTextModule } from "vm";

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>;
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
  let command = '';
  // TODO WITH TA: build a handleSubmit function called in button onClick
  // TODO: Once it increments, try to make it push commands... Note that you can use the `...` spread syntax to copy what was there before
  // add to it with new commands.
  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */

  
  //function modeUpdate(){
  const toggleMode = () => {
    props.setMode((prevMode) => (prevMode === 'brief' ? 'verbose' : 'brief'));
  }
  //}
  function extractCommands(){
    command = commandString.split(' ')[0];
    if (command.toLowerCase() === 'mode') {
      toggleMode();
    }
  }
  

  function handleSubmit(commandString: string) {
    setcount(count + 1);
    props.setHistory([...props.history, commandString]);
    extractCommands()
    setCommandString("")
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
      <h1>{props.mode === 'brief' ? 'Brief Mode' : 'Verbose Mode'}</h1>
      <button aria-label ="Submit" onClick={() => handleSubmit(commandString)}>
        Submitted {count} times!
      </button>
    </div>
  );
}
