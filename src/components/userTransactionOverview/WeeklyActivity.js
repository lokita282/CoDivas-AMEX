import React from 'react'
import { ResponsiveBar } from '@nivo/bar' 
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'

const NivoBar = () => {

  const barData = [
  {
    "day": "MON",
    "health": 51,
    "healthColor": "hsl(328, 70%, 50%)",
    "telecommunication": 58,
    "telecommunicationColor": "hsl(289, 70%, 50%)",
    "education": 78,
    "educationColor": "hsl(9, 70%, 50%)",
    "food": 68,
    "foodColor": "hsl(115, 70%, 50%)",
    "utility": 32,
    "utilityColor": "hsl(20, 70%, 50%)",
    "other": 76,
    "otherColor": "hsl(241, 70%, 50%)"
  },
  {
    "day": "TUES",
    "health": 183,
    "healthColor": "hsl(42, 70%, 50%)",
    "telecommunication": 138,
    "telecommunicationColor": "hsl(70, 70%, 50%)",
    "education": 119,
    "educationColor": "hsl(334, 70%, 50%)",
    "food": 68,
    "foodColor": "hsl(21, 70%, 50%)",
    "utility": 126,
    "utilityColor": "hsl(261, 70%, 50%)",
    "other": 44,
    "otherColor": "hsl(133, 70%, 50%)"
  },
  {
    "day": "WED",
    "health": 107,
    "healthColor": "hsl(97, 70%, 50%)",
    "telecommunication": 121,
    "telecommunicationColor": "hsl(306, 70%, 50%)",
    "education": 97,
    "educationColor": "hsl(0, 70%, 50%)",
    "food": 49,
    "foodColor": "hsl(256, 70%, 50%)",
    "utility": 50,
    "utilityColor": "hsl(140, 70%, 50%)",
    "other": 30,
    "otherColor": "hsl(111, 70%, 50%)"
  },
  {
    "day": "THUR",
    "health": 46,
    "healthColor": "hsl(109, 70%, 50%)",
    "telecommunication": 1,
    "telecommunicationColor": "hsl(65, 70%, 50%)",
    "education": 181,
    "educationColor": "hsl(252, 70%, 50%)",
    "food": 191,
    "foodColor": "hsl(30, 70%, 50%)",
    "utility": 57,
    "utilityColor": "hsl(323, 70%, 50%)",
    "other": 101,
    "otherColor": "hsl(191, 70%, 50%)"
  },
  {
    "day": "FRI",
    "health": 15,
    "healthColor": "hsl(86, 70%, 50%)",
    "telecommunication": 4,
    "telecommunicationColor": "hsl(191, 70%, 50%)",
    "education": 81,
    "educationColor": "hsl(212, 70%, 50%)",
    "food": 4,
    "foodColor": "hsl(203, 70%, 50%)",
    "utility": 166,
    "utilityColor": "hsl(226, 70%, 50%)",
    "other": 0,
    "otherColor": "hsl(8, 70%, 50%)"
  },
  {
    "day": "SAT",
    "health": 85,
    "healthColor": "hsl(67, 70%, 50%)",
    "telecommunication": 94,
    "telecommunicationColor": "hsl(311, 70%, 50%)",
    "education": 173,
    "educationColor": "hsl(196, 70%, 50%)",
    "food": 144,
    "foodColor": "hsl(25, 70%, 50%)",
    "utility": 69,
    "utilityColor": "hsl(187, 70%, 50%)",
    "other": 117,
    "otherColor": "hsl(74, 70%, 50%)"
  },
  {
    "day": "SUN",
    "health": 0,
    "healthColor": "hsl(264, 70%, 50%)",
    "telecommunication": 62,
    "telecommunicationColor": "hsl(344, 70%, 50%)",
    "education": 46,
    "educationColor": "hsl(297, 70%, 50%)",
    "food": 99,
    "foodColor": "hsl(263, 70%, 50%)",
    "utility": 32,
    "utilityColor": "hsl(213, 70%, 50%)",
    "other": 115,
    "otherColor": "hsl(166, 70%, 50%)"
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
