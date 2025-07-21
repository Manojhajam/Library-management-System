import React from "react";




const Table = ({ data = [], columns = [] }) => {
  return <table className="w-full max-h-[500px] overflow-y-auto">
      <thead className="sticky top-0 bg-white z-10"> 
        <tr className="hover:bg-gray-50">
          {columns.map(col => {
            return <th className="py-4 p-2 text-left text-gray-500 text-sm font-medium">
                {col.label}
              </th>;
          })}
      </tr>
      <tr>
        <th colSpan={columns.length} className="h-[1px] bg-gray-300"/>
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
