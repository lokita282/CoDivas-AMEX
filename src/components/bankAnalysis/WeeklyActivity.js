import {React, useEffect, useState} from 'react'
import { ResponsiveBar } from '@nivo/bar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import {weeklyCatVsAmt} from '../../services/bankServices'

const NivoBar = () => {
  const [barData, setBarData] = useState([])

  useEffect(() => {
    const func = async () => {
      await weeklyCatVsAmt().then((res) => {
        console.log(res.data.data.barData)
        setBarData(res.data.data.barData)
      })
    }
    func()
  }, [])

  const MyResponsiveBar = ({ data }) => (
    <ResponsiveBar
      data={data}
      keys={[
        'health',
        'agriculture',
        'housing',
        'telecommunication',
        'education',
        'food',
        'transportation',
        'utility',
        'other',
      ]}
      indexBy="day"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'blues' }}
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
        legend: 'Day',
        legendPosition: 'middle',
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Amount (in ₹)',
        legendPosition: 'middle',
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: 'color',
        modifiers: [['darker', 3]],
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
            flexGrow: 1,
            overflow: 'auto',
          }}
        >
          <div
            style={{ height: '400px', width: '750px', overflow: 'hidden' }}
          >
            <MyResponsiveBar data={barData} />
          </div>
        </Box>
      </Box>
    </>
  )
}

export default NivoBar
