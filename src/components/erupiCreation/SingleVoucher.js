import {React, useState} from 'react'
import {
  bold_name,
  btn_connect,
  circularprog,
  df_jc_ac,
  df_jfs_ac,
  df_jfs_ac_fdc,
  link,
  ptag,
  textField,
} from '../../theme/CssMy'

import {
  Paper,
  Typography,
  Grid,
  FormControl,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  TextField,
  InputLabel,
  Select,
  MenuItem, Button, Box, CircularProgress
} from '@mui/material' 
import { createErupi } from '../../services/bankServices'
import successHandler from '../toasts/successHandler'
import errorHandler from '../toasts/errorHandler'

const styles = {
  paperContainer: {
    borderRadius: '30px',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 30px',
  },
  gradientText: {
    background: 'radial-gradient( #7E8AFF, #375EC0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontFamily: 'Poppins',
    padding: '15px 0px',
  },
  createBtn: {
    background: 'radial-gradient( #7E8AFF, #375EC0)',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    marginTop: 20,
    borderRadius: '5px',
    width: '10%',
    height: '50%',
    fontFamily: 'Poppins',
  },
  gridContainer: { 
    marginTop: 7
  }
}

// const organisationDetails = [
//     {
//         orgId: 678431,
//         orgName: 'Think360',
//         orgLogo:
//             'https://res.cloudinary.com/dlwpoojua/image/upload/v1686227018/amex-hackathon/think360_eb4917.png'
//     },
//     {
//         orgId: 689346,
//         orgName: 'Stark Industries',
//         orgLogo:
//             'https://res.cloudinary.com/dlwpoojua/image/upload/v1686227186/amex-hackathon/stark_qhw2ee.png'
//     },
//     {
//         orgId: 549012,
//         orgName: 'National Health Authority of India',
//         orgLogo:
//             'https://res.cloudinary.com/dlwpoojua/image/upload/v1686227187/amex-hackathon/nha_mbgupt.png'
//     },
//     {
//         orgId: 549012,
//         orgName: 'Odisha Government',
//         orgLogo:
//             'https://res.cloudinary.com/dlwpoojua/image/upload/v1686227382/amex-hackathon/odishaGovt_xcs0ek.png'
//     },
//     {
//         orgId: 120871,
//         orgName: 'Pratham Foundation',
//         orgLogo:
//             'https://res.cloudinary.com/dlwpoojua/image/upload/v1686227613/amex-hackathon/pratham_tvjgwi.png'
//     },
//     {
//         orgId: 989791,
//         orgName: 'Goonj Foundation',
//         orgLogo:
//             'https://res.cloudinary.com/dlwpoojua/image/upload/v1686227613/amex-hackathon/goonj_tu8yre.png'
//     }
// ];

const SingleVoucher = () => {
  const [json, setJson] = useState({
    title: '',
    startsAt: '',
    endsAt: '',
    orgId: '',
    beneficiaryName: '',
    beneficiaryPhone: '',
    govtIdType: 'pan',
    govtIdNumber: '',
    category: '',
    state: '',
    Description: '',
    amount: '',
    useType: 'single',
  })

  const [governmentId, setGovernmentId] = useState('pan')
  const [type, setType] = useState('single')
  const [category, setCategory] = useState('')
  const [orgId, setOrgId] = useState('')
  const [state, setState] = useState('')
  const [load, setLoad] = useState(false)

  const handleChangeCategory = (event) => {
    setCategory(event.target.value)
    const name = event.target.name
    const value = event.target.value
    setJson({ ...json, [name]: value })
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setJson({ ...json, [name]: value })
  }

  const handleChangeGovtId = (event) => {
    setGovernmentId(event.target.value)
    const name = event.target.name
    const value = event.target.value
    setJson({ ...json, [name]: value })
  }

  const handleChangeType = (event) => {
    setType(event.target.value)
    const name = event.target.name
    const value = event.target.value
    setJson({ ...json, [name]: value })
  }

  const handleChangeOrg = (event) => {
    setOrgId(event.target.value)
    const name = event.target.name
    const value = event.target.value
    setJson({ ...json, [name]: value })
  }

  const handleChangeState = (event) => {
    setState(event.target.value)
    const name = event.target.name
    const value = event.target.value
    setJson({ ...json, [name]: value })
  }

  const handleChangeDate = (event) => {
    const name = event.target.name
    var value = event.target.value
    setJson({ ...json, [name]: value })
  }

  const handleSubmit = async () => {
    setLoad(true)
    // if (json.phone && json.password) {
      await createErupi({
        ...json,
        startsAt: new Date(json.startsAt),
        endsAt: new Date(json.endsAt)
      })
        .then((res) => {
          console.log('first')
          console.log(res.data)
          // localStorage.setItem('codivasToken', res.data.token)
          // localStorage.setItem('codivasUser', JSON.stringify(res.data.user))
          // setUser(res.data.user)
          // setToken(res.data.token)
          successHandler(res.data.message)
          // navigate('/dashboard')
          setLoad(false)
        })
        .catch((e) => {
          errorHandler('createErupi failed')
          setLoad(false)
        })
    // } else {
    //   // !json.phone && errorHandler('Phone number cannot be empty')
    //   // !json.password && errorHandler('Password cannot be empty')
    //   // setLoad(false)
    // }
  }

  return (
    <Paper style={styles.paperContainer}>
      <Typography variant="h4" style={styles.gradientText}>
        <b>Generate an e-₹UPI voucher for a single beneficiary</b>
      </Typography>
      <Grid container spacing={2} style={styles.gridContainer}>
        <Grid item xs={6}>
          <TextField
            id="title"
            label="Title Of Voucher"
            name="title"
            variant="outlined"
            fullWidth
            value={json.title}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={2.8}>
          <TextField
            fullWidth
            type="date"
            id="startsAt"
            name="startsAt"
            value={json.startsAt}
            onChange={handleChangeDate}
          />
          {console.log(json)}
        </Grid>
        <Grid
          item
          xs={0.4}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            verticalAlign: 'middle',
            alignItems: 'center',
          }}
        >
          <Typography variant="body1" sx={{ fontFamily: 'Poppins' }}>
            to
          </Typography>
        </Grid>
        <Grid item xs={2.8}>
          <TextField
            fullWidth
            type="date"
            id="endsAt"
            name="endsAt"
            value={json.endsAt}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="beneficiaryName"
            label="Name of the beneficiary"
            name="beneficiaryName"
            variant="outlined"
            value={json.beneficiaryName}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="beneficiaryPhone"
            label="Beneficiary phone number"
            name="beneficiaryPhone"
            variant="outlined"
            type="number"
            value={json.beneficiaryPhone}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Type of Government ID
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={governmentId}
              onChange={handleChangeGovtId}
              defaultChecked
              sx={{ display: 'flex', flexDirection: 'row' }}
            >
              <FormControlLabel
                value="pan"
                name="govtIdType"
                control={<Radio />}
                label="PAN"
              />
              <FormControlLabel
                value="aadhar"
                name="govtIdType"
                control={<Radio />}
                label="Aadhar"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          {governmentId === 'pan' ? (
            <TextField
              id="pan"
              label="Beneficiary PAN Number"
              name="govtIdNumber"
              value={json.govtIdNumber}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          ) : (
            <TextField
              id="aadhar"
              label="Beneficiary Aadhar number"
              name="govtIdNumber"
              variant="outlined"
              value={json.govtIdNumber}
              onChange={handleChange}
              fullWidth
            />
          )}
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Category of e-₹UPI voucher
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Age"
              name="category"
              onChange={handleChangeCategory}
            >
              <MenuItem value="agriculture">Agriculture</MenuItem>
              <MenuItem value="education">Education</MenuItem>
              <MenuItem value="food">Food</MenuItem>
              <MenuItem value="health">Health</MenuItem>
              <MenuItem value="housing">Housing</MenuItem>
              <MenuItem value="other">Other</MenuItem>
              <MenuItem value="transportation">Transportation</MenuItem>
              <MenuItem value="telecommunication">Telecommunication</MenuItem>
              <MenuItem value="utility">Utility</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="amount"
            label="Amount"
            name="amount"
            value={json.value}
            onChange={handleChange}
            variant="outlined"
            type="number"
            fullWidth
          />
        </Grid>
        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Type of e-₹UPI voucher
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={type}
              onChange={handleChangeType}
              defaultChecked
              sx={{ display: 'flex', flexDirection: 'row' }}
            >
              <FormControlLabel
                value="single"
                name="useType"
                control={<Radio />}
                label="Single Use"
              />
              <FormControlLabel
                value="multiple"
                name="useType"
                control={<Radio />}
                label="Multiple Use"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          {/* {type === 'multiple' ? (
            <TextField
              id="balanceAmount "
              label="Balance Amount"
              name="balanceAmount"
              value={json.balanceAmount}
              onChange={handleChange}
              variant="outlined"
              type="number"
              fullWidth
            />
          ) : (
            ''
          )} */}
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Organization</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="orgId"
              value={orgId}
              label="organization"
              onChange={handleChangeOrg}
            >
              <MenuItem value="678431">Think360</MenuItem>
              <MenuItem value="689346">Stark Industries</MenuItem>
              <MenuItem value="549012">
                National Health Authority of India
              </MenuItem>
              <MenuItem value="549013">Odisha Government</MenuItem>
              <MenuItem value="120871">Pratham Foundation</MenuItem>
              <MenuItem value="989791">Goonj Foundation</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">State</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={state}
              name="state"
              label="State"
              onChange={handleChangeState}
            >
              <MenuItem value="Andaman and Nicobar">
                Andaman and Nicobar
              </MenuItem>
              <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
              <MenuItem value="Arunachal Pradesh">Arunachal Pradesh</MenuItem>
              <MenuItem value="Assam">Assam</MenuItem>
              <MenuItem value="Bihar">Bihar</MenuItem>
              <MenuItem value="Chandigarh">Chandigarh</MenuItem>
              <MenuItem value="Chhattisgarh">Chhattisgarh</MenuItem>
              <MenuItem value="Dadra and Nagar Haveli">
                Dadra and Nagar Haveli
              </MenuItem>
              <MenuItem value="Daman and Diu">Daman and Diu</MenuItem>
              <MenuItem value="Delhi">Delhi</MenuItem>
              <MenuItem value="Goa">Goa</MenuItem>
              <MenuItem value="Gujrat">Gujrat</MenuItem>
              <MenuItem value="Haryana">Haryana</MenuItem>
              <MenuItem value="Himachal Pradesh">Himachal Pradesh</MenuItem>
              <MenuItem value="Jammu and Kashmir">Jammu and Kashmir</MenuItem>
              <MenuItem value="Jharkhand">Jharkhand</MenuItem>
              <MenuItem value="Karnataka">Karnataka</MenuItem>
              <MenuItem value="Kerala">Kerala</MenuItem>
              <MenuItem value="Madhya Pradesh">Madhya Pradesh</MenuItem>
              <MenuItem value="Maharashtra">Maharashtra</MenuItem>
              <MenuItem value="Manipur">Manipur</MenuItem>
              <MenuItem value="Meghalaya">Meghalaya</MenuItem>
              <MenuItem value="Mizoram">Mizoram</MenuItem>
              <MenuItem value="Nagaland">Nagaland</MenuItem>
              <MenuItem value="Orissa">Orissa</MenuItem>
              <MenuItem value="Puducherry">Puducherry</MenuItem>
              <MenuItem value="Punjab">Punjab</MenuItem>
              <MenuItem value="Rajasthan">Rajasthan</MenuItem>
              <MenuItem value="Sikkim">Sikkim</MenuItem>
              <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
              <MenuItem value="Tripura">Tripura</MenuItem>
              <MenuItem value="Uttaranchal">Uttaranchal</MenuItem>
              <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
              <MenuItem value="West Bengal">West Bengal</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="Description "
            label="Description"
            name="Description"
            value={json.Description}
            onChange={handleChange}
            multiline
            rows={4}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
          {load ? (
            <Box sx={df_jc_ac}>
              <Button style={styles.createBtn} onClick={handleSubmit}>
                <CircularProgress size={15} sx={circularprog} />
              </Button>
            </Box>
          ) : (
            <Button style={styles.createBtn} onClick={handleSubmit}>
              Create
            </Button>
          )}
          {/* <Button
            color="primary"
            style={styles.createBtn}
            onClick={handleSubmit}
          >
            Create
          </Button> */}
        </Grid>
      </Grid>
    </Paper>
  )
}

export default SingleVoucher