import React from 'react';
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,

} from '@tanstack/react-table';
import { useState } from 'react';


const data = [
  { id: 1, gender: 'Male', salary: 40000 },
  { id: 3, gender: 'Female', salary: 50000 },
  { id: 2, gender: 'Male', salary: 46000 },
];


const columns = [
  {
    accessorKey: 'id', 
    header: 'ID',
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
  },
  {
    accessorKey: 'salary',
    header: 'Salary',
  },
];


const TanStackTable = () => {
  
    const [sorting, setSorting] = useState([]);


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(), 
    state: {
        sorting,
           },
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
    });
  

  return(
    <div>
    <h1 className="text-lg font-bold mb-4">TanStack React Table Example</h1>
      <table className="min-w-full border-collapse border border-gray-300">
      <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-100 border-b">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-2 border border-gray-300 cursor-pointer"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() ? (
                    header.column.getIsSorted() === 'asc' ? ' 🔼' : ' 🔽'
                  ) : (
                    ''
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="p-2 border border-gray-300"
                >
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TanStackTable;







// import { useReactTable } from '@tanstack/react-table'
// import React from 'react'

// const data=[
//     {
//       id:1,
//       gender:'Male',
//       salary:40000
//     },
//     {
//         id:2,
//         gender:'Female',
//         salary:50000
//       },
//       {
//         id:3,
//         gender:'Male',
//         salary:46000
//       },
// ]

// const columns=[
//     {
//     Header:"ID",
//     accessor:"id",
//     },
//     {
//         Header:"Gender",
//         accessor:"gender",
//         },
//         {
//             Header:"Salary",
//             accessor:"salary",
//             },
// ]
// const TanStackTable = () => {

//     const {getTableProps,getTableBodyProps,headerGroups,
//         rows,prepareRow
//     }=useReactTable({
//     columns,
//     data
//     }) 
    
//     // const props=getTableProps();

//   return (
//     <div>
//       <table {...getTableProps()}>
//         <thead>
//             {
//                 headerGroups.map((hg)=>(
//                     <tr {...hg.getHeaderGroupProps()}>
                        
//                         {
//                          hg.headers.map((header)=>{
//                             <th {...header.getHeaderProps()}>
//                               {header.render("Header")}
//                             </th>
//                          })
//                         }
                        
//                     </tr>
//                 ))
//             }
//         <tr>
//             <th>ID</th>
//             <th>Gender</th>
//             <th>Salary</th>
//         </tr>
//         </thead>
//         <tbody {...getTableBodyProps()}>
//         {
//             rows.map(row=>{
//                 prepareRow(row);
//                 return <tr {...row.getRowProps()}>
// {
//     row.cells.map(cell=>(
//         <td {...cell.getCellProps()}>
//             {cell.render("Cell")}
//         </td>
//     ))
// }

//                 </tr>
//             })
//         }
//         </tbody>
//       </table>
//     </div>
//   )
// }

// export default TanStackTable
