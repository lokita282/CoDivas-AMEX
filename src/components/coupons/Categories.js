import { Avatar, AvatarGroup, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getAllCoupons } from '../../services/userServices'
import doc from '../../images/doc.png'
import edu from '../../images/edu.png'
import agri from '../../images/agri.png'
import food from '../../images/food.png'
import hou from '../../images/hou.png'
import trans from '../../images/trans.png'
import uti from '../../images/uti.png'
import tele from '../../images/tele.png'
import oth from '../../images/oth.png'
import { bold_name, df_jc_ac_fdc } from '../../theme/CssMy'
import { useNavigate } from 'react-router'

export default function Categories() {
    const [all, setAll] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const func = async () => {
            await getAllCoupons()
                .then((res) => {
                    console.log(res.data.data)
                    setAll(res.data.data)
                })
        }
        func()
    }, [])

    return (
        <>
            <Typography variant='h5' sx={{ ...bold_name, marginBottom: '5%' }}>Categories</Typography>
            <Grid container spacing={3}>
                <Grid item md={3} sx={{ height: '100%', cursor: 'pointer' }} onClick={() => navigate('/user/getstarted/health')}>
                    <CardContent sx={{ bgcolor: 'white', height: '23vh', boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.21)', borderRadius: '10px' }}>
                        <div style={df_jc_ac_fdc}>
                            <CardMedia component='img' image={doc} sx={{ height: '20vh', width: 'auto' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography sx={bold_name}>Health</Typography>
                            {all?.health ? <AvatarGroup max={1} total={all?.health.length} sx={{ '& .MuiAvatar-root': { width: '30px', height: '30px', border: '2px solid #375EC0', backgroundColor: 'white', color: '#375EC0', fontSize: '12px' } }}>
                                {all.health.map((he, i) => {
                                    if (i < 2) {
                                        return <Avatar src={he?.orgLogo} />
                                    }
                                })}  </AvatarGroup> : ""}
                        </div>
                    </CardContent>
                </Grid>
                <Grid item md={3} sx={{ height: '100%', cursor: 'pointer' }} onClick={() => navigate('/user/getstarted/education')}>
                    <CardContent sx={{ bgcolor: 'white', height: '23vh', boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.21)', borderRadius: '10px' }}>
                        <div style={df_jc_ac_fdc}>
                            <CardMedia component='img' image={edu} sx={{ height: '20vh', width: 'auto' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={bold_name}>Education</Typography>

                            {all?.education ? <AvatarGroup max={1} total={all?.education.length} sx={{ '& .MuiAvatar-root': { width: '30px', height: '30px', border: '2px solid #375EC0', backgroundColor: 'white', color: '#375EC0', fontSize: '12px' } }}>
                                {all.education.map((he, i) => {
                                    if (i < 2) {
                                        return <Avatar src={he?.orgLogo} />
                                    }
                                })}  </AvatarGroup> : ""}

                        </div>
                    </CardContent>
                </Grid>
                <Grid item md={3} sx={{ height: '100%', cursor: 'pointer' }} onClick={() => navigate('/user/getstarted/agriculture')}>
                    <CardContent sx={{ bgcolor: 'white', height: '23vh', boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.21)', borderRadius: '10px' }}>
                        <div style={df_jc_ac_fdc}>
                            <CardMedia component='img' image={agri} sx={{ height: '20vh', width: 'auto' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={bold_name}>Agriculture</Typography>

                            {all?.agriculture ? <AvatarGroup max={1} total={all?.agriculture.length} sx={{ '& .MuiAvatar-root': { width: '30px', height: '30px', border: '2px solid #375EC0', backgroundColor: 'white', color: '#375EC0', fontSize: '12px' } }}>
                                {all.agriculture.map((he, i) => {
                                    if (i < 2) {
                                        return <Avatar src={he?.orgLogo} />
                                    }
                                })}  </AvatarGroup> : ""}

                        </div>
                    </CardContent>
                </Grid>
                <Grid item md={3} sx={{ height: '100%', cursor: 'pointer' }} onClick={() => navigate('/user/getstarted/food')}>
                    <CardContent sx={{ bgcolor: 'white', height: '23vh', boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.21)', borderRadius: '10px' }}>
                        <div style={df_jc_ac_fdc}>
                            <CardMedia component='img' image={food} sx={{ height: '20vh', width: 'auto' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={bold_name}>Food</Typography>

                            {all?.food ? <AvatarGroup max={1} total={all?.food.length} sx={{ '& .MuiAvatar-root': { width: '30px', height: '30px', border: '2px solid #375EC0', backgroundColor: 'white', color: '#375EC0', fontSize: '12px' } }}>
                                {all.food.map((he, i) => {
                                    if (i < 2) {
                                        return <Avatar src={he?.orgLogo} />
                                    }
                                })}  </AvatarGroup> : ""}

                        </div>
                    </CardContent>
                </Grid>
                <Grid item md={3} sx={{ height: '100%', cursor: 'pointer' }} onClick={() => navigate('/user/getstarted/housing')}>
                    <CardContent sx={{ bgcolor: 'white', height: '23vh', boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.21)', borderRadius: '10px' }}>
                        <div style={df_jc_ac_fdc}>
                            <CardMedia component='img' image={hou} sx={{ height: '20vh', width: 'auto' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={bold_name}>Housing</Typography>

                            {all?.housing ? <AvatarGroup max={1} total={all?.housing.length} sx={{ '& .MuiAvatar-root': { width: '30px', height: '30px', border: '2px solid #375EC0', backgroundColor: 'white', color: '#375EC0', fontSize: '12px' } }}>
                                {all.housing.map((he, i) => {
                                    if (i < 2) {
                                        return <Avatar src={he?.orgLogo} />
                                    }
                                })}  </AvatarGroup> : ""}

                        </div>
                    </CardContent>
                </Grid>
                <Grid item md={3} sx={{ height: '100%', cursor: 'pointer' }} onClick={() => navigate('/user/getstarted/transportation')}>
                    <CardContent sx={{ bgcolor: 'white', height: '23vh', boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.21)', borderRadius: '10px' }}>
                        <div style={df_jc_ac_fdc}>
                            <CardMedia component='img' image={trans} sx={{ height: '20vh', width: 'auto' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={bold_name}>Transportation</Typography>

                            {all?.transportation ? <AvatarGroup max={1} total={all?.transportation.length} sx={{ '& .MuiAvatar-root': { width: '30px', height: '30px', border: '2px solid #375EC0', backgroundColor: 'white', color: '#375EC0', fontSize: '12px' } }}>
                                {all.transportation.map((he, i) => {
                                    if (i < 2) {
                                        return <Avatar src={he?.orgLogo} />
                                    }
                                })}  </AvatarGroup> : ""}

                        </div>
                    </CardContent>
                </Grid>
                <Grid item md={3} sx={{ height: '100%', cursor: 'pointer' }} onClick={() => navigate('/user/getstarted/utility')}>
                    <CardContent sx={{ bgcolor: 'white', height: '23vh', boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.21)', borderRadius: '10px' }}>
                        <div style={df_jc_ac_fdc}>
                            <CardMedia component='img' image={uti} sx={{ height: '20vh', width: 'auto' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={bold_name}>Utility</Typography>

                            {all?.utility ? <AvatarGroup max={1} total={all?.utility.length} sx={{ '& .MuiAvatar-root': { width: '30px', height: '30px', border: '2px solid #375EC0', backgroundColor: 'white', color: '#375EC0', fontSize: '12px' } }}>
                                {all.utility.map((he, i) => {
                                    if (i < 2) {
                                        return <Avatar src={he?.orgLogo} />
                                    }
                                })}  </AvatarGroup> : ""}

                        </div>
                    </CardContent>
                </Grid>
                <Grid item md={3} sx={{ height: '100%', cursor: 'pointer' }} onClick={() => navigate('/user/getstarted/telecommunication')}>
                    <CardContent sx={{ bgcolor: 'white', height: '23vh', boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.21)', borderRadius: '10px' }}>
                        <div style={df_jc_ac_fdc}>
                            <CardMedia component='img' image={tele} sx={{ height: '20vh', width: 'auto' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={bold_name}>Telecommunication</Typography>

                            {all?.telecommunication ? <AvatarGroup max={1} total={all?.telecommunication.length} sx={{ '& .MuiAvatar-root': { width: '30px', height: '30px', border: '2px solid #375EC0', backgroundColor: 'white', color: '#375EC0', fontSize: '12px' } }}>
                                {all.telecommunication.map((he, i) => {
                                    if (i < 2) {
                                        return <Avatar src={he?.orgLogo} />
                                    }
                                })}  </AvatarGroup> : ""}

                        </div>
                    </CardContent>
                </Grid>
                <Grid item md={3} sx={{ height: '100%', cursor: 'pointer' }} onClick={() => navigate('/user/getstarted/other')}>
                    <CardContent sx={{ bgcolor: 'white', height: '23vh', boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.21)', borderRadius: '10px' }}>
                        <div style={df_jc_ac_fdc}>
                            <CardMedia component='img' image={oth} sx={{ height: '20vh', width: 'auto' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={bold_name}>Other</Typography>

                            {all?.other ? <AvatarGroup max={1} total={all?.other.length} sx={{ '& .MuiAvatar-root': { width: '30px', height: '30px', border: '2px solid #375EC0', backgroundColor: 'white', color: '#375EC0', fontSize: '12px' } }}>
                                {all.other.map((he, i) => {
                                    if (i < 2) {
                                        return <Avatar src={he?.orgLogo} />
                                    }
                                })}  </AvatarGroup> : ""}

                        </div>
                    </CardContent>
                </Grid>
            </Grid>
            {/* <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography variant="h2" style={styles.gradientText}>
            <b>Our Categories</b>
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography
            variant="body1"
            color="#909090"
            sx={{ paddingTop: 2, fontFamily: 'Poppins' }}
          >
            Various categories for you to make your payments easily and
            seamlessly!
          </Typography>
        </Grid>
        {categories.map((category) => {
          return (
            <Grid item xs={3}>
              <Link
                to={`/user/getstarted/${category.name}`}
                style={{ textDecoration: 'none' }}
              >
                <Card sx={{ margin: 1, borderRadius: '20px' }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="250"
                      // width="20"
                      image={category.img}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="body1"
                        component="div"
                        sx={{ textAlign: 'center', fontFamily: 'Poppins' }}
                        color="#18152C"
                      >
                        <b>{category.name}</b>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </Grid>
          )
        })}

        <Grid item xs={8}>
          <Typography variant="h2" style={styles.gradientText}>
            <b>Utilities</b>
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography
            variant="body1"
            color="#909090"
            sx={{ paddingTop: 2, fontFamily: 'Poppins' }}
          >
            Recharge and pay for utilities easily at the comfort of your home!
          </Typography>
        </Grid>
        {utilities.map((utility) => {
          return (
            <Grid item xs={3}>
              <Link
                to={`/user/getstarted/${utility.link}`}
                style={{ textDecoration: 'none' }}
              >
                <Card sx={{ margin: 1, borderRadius: '20px' }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="250"
                      width="20"
                      image={utility.img}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="body1"
                        component="div"
                        sx={{ textAlign: 'center', fontFamily: 'Poppins' }}
                        color="#18152C"
                      >
                        <b>{utility.name}</b>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </Grid>
          )
        })}

        <Grid item xs={8}>
          <Typography variant="h2" style={styles.gradientText}>
            <b>Government Schemes</b>
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography
            variant="body1"
            color="#909090"
            sx={{ paddingTop: 2, fontFamily: 'Poppins' }}
          >
            View and avail various government schemes for your benefit!
          </Typography>
        </Grid>

        <Grid item xs={12}>
          {schemes.map((scheme) => {
            return (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography sx={{ fontFamily: 'Poppins' }}>
                    {scheme.name}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ fontFamily: 'Poppins' }}>
                    {scheme.desc}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            )
          })}
        </Grid>
      </Grid> */}
        </>
    )
}
