import {React, useState, useEffect} from 'react'
import { ResponsivePie } from '@nivo/pie'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import {categoryPie} from '../../services/userServices'

const NivoPie = () => {
  const [pieData, setPieData] = useState([])
  
  useEffect(() => {
   const func = async () => {
     await categoryPie().then((res) => {
       console.log(res.data.data.expenditureData)
       setPieData(res.data.data.expenditureData)
     })
   }
   func()
  }, [])
  

  const MyResponsivePie = ({ data }) => (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeInnerRadiusOffset={5}
      activeOuterRadiusOffset={8}
      colors={{ scheme: 'green_blue' }}
      borderWidth={1}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [['darker', 2]],
      }}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: 'ruby',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'c',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'go',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'python',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'Health',
          },
          id: 'lines',
        },
        {
          match: {
            id: 'lisp',
          },
          id: 'lines',
        },
        {
          match: {
            id: 'elixir',
          },
          id: 'lines',
        },
        {
          match: {
            id: 'javascript',
          },
          id: 'lines',
        },
      ]}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: 60,
          itemsSpacing: 0,
          itemWidth: 60,
          itemHeight: 18,
          itemTextColor: '#999',
          itemDirection: 'top-to-bottom',
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: 'circle',
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
            // backgroundColor: (theme) =>
            //   theme.palette.mode === 'light'
            //     ? theme.palette.grey[100]
            //     : theme.palette.grey[900],
            flexGrow: 1,
            overflow: 'auto',
          }}
        >
          <div
            style={{
              height: '350px',
              overflow: 'hidden',
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              verticalAlign: 'middle',
              backgroundColor: '#fff',
              padding: '5%',
              boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.21)'
            }}
          >
            <MyResponsivePie data={pieData} />
          </div>
        </Box>
      </Box>
    </>
  )
}

export default NivoPie
