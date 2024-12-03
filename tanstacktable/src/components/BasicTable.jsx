import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
} from '@tanstack/react-table';


const fetchPosts = async ({ queryKey }) => {
  const [{ pageIndex, pageSize, sortBy, sortOrder }] = queryKey;
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
    params: {
      _page: pageIndex + 1,
      _limit: pageSize,
      _sort: sortBy,
      _order: sortOrder,
    },
  });
  return {
    data: response.data,
    total: parseInt(response.headers['x-total-count'], 10),
  };
};

const BasicTable = () => {
  const [tableParams, setTableParams] = useState({
    pageIndex: 0,
    pageSize: 5,
    sortBy: 'id',
    sortOrder: 'asc',
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [tableParams],
    queryFn: fetchPosts,
    keepPreviousData: true,
  });

  const columns = useMemo(
    () => [
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'userId', header: 'User ID' },
      { accessorKey: 'title', header: 'Title' },
    ],
    []
  );

  const table = useReactTable({
    data: data?.data || [],
    columns,
    pageCount: Math.ceil((data?.total || 0) / tableParams.pageSize),
    manualPagination: true,
    manualSorting: true,
    state: {
      pagination: {
        pageIndex: tableParams.pageIndex,
        pageSize: tableParams.pageSize,
      },
      sorting: [{ id: tableParams.sortBy, desc: tableParams.sortOrder === 'desc' }],
    },
    onPaginationChange: (updater) => {
      setTableParams((prev) => {
        const newPagination =
          typeof updater === 'function' ? updater(prev) : updater;
        return {
          ...prev,
          pageIndex: newPagination.pageIndex ?? prev.pageIndex,
          pageSize: newPagination.pageSize ?? prev.pageSize,
        };
      });
    },
    onSortingChange: (updater) => {
      setTableParams((prev) => {
        const newSorting = typeof updater === 'function' ? updater(prev.sorting) : updater;
        return {
          ...prev,
          sortBy: newSorting[0]?.id || prev.sortBy,
          sortOrder: newSorting[0]?.desc ? 'desc' : 'asc',
        };
      });
    },
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-200">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="border border-gray-300 px-4 py-2 cursor-pointer"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  <span>
                    {header.column.getIsSorted() === 'desc'
                      ? ' 🔽'
                      : header.column.getIsSorted() === 'asc'
                      ? ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-100">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border border-gray-300 px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <div>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded-md bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="ml-2 px-3 py-1 border rounded-md bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <span>
          Page {tableParams.pageIndex + 1} of {table.getPageCount()}
        </span>
        <div>
          <select
            value={tableParams.pageSize}
            onChange={(e) =>
              setTableParams((prev) => ({
                ...prev,
                pageSize: Number(e.target.value),
              }))
            }
            className="ml-2 px-2 py-1 border rounded-md"
          >
            {[5, 10, 15, 20].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default BasicTable;










// import React, { useMemo } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import {
//   useReactTable,
//   flexRender,
//   getCoreRowModel,
// } from '@tanstack/react-table';

// // Fetch data with Axios using pagination and sorting
// const fetchPosts = async ({ queryKey }) => {
//   const [{ pageIndex, pageSize, sortBy, sortOrder }] = queryKey;
//   const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
//     params: {
//       _page: pageIndex + 1,
//       _limit: pageSize,
//       _sort: sortBy,
//       _order: sortOrder,
//     },
//   });
//   return {
//     data: response.data,
//     total: parseInt(response.headers['x-total-count'], 10),
//   };
// };

// const BasicTable = () => {
//   const [tableParams, setTableParams] = React.useState({
//     pageIndex: 0,
//     pageSize: 5,
//     sortBy: 'id',
//     sortOrder: 'asc',
//   });

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: [tableParams],
//     queryFn: fetchPosts,
//     keepPreviousData: true,
//   });

//   const columns = useMemo(
//     () => [
//       { accessorKey: 'id', header: 'ID' },
//       { accessorKey: 'userId', header: 'User ID' },
//       { accessorKey: 'title', header: 'Title' },
//     ],
//     []
//   );

//   const table = useReactTable({
//     data: data?.data || [],
//     columns,
//     pageCount: Math.ceil((data?.total || 0) / tableParams.pageSize),
//     manualPagination: true,
//     manualSorting: true,
//     state: {
//       pagination: {
//         pageIndex: tableParams.pageIndex,
//         pageSize: tableParams.pageSize,
//       },
//       sorting: [{ id: tableParams.sortBy, desc: tableParams.sortOrder === 'desc' }],
//     },
//     onPaginationChange: (updater) => {
//       const newPagination = updater();
//       setTableParams((prev) => ({
//         ...prev,
//         pageIndex: newPagination.pageIndex,
//         pageSize: newPagination.pageSize,
//       }));
//     },
//     onSortingChange: (updater) => {
//       const newSorting = updater()[0];
//       setTableParams((prev) => ({
//         ...prev,
//         sortBy: newSorting.id,
//         sortOrder: newSorting.desc ? 'desc' : 'asc',
//       }));
//     },
//     getCoreRowModel: getCoreRowModel(),
//   });

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <div>
//       <table className="min-w-full border-collapse border border-gray-300">
//         <thead>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id} className="bg-gray-200">
//               {headerGroup.headers.map((header) => (
//                 <th
//                   key={header.id}
//                   onClick={header.column.getToggleSortingHandler()}
//                   className="border border-gray-300 px-4 py-2 cursor-pointer"
//                 >
//                   {flexRender(header.column.columnDef.header, header.getContext())}
//                   <span>
//                     {header.column.getIsSorted() === 'desc'
//                       ? ' 🔽'
//                       : header.column.getIsSorted() === 'asc'
//                       ? ' 🔼'
//                       : ''}
//                   </span>
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.map((row) => (
//             <tr key={row.id} className="hover:bg-gray-100">
//               {row.getVisibleCells().map((cell) => (
//                 <td key={cell.id} className="border border-gray-300 px-4 py-2">
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="flex justify-between items-center mt-4">
//         <div>
//           <button
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//             className="px-3 py-1 border rounded-md bg-gray-200 disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <button
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//             className="ml-2 px-3 py-1 border rounded-md bg-gray-200 disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//         <span>
//           Page {tableParams.pageIndex + 1} of {table.getPageCount()}
//         </span>
//         <div>
//           <select
//             value={tableParams.pageSize}
//             onChange={(e) =>
//               setTableParams((prev) => ({
//                 ...prev,
//                 pageSize: Number(e.target.value),
//               }))
//             }
//             className="ml-2 px-2 py-1 border rounded-md"
//           >
//             {[5, 10, 15, 20].map((pageSize) => (
//               <option key={pageSize} value={pageSize}>
//                 Show {pageSize}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BasicTable;









// import React, { useMemo } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios'; // Import Axios
// import {
//   useReactTable,
//   flexRender,
//   getCoreRowModel,
//   getSortedRowModel,
//   getPaginationRowModel,
// } from '@tanstack/react-table';

// // Fetching data using Axios with React Query
// const fetchPosts = async () => {
//   const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
//   return response.data; // Axios stores the response data in `data`
// };

// const BasicTable = () => {
//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ['posts'],
//     queryFn: fetchPosts,
//     initialData: [],
//   });

//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: 'id',
//         header: 'ID',
//       },
//       {
//         accessorKey: 'userId',
//         header: 'User ID',
//       },
//       {
//         accessorKey: 'title',
//         header: 'Title',
//       },
//     ],
//     []
//   );

//   const table = useReactTable({
//     data: data || [],
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     initialState: {
//       pagination: {
//         pageIndex: 0,
//         pageSize: 5,
//       },
//     },
//   });

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <div>
//       <table className="min-w-full border-collapse border border-gray-300">
//         <thead>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id} className="bg-gray-200">
//               {headerGroup.headers.map((header) => (
//                 <th
//                   key={header.id}
//                   onClick={header.column.getToggleSortingHandler()}
//                   className="border border-gray-300 px-4 py-2 cursor-pointer"
//                 >
//                   {flexRender(header.column.columnDef.header, header.getContext())}
//                   <span>
//                     {header.column.getIsSorted() === 'desc'
//                       ? ' 🔽'
//                       : header.column.getIsSorted() === 'asc'
//                       ? ' 🔼'
//                       : ''}
//                   </span>
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.map((row) => (
//             <tr key={row.id} className="hover:bg-gray-100">
//               {row.getVisibleCells().map((cell) => (
//                 <td key={cell.id} className="border border-gray-300 px-4 py-2">
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="flex justify-between items-center mt-4">
//         <div>
//           <button
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//             className="px-3 py-1 border rounded-md bg-gray-200 disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <button
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//             className="ml-2 px-3 py-1 border rounded-md bg-gray-200 disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//         <span>
//           Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
//         </span>
//         <div>
//           <select
//             value={table.getState().pagination.pageSize}
//             onChange={(e) => table.setPageSize(Number(e.target.value))}
//             className="ml-2 px-2 py-1 border rounded-md"
//           >
//             {[5, 10, 15, 20].map((pageSize) => (
//               <option key={pageSize} value={pageSize}>
//                 Show {pageSize}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BasicTable;









// import React, { useMemo } from 'react';
// import { useQuery } from '@tanstack/react-query'; // Import useQuery
// import {
//   useReactTable,
//   flexRender,
//   getCoreRowModel,
//   getSortedRowModel,
//   getPaginationRowModel,
// } from '@tanstack/react-table';

// // Fetching data using React Query with v5 format
// const fetchPosts = async () => {
//   const response = await fetch('https://jsonplaceholder.typicode.com/posts');
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }
//   return response.json();
// };

// const BasicTable = () => {
  
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ['posts'], 
//     queryFn: fetchPosts, 
//     initialData: [], 
//   });

//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: 'id',
//         header: 'ID',
//       },
//       {
//         accessorKey: 'userId',
//         header: 'User ID',
//       },
//       {
//         accessorKey: 'title',
//         header: 'Title',
//       },
//     ],
//     []
//   );

//   // Set up the table
//   const table = useReactTable({
//     data: data || [], // Use data from React Query or an empty array as fallback
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     initialState: {
//       pagination: {
//         pageIndex: 0,
//         pageSize: 5, // Default page size
//       },
//     },
//   });

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error fetching data</div>;
//   }

//   return (
//     <div>
//       <table className="min-w-full border-collapse border border-gray-300">
//         <thead>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id} className="bg-gray-200">
//               {headerGroup.headers.map((header) => (
//                 <th
//                   key={header.id}
//                   onClick={header.column.getToggleSortingHandler()}
//                   className="border border-gray-300 px-4 py-2 cursor-pointer"
//                 >
//                   {flexRender(header.column.columnDef.header, header.getContext())}
//                   <span>
//                     {header.column.getIsSorted() === 'desc'
//                       ? ' 🔽'
//                       : header.column.getIsSorted() === 'asc'
//                       ? ' 🔼'
//                       : ''}
//                   </span>
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.map((row) => (
//             <tr key={row.id} className="hover:bg-gray-100">
//               {row.getVisibleCells().map((cell) => (
//                 <td key={cell.id} className="border border-gray-300 px-4 py-2">
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {/* Pagination Controls */}
//       <div className="flex justify-between items-center mt-4">
//         <div>
//           <button
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//             className="px-3 py-1 border rounded-md bg-gray-200 disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <button
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//             className="ml-2 px-3 py-1 border rounded-md bg-gray-200 disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//         <span>
//           Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
//         </span>
//         <div>
//           <select
//             value={table.getState().pagination.pageSize}
//             onChange={(e) => table.setPageSize(Number(e.target.value))}
//             className="ml-2 px-2 py-1 border rounded-md"
//           >
//             {[5, 10, 15, 20].map((pageSize) => (
//               <option key={pageSize} value={pageSize}>
//                 Show {pageSize}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BasicTable;