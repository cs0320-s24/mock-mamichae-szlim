import React from 'react';
import '../styles/Search.css'; 

interface SearchResultsProps {
    results: string[][];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
    return (
      <div className="search-results" id="search-table">
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
