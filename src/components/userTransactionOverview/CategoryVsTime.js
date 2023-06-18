import {React, useState, useEffect} from 'react'
import { ResponsiveLine } from '@nivo/line'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import {yearlyCatVsAmt} from '../../services/userServices'

const NivoLine = () => {
  const [lineData, setLineData] = useState([])

  useEffect(() => {
    const func = async () => {
      await yearlyCatVsAmt().then((res) => {
        console.log(res.data.data.lineData)
        setLineData(res.data.data.lineData)
      })
    }
    func()
  }, [])

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
      colors={{ scheme: 'blue_green' }}
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
