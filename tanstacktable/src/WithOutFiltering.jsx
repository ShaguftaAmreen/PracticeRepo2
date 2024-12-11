import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";

const fetchPosts = async ({ queryKey }) => {
  console.log("inside fetchposts", queryKey);
  const [{ pageIndex, pageSize, sortBy, sortOrder }] = queryKey;

  const params = {
    _page: pageIndex + 1,
    _limit: pageSize,
    _sort: sortBy,
    _order: sortOrder,
  };

  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts",
    {
      params,
    }
  );

  return {
    data: response.data,
    total: parseInt(response.headers["x-total-count"], 10),
  };
};

const BasicTable = () => {
  const [tableParams, setTableParams] = useState({
    pageIndex: 0,
    pageSize: 5,
    sortBy: "id",
    sortOrder: "asc",
  });

  const [columnVisibility, setColumnVisibility] = useState({});

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [tableParams],
    queryFn: fetchPosts,
    keepPreviousData: true,
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "userId",
        header: "User ID",
      },
      {
        accessorKey: "title",
        header: "Title",
      },
    ],
    []
  );

  const table = useReactTable({
    data: data?.data || [],
    columns,
    state: {
      pagination: {
        pageIndex: tableParams.pageIndex,
        pageSize: tableParams.pageSize,
      },
      sorting: [
        { id: tableParams.sortBy, desc: tableParams.sortOrder === "desc" },
      ],
      columnVisibility,
    },
    pageCount: Math.ceil((data?.total || 0) / tableParams.pageSize),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: false, // No filtering
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: (updater) => {
      setTableParams((prev) => ({
        ...prev,
        ...(typeof updater === "function" ? updater(prev) : updater),
      }));
    },
    onSortingChange: (updater) => {
      setTableParams((prev) => {
        const newSorting =
          typeof updater === "function" ? updater(prev.sorting) : updater;
        return {
          ...prev,
          sortBy: newSorting[0]?.id || prev.sortBy,
          sortOrder: newSorting[0]?.desc ? "desc" : "asc",
        };
      });
    },
    onColumnVisibilityChange: setColumnVisibility,
  });

  if (isLoading) return <div>Loading....</div>;
  if (isError) return <div>Error: {error.message}</div>;
  console.log(data.data);
  console.log(data.total);

  return (
    <div>
      <div className="inline-block border border-black shadow rounded">
        <div className="px-1 border-b border-black">
          <label className="className">
            <input
              type="checkbox"
              checked={table.getIsAllColumnsVisible()}
              onChange={table.getToggleAllColumnsVisibilityHandler()}
            />
            Toggle All Or None
          </label>
        </div>
        {table.getAllLeafColumns().map((column) => (
          <div key={column.id} className="px-1">
            <label>
              <input
                type="checkbox"
                checked={column.getIsVisible()}
                onChange={column.getToggleVisibilityHandler()}
              />
              {column.id}
            </label>
          </div>
        ))}
      </div>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-200">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border border-gray-300 px-4 py-2"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
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
