import '../styles/main.css';

interface HistoryItem {
    command: string;
    output: string;
}

interface REPLHistoryProps{
    // TODO: Fill with some shared state tracking all the pushed commands
    history: HistoryItem[];
    mode: string;
}
export function REPLHistory(props : REPLHistoryProps) {
    return (
        <div className="repl-history">
            {/* This is where command history will go */}
            {/* TODO: To go through all the pushed commands... try the .map() function! */}
            {/* {props.history.map((command, index) => (<p>{command}</p>))} */}
            {props.history.map((item, index) => (
                <div key={index}>
                    {props.mode === 'verbose' ? (
                        <>
                            <p>Command: {item.command}</p>
                            <p>Output: {item.output}</p>
                        </>
                    ) : (
                        <p>{item.output}</p>
                    )}
                </div>
            ))}
        </div>
    );
}