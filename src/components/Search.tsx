import React from 'react';
import '../styles/Search.css'; 

/**
 * Props interface for the Search component.
 */

interface SearchResultsProps {
    results: string[][];
}

/**
 * Component responsible for rendering the search results in a table format.
 * @param results results to be displated.
 * @returns JSX element that represents the table.
 */

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
    return (
        <div className="search-results">
            <table>
                <tbody>
                    {results.map((row, rowIndex) => (
                        <tr key={rowIndex} className="search-data-row">
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SearchResults;
