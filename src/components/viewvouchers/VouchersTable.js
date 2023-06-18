import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles'
import { styled } from '@mui/material/styles'
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  Avatar,
  Button,
  Typography,
  Modal,
} from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import { Icon } from '@iconify/react'
import moment from 'moment/moment'
import Lottie from 'react-lottie'
import { df_jc_ac } from '../../theme/CssMy'
import { viewVouchers, revokeVoucher } from '../../services/bankServices'
import Loading from '../loader/Loading'
import caution from '../../assets/caution'
import successHandler from '../toasts/successHandler'
import errorHandler from '../toasts/errorHandler'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#375EC0',
    color: theme.palette.common.white,
    fontFamily: 'Poppins',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: 'Poppins',
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}))

function TablePaginationActions(props) {
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange } = props

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  )
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
}

export default function CustomPaginationActionsTable() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [vouchers, setVouchers] = useState([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - vouchers.length) : 0

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // const handleRevoke = (event) => {

  // }

  useEffect(() => {
    const func = async () => {
      setLoading(true)
      await viewVouchers().then((res) => {
        console.log('vouchers')
        console.log(res.data.data.vouchers)
        setVouchers(
          res.data.data.vouchers.sort((a, b) =>
            a.createdAt < b.createdAt ? 1 : -1
          )
        )
      })
      setLoading(false)
    }
    func()
  }, [])

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: caution,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <>
      {loading ? (
        <Box sx={{ ...df_jc_ac, height: '80vh' }}>
          <Loading />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Org.</StyledTableCell>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell>Expires At</StyledTableCell>
                <StyledTableCell>Beneficiary Name</StyledTableCell>
                <StyledTableCell>Beneficiary Contact</StyledTableCell>
                <StyledTableCell>Category</StyledTableCell>
                {/* <StyledTableCell>State</StyledTableCell> */}
                <StyledTableCell>UID</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Revoke</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? vouchers.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : vouchers
              ).map((voucher) => (
                <>
                  {voucher.status === 'revoked' ? (
                    <StyledTableRow key={voucher.uid}>
                      <StyledTableCell>
                        <Avatar src={voucher.orgLogo} sx={{ opacity: 0.4 }} />
                      </StyledTableCell>
                      <StyledTableCell sx={{ color: '#b5b5b5' }}>
                        {voucher.title}
                      </StyledTableCell>
                      <StyledTableCell sx={{ color: '#b5b5b5' }}>
                        {moment(voucher.endsAt).format('Do MMM, YYYY')}
                      </StyledTableCell>
                      <StyledTableCell sx={{ color: '#b5b5b5' }}>
                        {voucher.beneficiaryName}
                      </StyledTableCell>
                      <StyledTableCell sx={{ color: '#b5b5b5' }}>
                        {voucher.beneficiaryPhone}
                      </StyledTableCell>
                      <StyledTableCell sx={{ color: '#b5b5b5' }}>
                        {voucher.category[0].toUpperCase() +
                          voucher.category.substring(1)}
                      </StyledTableCell>
                      {/* <StyledTableCell>{voucher.state}</StyledTableCell> */}
                      <StyledTableCell sx={{ color: '#b5b5b5' }}>
                        {voucher.uid}
                      </StyledTableCell>
                      <StyledTableCell>
                        <Button
                          sx={{
                            textTransform: 'none',
                            backgroundColor: 'rgba(181,181,181, 0.1)',
                            border: '2px solid #b5b5b5',
                            borderRadius: '50px',
                            color: '#b5b5b5',
                            paddingRight: 2,
                          }}
                        >
                          <Icon
                            icon="material-symbols:warning-rounded"
                            style={{
                              padding: '5px',
                            }}
                          />
                          {voucher.status[0].toUpperCase() +
                            voucher.status.substring(1)}
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Typography
                          variant="caption text"
                          color="initial"
                          sx={{ fontFamily: 'Poppins', color: '#b5b5b5' }}
                        >
                          Revoked
                        </Typography>
                      </StyledTableCell>
                    </StyledTableRow>
                  ) : (
                    <StyledTableRow key={voucher.uid}>
                      <StyledTableCell>
                        <Avatar src={voucher.orgLogo} />
                      </StyledTableCell>
                      <StyledTableCell>{voucher.title}</StyledTableCell>
                      <StyledTableCell>
                        {moment(voucher.endsAt).format('Do MMM, YYYY')}
                      </StyledTableCell>
                      <StyledTableCell>
                        {voucher.beneficiaryName}
                      </StyledTableCell>
                      <StyledTableCell>
                        {voucher.beneficiaryPhone}
                      </StyledTableCell>
                      <StyledTableCell>
                        {voucher.category[0].toUpperCase() +
                          voucher.category.substring(1)}
                      </StyledTableCell>
                      {/* <StyledTableCell>{voucher.state}</StyledTableCell> */}
                      <StyledTableCell>{voucher.uid}</StyledTableCell>
                      <StyledTableCell>
                        {voucher.status === 'upcoming' ||
                        voucher.status === 'valid' ? (
                          <>
                            {voucher.status === 'upcoming' ? (
                              <Button
                                sx={{
                                  textTransform: 'none',
                                  backgroundColor: 'rgba(55,94,192, 0.1)',
                                  border: '2px solid #375EC0',
                                  borderRadius: '50px',
                                  color: '#375EC0',
                                  '&:hover': {
                                    backgroundColor: '#375EC0',
                                    color: '#fff',
                                  },
                                  paddingRight: 2,
                                }}
                              >
                                <Icon
                                  icon="material-symbols:event-upcoming-outline-rounded"
                                  style={{
                                    padding: '5px',
                                  }}
                                />
                                {voucher.status[0].toUpperCase() +
                                  voucher.status.substring(1)}
                              </Button>
                            ) : (
                              <Button
                                sx={{
                                  textTransform: 'none',
                                  backgroundColor: 'rgba(255,155,5,0.1)',
                                  border: '2px solid #FF9B05',
                                  borderRadius: '50px',
                                  color: '#FF9B05',
                                  '&:hover': {
                                    backgroundColor: '#FF9B05',
                                    color: '#fff',
                                  },
                                  paddingRight: 2,
                                  width: '100px',
                                }}
                              >
                                <Icon
                                  icon="streamline:interface-validation-check-square-2-check-form-validation-checkmark-success-add-addition-box-square"
                                  style={{
                                    padding: '5px 7px',
                                  }}
                                />
                                {voucher.status[0].toUpperCase() +
                                  voucher.status.substring(1)}
                              </Button>
                            )}
                          </>
                        ) : (
                          <>
                            {voucher.status === 'redeemed' ? (
                              <Button
                                sx={{
                                  textTransform: 'none',
                                  backgroundColor: 'rgba(0, 153, 70, 0.1)',
                                  border: '2px solid #009946',
                                  borderRadius: '50px',
                                  color: '#009946',
                                  '&:hover': {
                                    backgroundColor: 'rgba(0, 153, 70, 0.8)',
                                    color: '#fff',
                                  },
                                  paddingRight: 2,
                                }}
                              >
                                <Icon
                                  icon="material-symbols:done-all-rounded"
                                  style={{
                                    padding: '5px',
                                  }}
                                />
                                {voucher.status[0].toUpperCase() +
                                  voucher.status.substring(1)}
                              </Button>
                            ) : (
                              <>
                                {voucher.status === 'expired' ? (
                                  <Button
                                    sx={{
                                      textTransform: 'none',
                                      backgroundColor: 'rgba(188,188,188,0.1)',
                                      border: '2px solid #bcbcbc',
                                      borderRadius: '50px',
                                      color: '#bcbcbc',
                                      '&:hover': {
                                        backgroundColor: '#bcbcbc',
                                        color: '#fff',
                                      },
                                      paddingRight: 2,
                                    }}
                                  >
                                    <Icon
                                      icon="ic:round-hourglass-bottom"
                                      style={{
                                        padding: '5px',
                                      }}
                                    />
                                    {voucher.status[0].toUpperCase() +
                                      voucher.status.substring(1)}
                                  </Button>
                                ) : (
                                  <Button
                                    sx={{
                                      textTransform: 'none',
                                      backgroundColor: 'rgba(255,0,61, 0.1)',
                                      border: '2px solid #FF447C',
                                      borderRadius: '50px',
                                      color: '#FF447C',
                                      '&:hover': {
                                        backgroundColor: '#FF447C',
                                        color: '#fff',
                                      },
                                      paddingRight: 2,
                                    }}
                                  >
                                    <Icon
                                      icon="mdi:qrcode-scan"
                                      style={{
                                        padding: '5px',
                                      }}
                                    />
                                    {voucher.status[0].toUpperCase() +
                                      voucher.status.substring(1)}
                                  </Button>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </StyledTableCell>
                      <StyledTableCell>
                        {voucher.status === 'upcoming' ||
                        voucher.status === 'valid' ? (
                          <>
                            <Button
                              variant="contained"
                              color="primary"
                              sx={{
                                textTransform: 'none',
                                backgroundColor: 'rgba(234,50,62, 0.1)',
                                border: '2px solid #EA323E',
                                borderRadius: '50px',
                                color: '#EA323E',
                                '&:hover': {
                                  backgroundColor: '#EA323E',
                                  color: '#fff',
                                },
                                maxWidth: '50px',
                              }}
                              onClick={handleOpen}
                            >
                              <Icon
                                icon="entypo:cross"
                                style={{
                                  padding: '5px',
                                  cursor: 'pointer',
                                }}
                              />
                            </Button>
                            <Modal
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box sx={style}>
                                <Typography
                                  id="modal-modal-title"
                                  variant="h6"
                                  component="h2"
                                  sx={{ fontFamily: 'Poppins' }}
                                >
                                  <b>
                                    Are you sure you want to revoke this
                                    voucher?
                                  </b>
                                </Typography>
                                <Typography
                                  id="modal-modal-description"
                                  sx={{
                                    fontFamily: 'Poppins',
                                    color: '#929292',
                                  }}
                                >
                                  This action cannot be undone.
                                </Typography>
                                <Lottie
                                  options={defaultOptions}
                                  height={150}
                                  width={150}
                                  // speed={1}
                                />
                                <Box
                                  sx={{
                                    display: 'flex',
                                    justifyContent: 'end',
                                    marginRight: 2,
                                    mt: 2,
                                  }}
                                >
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                      textTransform: 'none',
                                      backgroundColor: 'rgba(234,50,62, 0.1)',
                                      border: '2px solid #EA323E',
                                      color: '#EA323E',
                                      marginRight: 2,
                                      '&:hover': {
                                        backgroundColor: 'rgba(234,50,62, 0.1)',
                                        color: '#EA323E',
                                        boxShadow:
                                          '0px 1px 26px rgba(94, 99, 116, 0.21)',
                                      },
                                    }}
                                    onClick={handleClose}
                                  >
                                    Cancel
                                  </Button>{' '}
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                      textTransform: 'none',
                                      backgroundColor: '#EA323E',
                                      color: '#fff',
                                      '&:hover': {
                                        backgroundColor: '#EA323E',
                                        color: '#fff',
                                        boxShadow:
                                          '0px 1px 12px rgba(94, 99, 116, 0.21)',
                                      },
                                    }}
                                    onClick={async () => {
                                      await revokeVoucher(voucher?._id)
                                        .then((res) => {
                                          console.log(res.data.data)
                                          successHandler(res.data.message)
                                          setOpen(false)
                                        })
                                        .catch((e) => {console.log(e)
                                         errorHandler('Voucher could not be revoked')})
                                    }}
                                  >
                                    Revoke
                                  </Button>
                                </Box>
                              </Box>
                            </Modal>
                          </>
                        ) : (
                          <Typography
                            variant="caption text"
                            color="initial"
                            sx={{ fontFamily: 'Poppins' }}
                          >
                            Cannot be
                            <br /> revoked
                          </Typography>
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
                </>
              ))}

              {emptyRows > 0 && (
                <StyledTableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={20} />
                </StyledTableRow>
              )}
            </TableBody>
            <TableFooter>
              <StyledTableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={10}
                  count={vouchers.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </StyledTableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </>
  )
}
