import {React, useState, useEffect} from 'react'
import { ResponsiveBar } from '@nivo/bar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { weeklyCatVsAmt } from '../../services/userServices'

const NivoBar = () => {
  const [barData, setBarData] = useState([])
  
  useEffect(() => {
    const func = async () => {
      await weeklyCatVsAmt().then((res) => {
        console.log(typeof(res.data.data.barData))
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
        'telecomm',
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
      colors={{ scheme: 'green_blue' }}
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
