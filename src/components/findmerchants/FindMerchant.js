import React, { useEffect } from 'react';
import { getAllMerchants } from '../../services/userServices';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Box, InputAdornment } from '@mui/material';
import Fuse from 'fuzzy-search';
import { useState } from 'react';
import { df_jc_ac, textField } from '../../theme/CssMy';
import { Icon } from '@iconify/react';
import Loading from '../loader/Loading';

const columns = ['GST No', 'Business Name', 'Category', 'UID'];

const FindMerchant = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllMerchants(); // Fetch data using the API function
        console.log(res.data.data.merchants);
        setData(res.data.data.merchants);
        setFilteredData(res.data.data.merchants);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);

    if (value === '') {
      setFilteredData(data);
    } else {
      const fuse = new Fuse(data, ['gstNo', 'businessName', 'category'], {
        caseSensitive: false,
      });
      const results = fuse.search(value);
      setFilteredData(results);
    }
  };

  return (
    <div>
      {filteredData.length ? <Box sx={{ padding: '2% 20%' }}>
        <TextField value={searchTerm} sx={textField} InputProps={{
          endAdornment: <InputAdornment position="end"><Icon icon="ic:round-search" width={22} height={22} /></InputAdornment>,
        }} placeholder='Search merchants' onChange={handleSearch} />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#375EC0', color: 'white' }}>
                {columns.map((column) => (
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }} key={column}>{column}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.length ? (
                filteredData.map((merchant, index) => (
                  <TableRow key={merchant._id} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff' }}>
                    <TableCell>{merchant.gstNo}</TableCell>
                    <TableCell>{merchant.businessName}</TableCell>
                    <TableCell>{merchant.category}</TableCell>
                    <TableCell>{merchant.uid}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">No merchants found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box> : <Box sx={{ ...df_jc_ac, height: '80vh' }}>
        <Loading />
      </Box>}
    </div>
  );
};

export default FindMerchant;
