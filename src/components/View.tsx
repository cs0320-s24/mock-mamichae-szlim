import React from 'react';
import '../styles/View.css'; 

interface ViewProps {
    data: string[][];
}

const View: React.FC<ViewProps> = ({ data }) => {
    return (
        <div className="view-component">
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