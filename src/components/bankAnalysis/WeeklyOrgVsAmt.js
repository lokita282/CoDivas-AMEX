import { React, useState, useEffect} from 'react'
import { ResponsiveRadialBar } from '@nivo/radial-bar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { weeklyCatVsOrg } from '../../services/bankServices'


const NivoRadialBar = () => {
  const [radialBarData, setRadialBarData] = useState([])

  useEffect(() => {
    const func = async () => {
      await weeklyCatVsOrg().then((res) => {
        console.log(res.data.data.barData)
        setRadialBarData(res.data.data.barData)
      })
    }
    func()
  }, [])

  const MyResponsiveRadialBar = ({ data /* see data tab */ }) => (
    <ResponsiveRadialBar
      data={data}
      valueFormat=">-.2f"
      padding={0.4}
      endAngle={290}
      cornerRadius={2}
      margin={{ top: 40, right: 120, bottom: 40, left: 40 }}
      colors={{ scheme: 'blues' }}
      borderColor={{
        from: 'color',
        modifiers: [['darker', '1']],
      }}
      // tracksColor="#ffffff"
      radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
      circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
      legends={[
        {
          anchor: 'right',
          direction: 'column',
          justify: false,
          translateX: 80,
          translateY: 0,
          itemsSpacing: 6,
          itemDirection: 'left-to-right',
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: '#999',
          symbolSize: 18,
          symbolShape: 'square',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000',
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
            flexGrow: 1,
            overflow: 'auto',
          }}
        >
          <div style={{ height: '400px', width: '575px', overflow: 'hidden' }}>
            <MyResponsiveRadialBar data={radialBarData} />
          </div>
        </Box>
      </Box>
    </>
  )
}

export default NivoRadialBar

