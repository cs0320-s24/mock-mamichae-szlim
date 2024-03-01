import React from 'react';
import '../../styles/View.css'; 

/**
 * Props interface for the View component.
 */

interface ViewProps {
    data: string[][];
}

/**
 * Component responsible for rendering the data to be viewed.
 * @param data data to be displayed.
 * @returns JSX element representing the data. 
 */

const View: React.FC<ViewProps> = ({ data }) => {
    return (
      <div className="view-component" id="view-table">
        <table>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="data-row">
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

export default View;