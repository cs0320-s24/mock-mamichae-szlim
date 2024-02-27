import React from 'react';

interface ViewProps {
    data: string[][];
}

const View: React.FC<ViewProps> = ({ data }) => {
    // Render the data as an HTML table
    return (
        <div className="view-component">
            <h2>CSV Data</h2>
            <table>
                <thead>
                    <tr>
                        {data[0].map((cell, index) => (
                            <th key={index}>{cell}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.slice(1).map((row, rowIndex) => (
                        <tr key={rowIndex}>
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
