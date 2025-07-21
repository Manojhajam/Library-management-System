import React from "react";




const Table = ({ data = [], columns = [] }) => {
  return <table className="w-full">
      <thead>
        <tr className="border-b border-gray-300 hover:bg-gray-50">
          {columns.map(col => {
            return <th className="py-4 p-2 text-left text-gray-500 text-sm font-medium">
                {col.label}
              </th>;
          })}
        </tr>
      </thead>
      <tbody>
          { data?.map((row) => {
                  return (
                  <tr className="border-b border-gray-300  hover:bg-gray-50">
                   {columns.map((col) => {
                         return (
                             <td className="py-4 p-2 text-sm font-medium">{col.renderDetail ? col.renderDetail(row) 
                                : row[col.key]}</td>
                         )
                      })}
                     </tr>
                  )
              })}  
      </tbody>
    </table>;
};

export default Table;
