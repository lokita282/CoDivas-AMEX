import {React, useState} from 'react'
import { Paper, Typography, Grid, Button, TextField } from '@mui/material'
import {
  bold_name,
  btn_connect,
  btn_bank,
  circularprog,
  df_jc_ac,
  df_jfs_ac,
  df_jfs_ac_fdc,
  link,
  ptag,
  textField,
} from '../../theme/CssMy'
import fileSaver from 'file-saver'
import TemplateTable from './TemplateTable'
import ReCAPTCHA from 'react-google-recaptcha'
import { createBulkErupi } from '../../services/bankServices'

const excel_base_64 =
  'dGl0bGUsIHN0YXJ0c0F0LCBlbmRzQXQsIG9yZ0lkLCBiZW5lZmljaWFyeU5hbWUsIGJlbmVmaWNpYXJ5UGhvbmUsIGdvdnRJZFR5cGUsIGdvdnRJZE51bWJlciwgY2F0ZWdvcnksIHN0YXRlLCBkZXNjcmlwdGlvbiwgYW1vdW50LCB1c2VUeXBlDQo='

const styles = {
  paperContainer: {
    borderRadius: '10px',
    boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.21)',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 30px',
    maxWidth: '70%',
  },
  gradientText: {
    background: 'radial-gradient( #7E8AFF, #375EC0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontFamily: 'Poppins',
    padding: '15px 0px',
  },
  downloadBtn: {
    background: 'radial-gradient( #7E8AFF, #375EC0)',
    color: '#fff',
    padding: '20px 20px',
    border: 'none',
    cursor: 'pointer',
    marginTop: 20,
    borderRadius: '5px',
    // width: '65%',
    height: '30%',
    fontFamily: 'Poppins',
  },
  submitBtn: {
    background: 'radial-gradient( #7E8AFF, #375EC0)',
    color: '#fff',
    padding: '20px 20px',
    border: 'none',
    cursor: 'pointer',
    marginTop: 20,
    borderRadius: '5px',
    // width: '10%',
    height: '30%',
    fontFamily: 'Poppins',
  },
  gridContainer: {
    marginTop: 7,
  },
}

const BulkVoucher = () => {
  const [file, setFile] = useState('')
  // const [formData, setFormData] = useState({})

  const handleDownload = () => {
    let dataBlob = excel_base_64
    let sliceSize = 1024
    let byteCharacters = atob(dataBlob)
    let bytesLength = byteCharacters.length
    let slicesCount = Math.ceil(bytesLength / sliceSize)
    let byteArrays = new Array(slicesCount)
    for(let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      let begin = sliceIndex * sliceSize
      let end = Math.min(begin + sliceSize, bytesLength)
      let bytes = new Array(end-begin)
      for (var offset = begin, i=0; offset<end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0)
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes)
    }
    let blob = new Blob(byteArrays, {type: 'application/vnd.ms-excel'})
    fileSaver.saveAs(new Blob([blob], {}), 'Bulk-Voucher-Template.csv')
  }

  const handleUpload = (e) => {
    console.log(e.target.files)
    setFile(e.target.files[0])
  }

  const handleSubmit = async () => {
    
    var myHeaders = new Headers()
    myHeaders.append(
      'Authorization',
      `Bearer ${localStorage.getItem('codivasToken')}`
    )

    var formdata = new FormData()
    formdata.append('file', file, '[PROXY]')

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    }

    fetch(
      'https://ez-rupi.onrender.com/api/bank/create-bulk-vouchers',
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error))

    // // const formData = new FormData()
    // console.log('form data below')
    // console.log(formData)
    // // formData.append('file', file)
    // await createBulkErupi({formData}).then((res) => {
    //   console.log('first')
    //   console.log(res.data)
    //   // localStorage.setItem('codivasToken', res.data.token)
    //   // localStorage.setItem('codivasUser', JSON.stringify(res.data.user))
    //   // ###########successHandler(res.data.message)
    //   // navigate('/dashboard')
    //   // ###########setLoad(false)
    // })
    //   .catch((e) => {
    //     console.log(e)
    //     // ########### errorHandler('createErupi failed')
    //     // ########### setLoad(false)
    //   })
  }

  function onChangeCaptcha(value) {
    console.log('Captcha value:', value)
  }
  
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Paper style={styles.paperContainer}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" style={styles.gradientText}>
                <b>Generate multiple e-₹UPI vouchers at once</b>
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography
                variant="body1"
                sx={{
                  color: '#a2a2a2',
                  fontFamily: 'Poppins',
                }}
              >
                Generate multiple e-₹UPI vouchers by CSV upload. Download the
                template to get started!
              </Typography>
            </Grid>
            <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'end' }}>
              <Button onClick={handleDownload} sx={btn_connect}>
                Download Template
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                sx={{
                  color: '#a2a2a2',
                  fontFamily: 'Poppins',
                  paddingTop: '20px',
                }}
              >
                The template is as follows:
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TemplateTable />
            </Grid>
            <Grid item xs={8} sx={{ paddingBottom: '20px' }}>
              {/* <Button variant="contained" component="label">
                Select File */}
              {/* <input type="file" /> */}

              <TextField
                id="file"
                // value={}
                onChange={handleUpload}
                type="file"
              />

              {/* </Button> */}
            </Grid>
            <Grid item xs={12}>
            <ReCAPTCHA
              sitekey="6LeuTKImAAAAAHGzGmP26m4V8IAO55NVL-Pc4EoO"
              onChange={onChangeCaptcha}
            />
            </Grid>
            <Grid item xs={8}> </Grid>
            <Grid
              item
              xs={4}
              sx={{
                display: 'flex',
                justifyContent: 'end',
                paddingBottom: '20px',
              }}
            >
              <Button sx={btn_bank} onClick={handleSubmit}>
                Upload Data
              </Button>{' '}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  )
}

export default BulkVoucher