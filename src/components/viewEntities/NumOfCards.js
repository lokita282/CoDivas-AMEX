import { React, useState, useEffect } from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TableContainer,
  TableCell,
  TableRow,
  Paper,
  TableHead,
  Table,
  TableBody,
  Avatar,
} from '@mui/material'
import { Icon } from '@iconify/react'
import { getEntities } from '../../services/userServices'
import Loader from '../loader/Loading'

const NumOfCards = () => {
  const [entities, setEntities] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      await getEntities().then((res) => {
        console.log('data entities')
        console.log(res.data.data)
        setEntities(res.data.data)
      })
    }
    fetchData()
  }, [])
  return (
    <>
      {entities.merchants ? (
        <>
          <Grid container spacing={5} sx={{ padding: '0px 25px' }}>
            <Grid item xs={4}>
              <Card
                sx={{
                  minWidth: 275,
                  backgroundColor: '#1d1d1d',
                  borderRadius: '10px',
                  // height: '100%',
                  padding: '10px',
                  margingBottom: '0%',
                  paddingBottom: '0% !important',
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Grid item xs={3}>
                    <Icon
                      icon="ic:twotone-emoji-people"
                      color={'#fff'}
                      width="55"
                      height="55"
                      style={{ padding: '10px' }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={9}
                    sx={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <Typography
                      variant="body1"
                      color="#fff"
                      style={{
                        // borderLeft: '0.1em solid #ffffff5c',
                        padding: '0.5em',
                        display: 'flex',
                        justifyContent: 'center',
                        fontFamily: 'Poppins',
                      }}
                      align="center"
                    >
                      Registered Merchants
                    </Typography>
                    <Typography
                      variant="h1"
                      color="#fff"
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontFamily: 'Poppins',
                      }}
                      align="center"
                    >
                      <b>{entities?.merchants.length}</b>
                    </Typography>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={4}>
              <Card
                sx={{
                  minWidth: 275,
                  backgroundColor: '#1d1d1d',
                  borderRadius: '10px',
                  padding: '10px',
                  margingBottom: '0%',
                  paddingBottom: '0% !important',
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Grid item xs={3}>
                    <Icon
                      icon="mdi:bank-check"
                      color={'#fff'}
                      width="50"
                      height="50"
                      style={{ padding: '10px' }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={9}
                    sx={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <Typography
                      variant="body1"
                      color="#fff"
                      style={{
                        // borderLeft: '0.1em solid #ffffff5c',
                        padding: '0.5em',
                        display: 'flex',
                        justifyContent: 'center',
                        fontFamily: 'Poppins',
                      }}
                      align="center"
                    >
                      Registered Banks
                    </Typography>
                    <Typography
                      variant="h1"
                      color="#fff"
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontFamily: 'Poppins',
                      }}
                      align="center"
                    >
                      <b>{entities?.bankUsers.length}</b>
                    </Typography>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={4}>
              <Card
                sx={{
                  minWidth: 275,
                  backgroundColor: '#1d1d1d',
                  borderRadius: '10px',
                  padding: '10px',
                  margingBottom: '0%',
                  paddingBottom: '0% !important',
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Grid item xs={3}>
                    <Icon
                      icon="mdi:account-group-outline"
                      color={'#fff'}
                      width="50"
                      height="50"
                      style={{ padding: '10px' }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={9}
                    sx={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <Typography
                      variant="body1"
                      color="#fff"
                      style={{
                        // borderLeft: '0.1em solid #ffffff5c',
                        padding: '0.5em',
                        display: 'flex',
                        justifyContent: 'center',
                        fontFamily: 'Poppins',
                      }}
                      align="center"
                    >
                      Registered Organisations
                    </Typography>
                    <Typography
                      variant="h1"
                      color="#fff"
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontFamily: 'Poppins',
                      }}
                      align="center"
                    >
                      <b>{entities?.organisationDetails.length}</b>
                    </Typography>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6}>
              <Typography
                variant="h6"
                color="#fff"
                style={{
                  padding: '0.5em',
                  fontFamily: 'Poppins',
                }}
              >
                Registered Merchant Details
              </Typography>
              <TableContainer component={Paper} sx={{ borderRadius: '10px' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'rgba(55, 94, 192, 1)' }}>
                      <TableCell sx={{ fontFamily: 'Poppins', color: '#fff' }}>
                        <b>Business Name</b>
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'Poppins', color: '#fff' }}>
                        <b>GST No.</b>
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'Poppins', color: '#fff' }}>
                        <b>UID</b>
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'Poppins', color: '#fff' }}>
                        <b>ID</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ backgroundColor: '#1d1d1d' }}>
                    {entities.merchants.slice(0, 6).map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell
                          sx={{ color: '#fff', fontFamily: 'Poppins' }}
                        >
                          {row.businessName}
                        </TableCell>
                        <TableCell
                          sx={{ color: '#fff', fontFamily: 'Poppins' }}
                        >
                          {row.gstNo}
                        </TableCell>
                        <TableCell
                          sx={{ color: '#fff', fontFamily: 'Poppins' }}
                        >
                          {row.uid}
                        </TableCell>
                        <TableCell
                          sx={{ color: '#fff', fontFamily: 'Poppins' }}
                        >
                          {row._id}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item xs={6}>
              <Typography
                variant="h6"
                color="#fff"
                style={{
                  padding: '0.5em',
                  fontFamily: 'Poppins',
                }}
              >
                Registered Organization Details
              </Typography>
              <TableContainer component={Paper} sx={{ borderRadius: '10px' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'rgba(55, 94, 192, 1)' }}>
                      <TableCell sx={{ fontFamily: 'Poppins', color: '#fff' }}>
                        <b>Organization Name</b>
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'Poppins', color: '#fff' }}>
                        <b>Organization </b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ backgroundColor: '#1d1d1d' }}>
                    {entities.organisationDetails.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell
                          sx={{
                            color: '#fff',
                            fontFamily: 'Poppins',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <Avatar
                            alt="Remy Sharp"
                            src={row.orgLogo}
                            sx={{
                              width: 40,
                              height: 40,
                              marginRight: 2,
                              backgroundColor: 'white',
                            }}
                          />
                          {row.orgName}
                        </TableCell>
                        <TableCell
                          sx={{ color: '#fff', fontFamily: 'Poppins' }}
                        >
                          {row.orgId}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="h6"
                color="#fff"
                style={{
                  // borderLeft: '0.1em solid white',
                  padding: '0.5em',
                  fontFamily: 'Poppins',
                }}
              >
                Registered Bank Details
              </Typography>
              <TableContainer component={Paper} sx={{ borderRadius: '10px' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'rgba(55, 94, 192, 1)' }}>
                      <TableCell sx={{ fontFamily: 'Poppins', color: '#fff' }}>
                        <b>Bank</b>
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'Poppins', color: '#fff' }}>
                        <b> PAN No. </b>
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'Poppins', color: '#fff' }}>
                        <b>Registered Contact No.</b>
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'Poppins', color: '#fff' }}>
                        <b>Vouchers Issued</b>
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'Poppins', color: '#fff' }}>
                        <b>ID</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ backgroundColor: '#1d1d1d' }}>
                    {entities.bankUsers.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell
                          sx={{
                            color: '#fff',
                            fontFamily: 'Poppins',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <Avatar
                            alt="Remy Sharp"
                            src={row.bank.bankLogo}
                            sx={{
                              width: 40,
                              height: 40,
                              marginRight: 2,
                              backgroundColor: 'white',
                            }}
                          />
                          {row.user.name}
                        </TableCell>
                        <TableCell
                          sx={{ color: '#fff', fontFamily: 'Poppins' }}
                        >
                          {row.user.pan}
                        </TableCell>
                        <TableCell
                          sx={{ color: '#fff', fontFamily: 'Poppins' }}
                        >
                          {row.user.phone}
                        </TableCell>
                        <TableCell
                          sx={{ color: '#fff', fontFamily: 'Poppins' }}
                        >
                          {row.bank.vouchersIssued.length}
                        </TableCell>
                        <TableCell
                          sx={{ color: '#fff', fontFamily: 'Poppins' }}
                        >
                          {row.bank._id}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default NumOfCards
