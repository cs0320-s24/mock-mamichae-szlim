import React from 'react';
import '../styles/View.css'; 

interface ViewProps {
    data: string[][];
}

const View: React.FC<ViewProps> = ({ data }) => {
    return (
        <div className="view-component">
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