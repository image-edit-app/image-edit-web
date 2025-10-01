function TableComponent({ headers, data }) {
    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full table-auto text-left">
                <thead>
                    <tr className="bg-gray-200 text-gray-700">
                        {headers.map((header, index) => (
                            <th key={index} className="px-6 py-3 border-b capitalize">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-100">
                            {headers.map((key, colIndex) => (
                                <td key={colIndex} className="px-6 py-4 border-b">
                                    {row[key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableComponent;