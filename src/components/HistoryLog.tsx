export interface HistoryLog {
    type: string;
    content: string | string[] | string[][] | JSX.Element; 
}