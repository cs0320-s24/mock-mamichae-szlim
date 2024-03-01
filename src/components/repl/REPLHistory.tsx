import '../../styles/main.css';
import { HistoryLog } from './HistoryLog';

/**
 * Props interface for the REPLHistory component.
 */

interface REPLHistoryProps {
    history: HistoryLog[];
    mode: string;
}

/**
 * Component that handles the history of REPL commands and outputs.
 * @param props props containing history logs and mode state;
 * @returns JSX element representing the REPL history.
 */

export function REPLHistory(props: REPLHistoryProps) {
    return (
        <div className="repl-history">
            {props.history.map((item, index) => (
                <div key={index}>
                    {renderHistory(item, index, props.mode)}
                </div>
            ))}
        </div>
    );
}

/**
 * Helper function to render history based on the current mode 
 * (verbose will display command: <command> and output: <output>).
 * @param item HistoryLog object representing history item.
 * @param index index of the history item in the array.
 * @param mode current mode of the REPL (verbose or brief).
 * @returns JSX element representing the rendered history item.
 */
function renderHistory(item: HistoryLog, index: number, mode: string) {
    if (mode === 'verbose') {
        return (
          <div key={index}>
            {item.type === "command" && (
              <p>
                Command: {item.content}
              </p>
            )}
            {item.type === "output" && (
              <p>
                Output:{" "}
                {Array.isArray(item.content)
                  ? item.content.join(", ")
                  : item.content}
              </p>
            )}
          </div>
        );
    } else {
        if (item.type === 'output') {
            return (
                <p key={index}>
                    {Array.isArray(item.content) ? item.content.join(', ') : item.content}
                </p>
            );
        }
    }
    return null; 
}
