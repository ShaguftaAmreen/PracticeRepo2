import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { useDebounceValue } from "usehooks-ts"; // Use debouncing to avoid excessive calls
import { useQuery } from "@tanstack/react-query";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { toast } from "react-hot-toast";

// Function to handle sorting logic
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Table head component
function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, headCells } = props;
  const createSortHandler = (property) => (event) =>
    onRequestSort(event, property);

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id && (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              )}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  headCells: PropTypes.array.isRequired,
};

function TableSortSelect() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");

  // Debounce the search input
  const debouncedSearch = useDebounceValue(search, 500);

  const fetchProducts = async ({ queryKey }) => {
    const skip = page * rowsPerPage;

    // If there's a search query, fetch search results, otherwise fetch paginated products
    const url = search
      ? `https://dummyjson.com/products/search?q=${search}`
      : `https://dummyjson.com/products`;

    const params = search
      ? {} // No pagination params for search query
      : { skip, limit: rowsPerPage, order, sortBy: orderBy };
    const response = await axios.get(url, { params });
    return response.data;
  };

  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: [
      "products",
      { page, rowsPerPage, order, orderBy, search: debouncedSearch },
    ],
    queryFn: fetchProducts,
    keepPreviousData: true,
  });

  useEffect(() => {
    let loadtoast;
    let successToast;
    let errorToast;
    if (isLoading) {
      loadtoast = toast.loading("loading 🔃");
    } else {
      if (isSuccess) {
        toast.dismiss(loadtoast);
      }
    }
    if (isSuccess) {
      successToast = toast.success("successfull 👏");
    }
    if (error) {
      errorToast = toast.error("Error 🤷‍♂️");
    }
    // else {
    //   toast.dismiss(errorToast);
    // }
  }, [isLoading, isSuccess, error]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handlePageChange = (event, newPage) => setPage(newPage);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // if (isLoading) return <div>Loading...</div>
  // if (error) return <div>Error fetching data</div>;

  const rows = data?.products || [];
  const totalCount = data?.total || 0; // Total count of products, for pagination

  const headCells = [
    { id: "id", label: "ID" },
    { id: "title", label: "Title" },
    { id: "category", label: "Category" },
    { id: "price", label: "Price" },
    { id: "rating", label: "Rating" },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <TextField
          label="Search here"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Update search state on input change
          fullWidth
        />
      </Stack>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headCells={headCells}
            />
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.rating}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          count={totalCount} // Total count based on search or paginated data
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>
    </Box>
  );
}

export default TableSortSelect;
