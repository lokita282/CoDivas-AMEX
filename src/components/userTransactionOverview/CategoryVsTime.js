import React from 'react'
import { ResponsiveLine } from '@nivo/line'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'

const NivoLine = () => {
  const lineData = [
    {
      id: 'Health',
      color: 'hsl(286, 70%, 50%)',
      data: [
        {
          x: 'Jul',
          y: 147,
        },
        {
          x: 'Aug',
          y: 237,
        },
        {
          x: 'Sept',
          y: 247,
        },
        {
          x: 'Oct',
          y: 42,
        },
        {
          x: 'Nov',
          y: 159,
        },
        {
          x: 'Dec',
          y: 18,
        },
        {
          x: 'Jan',
          y: 88,
        },
        {
          x: 'Feb',
          y: 257,
        },
        {
          x: 'Mar',
          y: 125,
        },
        {
          x: 'Apr',
          y: 295,
        },
        {
          x: 'May',
          y: 270,
        },
        {
          x: 'Jun',
          y: 230,
        },
      ],
    },
    {
      id: 'Education',
      color: 'hsl(208, 70%, 50%)',
      data: [
        {
          x: 'Jul',
          y: 284,
        },
        {
          x: 'Aug',
          y: 215,
        },
        {
          x: 'Sept',
          y: 16,
        },
        {
          x: 'Oct',
          y: 86,
        },
        {
          x: 'Nov',
          y: 154,
        },
        {
          x: 'Dec',
          y: 0,
        },
        {
          x: 'Jan',
          y: 82,
        },
        {
          x: 'Feb',
          y: 96,
        },
        {
          x: 'Mar',
          y: 40,
        },
        {
          x: 'Apr',
          y: 263,
        },
        {
          x: 'May',
          y: 294,
        },
        {
          x: 'Jun',
          y: 233,
        },
      ],
    },
    {
      id: 'Transportation',
      color: 'hsl(339, 70%, 50%)',
      data: [
        {
          x: 'Jul',
          y: 270,
        },
        {
          x: 'Aug',
          y: 219,
        },
        {
          x: 'Sept',
          y: 67,
        },
        {
          x: 'Oct',
          y: 278,
        },
        {
          x: 'Nov',
          y: 207,
        },
        {
          x: 'Dec',
          y: 3,
        },
        {
          x: 'Jan',
          y: 121,
        },
        {
          x: 'Feb',
          y: 199,
        },
        {
          x: 'Mar',
          y: 143,
        },
        {
          x: 'Apr',
          y: 285,
        },
        {
          x: 'May',
          y: 80,
        },
        {
          x: 'Jun',
          y: 99,
        },
      ],
    },
    {
      id: 'Utility',
      color: 'hsl(60, 70%, 50%)',
      data: [
        {
          x: 'Jul',
          y: 37,
        },
        {
          x: 'Aug',
          y: 78,
        },
        {
          x: 'Sept',
          y: 272,
        },
        {
          x: 'Oct',
          y: 121,
        },
        {
          x: 'Nov',
          y: 155,
        },
        {
          x: 'Dec',
          y: 48,
        },
        {
          x: 'Jan',
          y: 186,
        },
        {
          x: 'Feb',
          y: 203,
        },
        {
          x: 'Mar',
          y: 237,
        },
        {
          x: 'Apr',
          y: 57,
        },
        {
          x: 'May',
          y: 100,
        },
        {
          x: 'Jun',
          y: 46,
        },
      ],
    },
    {
      id: 'Other',
      color: 'hsl(314, 70%, 50%)',
      data: [
        {
          x: 'Jul',
          y: 92,
        },
        {
          x: 'Aug',
          y: 281,
        },
        {
          x: 'Sept',
          y: 233,
        },
        {
          x: 'Oct',
          y: 195,
        },
        {
          x: 'Nov',
          y: 275,
        },
        {
          x: 'Dec',
          y: 164,
        },
        {
          x: 'Jan',
          y: 140,
        },
        {
          x: 'Feb',
          y: 295,
        },
        {
          x: 'Mar',
          y: 5,
        },
        {
          x: 'Apr',
          y: 219,
        },
        {
          x: 'May',
          y: 98,
        },
        {
          x: 'Jun',
          y: 223,
        },
      ],
    },
  ]

  const MyResponsiveLine = ({ data }) => (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Month',
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Amount (in ₹)',
        legendOffset: -40,
        legendPosition: 'middle',
      }}
      pointSize={7}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      colors={{ scheme: 'purple_orange' }}
      curve="natural"
      enableSlices="x"
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
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
          <div
            style={{ height: '400px', width: '1000px', overflow: 'hidden' }}
          >
            <MyResponsiveLine data={lineData} />
          </div>
        </Box>
      </Box>
    </>
  )
}

export default NivoLine
