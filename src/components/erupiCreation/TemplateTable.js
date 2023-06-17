import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

function createData(title, startsAt, endsAt, orgId, beneName, benePhone, govtIdType, govtIdNum, category, state, desc, amount, useType) {
  return { title, startsAt, endsAt, orgId, beneName, benePhone, govtIdType, govtIdNum, category, state, desc, amount, useType }
}

const rows = [
  createData(
    'Title of the voucher',
    'Voucher valid from this date (in MM/DD/YYYY format)',
    'Voucher expires on this date (in MM/DD/YYYY format)',
    'ID of the organisation for whom e-₹UPI vouchers are being created',
    'Name of the beneficiary for whom the e-₹UPI voucher is being created',
    'Phone number of this beneficiary',
    'pan/aadhar',
    'PAN number or Aadhar number of beneficiary',
    'Category of the e-₹UPI voucher',
    'State where this e-₹UPI voucher is valid',
    'Description of the e-₹UPI voucher',
    'Amount to assign to the e-₹UPI voucher',
    'single use voucher/multiple use voucher'
  ),
]

export default function TemplateTable() {
  return (
    <TableContainer
      component={Paper}
      sx={{
        '&::-webkit-scrollbar': {
          height: 10,
          width: 5,
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'white',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#d5d5d5',
          borderRadius: 2,
        },
        width: '70%'
      }}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* <TableCell align="center">Title</TableCell>
            <TableCell align="center">Starts At</TableCell>
            <TableCell align="center">Ends At</TableCell>
            <TableCell align="center">Organisation ID</TableCell>
            <TableCell align="center">Beneficiary Name</TableCell>
            <TableCell align="center">Beneficiary Phone Number</TableCell>
            <TableCell align="center">Government ID type</TableCell>
            <TableCell align="center">Government ID number</TableCell>
            <TableCell align="center">Category of e-₹UPI voucher</TableCell>
            <TableCell align="center">State where e-₹UPI is valid</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Use Type</TableCell> */}
            <TableCell align="center" sx={{ fontFamily: 'Poppins' }}>
              Title
            </TableCell>
            <TableCell align="center" sx={{ fontFamily: 'Poppins' }}>
              Starts At
            </TableCell>
            <TableCell align="center" sx={{ fontFamily: 'Poppins' }}>
              Ends At
            </TableCell>
            <TableCell align="center" sx={{ fontFamily: 'Poppins' }}>
              Org. ID
            </TableCell>
            <TableCell align="center" sx={{ fontFamily: 'Poppins' }}>
              Beneficiary Name
            </TableCell>
            <TableCell align="center" sx={{ fontFamily: 'Poppins' }}>
              Beneficiary Phone No.
            </TableCell>
            <TableCell align="center" sx={{ fontFamily: 'Poppins' }}>
              Govt ID type
            </TableCell>
            <TableCell align="center" sx={{ fontFamily: 'Poppins' }}>
              Govt ID no.
            </TableCell>
            <TableCell align="center" sx={{ fontFamily: 'Poppins' }}>
              Category
            </TableCell>
            <TableCell align="center" sx={{ fontFamily: 'Poppins' }}>
              State
            </TableCell>
            <TableCell align="center" sx={{ fontFamily: 'Poppins' }}>
              Description
            </TableCell>
            <TableCell align="center" sx={{ fontFamily: 'Poppins' }}>
              Amount
            </TableCell>
            <TableCell align="center" sx={{ fontFamily: 'Poppins' }}>
              Use Type
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell
                align="center"
                sx={{ fontFamily: 'Poppins', color: '#a2a2a2' }}
              >
                {row.title}
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontFamily: 'Poppins', color: '#a2a2a2' }}
              >
                {row.startsAt}
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontFamily: 'Poppins', color: '#a2a2a2' }}
              >
                {row.endsAt}
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontFamily: 'Poppins', color: '#a2a2a2' }}
              >
                {row.orgId}
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontFamily: 'Poppins', color: '#a2a2a2' }}
              >
                {row.beneName}
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontFamily: 'Poppins', color: '#a2a2a2' }}
              >
                {row.benePhone}
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontFamily: 'Poppins', color: '#a2a2a2' }}
              >
                {row.govtIdType}
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontFamily: 'Poppins', color: '#a2a2a2' }}
              >
                {row.govtIdNum}
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontFamily: 'Poppins', color: '#a2a2a2' }}
              >
                {row.category}
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontFamily: 'Poppins', color: '#a2a2a2' }}
              >
                {row.state}
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontFamily: 'Poppins', color: '#a2a2a2' }}
              >
                {row.desc}
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontFamily: 'Poppins', color: '#a2a2a2' }}
              >
                {row.amount}
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontFamily: 'Poppins', color: '#a2a2a2' }}
              >
                {row.useType}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
