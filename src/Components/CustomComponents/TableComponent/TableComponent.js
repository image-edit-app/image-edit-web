function TableComponent({ headers, data, expandedRowIndex, onRowClick, maxHeight = "h-full", }) {
    const unknownUserImage = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    return (
        <div className={`w-full overflow-x-auto bg-white rounded-lg shadow relative ${maxHeight}`}>
            <table className="min-w-full table-auto text-left">
                <thead className="sticky top-0 bg-gray-200 text-gray-700 z-10"> 
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} className="px-4 py-2 border-b capitalize">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                {data.map((row, rowIndex) => (
                    // <tr key={rowIndex} className="hover:bg-gray-100">
                    <tbody key={rowIndex}>
                        <tr
                            className="hover:bg-gray-100 cursor-pointer"
                            onClick={() => onRowClick(rowIndex)}
                        >
                            {headers.map((key, colIndex) => (
                                <td key={colIndex} className="px-6 py-4 border-b">
                                    {key === "Profile" ? (
                                        <img
                                            // src={row[key]}
                                            src={row[key] || unknownUserImage}
                                            alt="Profile"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        row[key]
                                    )}
                                </td>
                            ))}
                        </tr>
                        {expandedRowIndex === rowIndex && (
                            <tr className="bg-gray-50">
                                <td colSpan={headers.length} className="px-6 py-4 border-b">
                                    <div className="text-sm space-y-1">
                                        <div><strong>DOB:</strong> {row["Dob"]}</div>
                                        <div><strong>Gender:</strong> {row["Gender"]}</div>
                                        <div><strong>Firm Name:</strong> {row["Firm Name"]}</div>
                                        <div><strong>Address:</strong> {row["Address"]}</div>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                ))}
            </table>
        </div>
    );
}

export default TableComponent;