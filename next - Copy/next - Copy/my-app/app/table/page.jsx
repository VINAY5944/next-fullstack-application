"use client"
import React, { useState, useMemo } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TextField, InputAdornment, IconButton, Typography
} from '@mui/material';
import { Search as SearchIcon, FilterList as FilterListIcon } from '@mui/icons-material';
import { useTheme, useMediaQuery } from '@mui/material';

const sampleData = [
  { id: 1, name: 'John Doe', age: 28, occupation: 'Engineer' },
  { id: 2, name: 'Jane Smith', age: 34, occupation: 'Designer' },
  { id: 3, name: 'Mike Johnson', age: 45, occupation: 'Developer' },
 
];

const ResponsiveTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredData = useMemo(() => {
    return sampleData.filter(item =>
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.occupation.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filter ? item.occupation.toLowerCase() === filter.toLowerCase() : true)
    );
  }, [searchTerm, filter]);

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Responsive Table with Search and Filter
      </Typography>
      <TextField
        variant="outlined"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        variant="outlined"
        placeholder="Filter by occupation..."
        value={filter}
        onChange={handleFilterChange}
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <FilterListIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Occupation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.occupation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ResponsiveTable;
