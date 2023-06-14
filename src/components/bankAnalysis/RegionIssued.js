import { React, useState, useEffect } from 'react'
import { VectorMap } from 'react-jvectormap'
import { styled } from '@mui/material/styles'
import { Tooltip, tooltipClasses } from '@mui/material'
import { regionIssued } from '../../services/bankServices'

const states = {
  'IN-BR': 'Bihar',
  'IN-PY': 'Puducherry',
  'IN-DD': 'Daman and Diu',
  'IN-DN': 'Dadra and Nagar Haveli',
  'IN-DL': 'Delhi',
  'IN-NL': 'Nagaland',
  'IN-WB': 'West Bengal',
  'IN-HR': 'Haryana',
  'IN-HP': ' Himachal Pradesh',
  'IN-AS': 'Assam',
  'IN-UT': 'Uttaranchal',
  'IN-JH': 'Jharkhand',
  'IN-JK': 'Jammu and Kashmir',
  'IN-UP': ' Uttar Pradesh',
  'IN-SK': 'Sikkim',
  'IN-MZ': 'Mizoram',
  'IN-CT': 'Chhattisgarh',
  'IN-CH': 'Chandigarh',
  'IN-GA': 'Goa',
  'IN-GJ': 'Gujarat',
  'IN-RJ': 'Rajasthan',
  'IN-MP': 'Madhya Pradesh',
  'IN-OR': 'Orissa',
  'IN-TN': 'Tamil Nadu',
  'IN-AN': 'Andaman and Nicobar',
  'IN-AP': 'Andhra Pradesh',
  'IN-TR': 'Tripura',
  'IN-AR': ' Arunachal Pradesh',
  'IN-KA': 'Karnataka',
  'IN-PB': 'Punjab',
  'IN-ML': 'Meghalaya',
  'IN-MN': 'Manipur',
  'IN-MH': 'Maharashtra',
  'IN-KL': 'Kerala',
}

const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 120,
  },
})

const RegionIssued = () => {
  const [tooltipContent, setTooltipContent] = useState('')
  const [mapData, setMapData] = useState([])

  const getData = (key) => {
    const countryData = {}
    mapData.forEach((obj) => {
      countryData[obj.code] = obj.value
    })
    return countryData[key]
  }

  const handleLocationMouseOver = (e, el, code) => {
    console.log(el)
    setTooltipContent(`${states[el]}, ${getData(el)} vouchers issued`)
  }

  const handleLocationMouseOut = () => {
    setTooltipContent('')
  }

  useEffect(() => {
    const func = async () => {
      await regionIssued().then((res) => {
        console.log(res.data.data.mapData)
        setMapData(res.data.data.mapData)
      })
    }
    func()
  }, [])

  return (
    <CustomWidthTooltip title={tooltipContent} placement="right-start">
      <div className="indiaMap" style={{ width: '500px', height: '500px' }}>
        <VectorMap
          map="in_mill"
          backgroundColor="transparent"
          containerStyle={{
            width: '100%',
            height: '100%',
          }}
          onRegionOver={handleLocationMouseOver}
          onRegionOut={handleLocationMouseOut}
          containerClassName="map"
          regionStyle={{
            initial: {
              fill: '#e4e4e4',
              'fill-opacity': 0.9,
              stroke: 'none',
              'stroke-width': 0,
              'stroke-opacity': 0,
            },
            hover: {
              'fill-opacity': 0.8,
              cursor: 'pointer',
              fill: '#2F3659',
            },
            selected: {
              fill: '#000',
            },
          }}
          regionsSelectable={true}
          series={{
            regions: [
              {
                values: mapData.reduce((obj, item) => {
                  obj[item.code] = item.value
                  return obj
                }, {}),
                scale: ['#C8EEFF', '#0071A4'],
                normalizeFunction: 'polynomial',
              },
            ],
          }}
        />
      </div>
    </CustomWidthTooltip>
  )
}

export default RegionIssued
