import React from 'react'
import { ResponsiveBar } from '@nivo/bar' 
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'

const NivoBar = () => {

  const barData = [
  {
    "day": "MON",
    "health": 51,
    "telecommunication": 58,
    "education": 78,
    "food": 68,
    "utility": 32,
    "other": 76,
  },
  {
    "day": "TUES",
    "health": 183,
    "telecommunication": 138,
    "education": 119,
    "food": 68,
    "utility": 126,
    "other": 44,
  },
  {
    "day": "WED",
    "health": 107,
    "telecommunication": 121,
    "education": 97,
    "food": 49,
    "utility": 50,
    "other": 30,
  },
  {
    "day": "THUR",
    "health": 46,
    "telecommunication": 1,
    "education": 181,
    "food": 191,
    "utility": 57,
    "other": 101,
  },
  {
    "day": "FRI",
    "health": 15,
    "telecommunication": 4,
    "education": 81,
    "food": 4,
    "utility": 166,
    "other": 0,
  },
  {
    "day": "SAT",
    "health": 85,
    "telecommunication": 94,
    "education": 173,
    "food": 144,
    "utility": 69,
    "other": 117,
  },
  {
    "day": "SUN",
    "health": 0,
    "telecommunication": 62,
    "education": 46,
    "food": 99,
    "utility": 32,
    "other": 115,
  }
]

 const MyResponsiveBar = ({ data }) => (
   <ResponsiveBar
     data={data}
     keys={[
       'health',
       'telecommunication',
       'education',
       'food',
       'utility',
       'other',
     ]}
     indexBy="day"
     margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
     padding={0.3}
     valueScale={{ type: 'linear' }}
     indexScale={{ type: 'band', round: true }}
     colors={{ scheme: 'blues' }}
     defs={[
       {
         id: 'dots',
         type: 'patternDots',
         background: 'inherit',
         color: '#fff',
         size: 4,
         padding: 1,
         stagger: true,
       },
       {
         id: 'lines',
         type: 'patternLines',
         background: 'inherit',
         color: '#fff',
         rotation: -45,
         lineWidth: 6,
         spacing: 10,
       },
     ]}
    //  fill={[
    //    {
    //      match: {
    //        id: 'utility',
    //      },
    //      id: 'dots',
    //    },
    //    {
    //      match: {
    //        id: 'education',
    //      },
    //      id: 'lines',
    //    },
    //  ]}
     borderColor={{
       from: 'color',
       modifiers: [['darker', 1.6]],
     }}
     axisTop={null}
     axisRight={null}
     axisBottom={{
       tickSize: 5,
       tickPadding: 5,
       tickRotation: 0,
       legend: 'day',
       legendPosition: 'middle',
       legendOffset: 32,
     }}
     axisLeft={{
       tickSize: 5,
       tickPadding: 5,
       tickRotation: 0,
       legend: 'amount (in ₹)',
       legendPosition: 'middle',
       legendOffset: -40,
     }}
     labelSkipWidth={12}
     labelSkipHeight={12}
     labelTextColor={{
       from: 'color',
       modifiers: [['darker', 1.6]],
     }}
     legends={[
       {
         dataFrom: 'keys',
         anchor: 'bottom-right',
         direction: 'column',
         justify: false,
         translateX: 120,
         translateY: 0,
         itemsSpacing: 2,
         itemWidth: 100,
         itemHeight: 20,
         itemDirection: 'left-to-right',
         itemOpacity: 0.85,
         symbolSize: 20,
         effects: [
           {
             on: 'hover',
             style: {
               itemOpacity: 1,
             },
           },
         ],
       },
     ]}
     role="application"
     ariaLabel="Nivo bar chart demo"
     barAriaLabel={(e) =>
       e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue
     }
   />
 )

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            // backgroundColor: (theme) =>
            //   theme.palette.mode === 'light'
            //     ? theme.palette.grey[100]
            //     : theme.palette.grey[900],
            flexGrow: 1,
            overflow: 'auto',
          }}
        >
          <div style={{ height: '400px', width: '53.125rem', overflow: 'hidden' }}>
            <MyResponsiveBar data={barData} />
          </div>
        </Box>
      </Box>
    </>
  )
}

export default NivoBar
