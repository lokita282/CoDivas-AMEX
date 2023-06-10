import React from 'react'
import SideDrawer from '../components/sidebar/Sidebar'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'

const categories = [
  {
    id: 1,
    img: 'https://png.pngtree.com/png-vector/20220920/ourmid/pngtree-healthcare-png-image_6207439.png',
    name: 'Healthcare',
  },
  {
    id: 2,
    img: 'https://png.pngtree.com/png-vector/20220920/ourmid/pngtree-healthcare-png-image_6207439.png',
    name: 'Agriculture',
  },
  {
    id: 3,
    img: 'https://png.pngtree.com/png-vector/20220920/ourmid/pngtree-healthcare-png-image_6207439.png',
    name: 'Education',
  },
  {
    id: 4,
    img: 'https://png.pngtree.com/png-vector/20220920/ourmid/pngtree-healthcare-png-image_6207439.png',
    name: 'Housing',
  },
  // {
  //   id: 5,
  //   img: 'https://png.pngtree.com/png-vector/20220920/ourmid/pngtree-healthcare-png-image_6207439.png',
  //   name: 'Transportation',
  // },
]

const utilities = [
  {
    id: 1,
    img: 'https://png.pngtree.com/png-vector/20220920/ourmid/pngtree-healthcare-png-image_6207439.png',
    name: 'Mobile Recharge',
    link: 'mobile',
  },
  {
    id: 2,
    img: 'https://png.pngtree.com/png-vector/20220920/ourmid/pngtree-healthcare-png-image_6207439.png',
    name: 'Electricity Bill',
    link: 'electricity',
  },
  {
    id: 3,
    img: 'https://png.pngtree.com/png-vector/20220920/ourmid/pngtree-healthcare-png-image_6207439.png',
    name: 'TV/Cable Recharge',
    link: 'tvcable',
  },
  {
    id: 4,
    img: 'https://png.pngtree.com/png-vector/20220920/ourmid/pngtree-healthcare-png-image_6207439.png',
    name: 'Fastag Recharge',
    link: 'fastag',
  },
]

const schemes = [
  {
    id: '1',
    name: 'Scheme Name 1',
    desc: 'Description of Scheme 1',
  },
  {
    id: '2',
    name: 'Scheme Name 2',
    desc: 'Description of Scheme 2',
  },
  {
    id: '3',
    name: 'Scheme Name 3',
    desc: 'Description of Scheme 3',
  },
]

const styles = {
  gradientText: {
    background: 'radial-gradient( #272a71, #18152c)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 15,
    fontFamily: 'Poppins',
  },
}

const UserGetStarted = () => {
  return (
    <SideDrawer>
      <Grid container spacing={2}>
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
      </Grid>
    </SideDrawer>
  )
}

export default UserGetStarted
