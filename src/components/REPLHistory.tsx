import '../styles/main.css';
import { HistoryLog } from './HistoryLog';

interface REPLHistoryProps {
    history: HistoryLog[];
    mode: string;
}

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
