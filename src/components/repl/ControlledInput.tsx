import '../../styles/main.css';
import { Dispatch, SetStateAction } from 'react';

/**
 * Props for the ControlledInput component.
 */
interface ControlledInputProps {
    value: string, 
    setValue: Dispatch<SetStateAction<string>>,
    ariaLabel: string 
  }

  /**
   * A component that handles the input given by the user. 
   * @param props - props for the ControlledInput component
   * @returns the controlled input
   */
  export function ControlledInput({value, setValue, ariaLabel}: ControlledInputProps) {
    return (
      <input type="text" className="repl-command-box"
            value={value} 
            placeholder="Enter command here!"
            onChange={(ev) => setValue(ev.target.value)}
            aria-label={ariaLabel}>
      </input>
    );
  }