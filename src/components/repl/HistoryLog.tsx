/**
 * Interface for a history log item, which handles commands provided
 * by the user and output (either string message or data)
 */
export interface HistoryLog {
    type: string;
    content: string | string[] | string[][] | JSX.Element; 
}