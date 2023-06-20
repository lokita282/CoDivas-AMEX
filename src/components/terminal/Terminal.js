import { React, useState, useEffect } from 'react'
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui'
import moment from 'moment/moment'
import { getActivityLog } from '../../services/userServices'
import Loader from '../loader/Loading'

const TerminalController = (props = {}) => {
  const [terminalLineData, setTerminalLineData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      await getActivityLog().then((res) => {
        console.log('data')
        console.log(res.data.data.logs)
        setTerminalLineData(res.data.data.logs)
      })
    }
    const interval = setInterval(() => {
      fetchData()
    }, 5000)

    return () => {
      console.log(interval)
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      {terminalLineData[0] ? (<div
      className="container"
      style={{
        overflow: 'hidden',
        width: '1350px',
        padding: '20px',
        '&::-webkit-scrollbar': {
          height: 10,
          width: 5,
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'white',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#d5d5d5',
          borderRadius: 2,
        },
      }}  
    ><Terminal
        name="Activity Logs"
        colorMode={ColorMode.Dark}
        // hidden="400px"
        style={{ overflow: 'hidden', backgroundColor: '#000' }}
      >
        {terminalLineData.map((log) => {
          return (
            <>
              <TerminalOutput>
                {log.createdAt ? (
                  <>
                    >>>
                    {moment(log.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                  </>
                ) : (
                  <>>>> --</>
                )}
              </TerminalOutput>
              <TerminalOutput>User IP: {log.userIPAddress}</TerminalOutput>
              <TerminalOutput>User agent: {log.userAgent}</TerminalOutput>
              <TerminalOutput>
                Voucher ID: {log.voucherUid ? log.voucherUid : 'nil'}
              </TerminalOutput>
              <TerminalOutput>Activity: {log.body}</TerminalOutput>
              <TerminalOutput></TerminalOutput>
            </>
          )
        })}
      </Terminal></div>):  (<div
      className="container"
      style={{
        overflow: 'hidden',
        width: '1350px',
        padding: '20px',
        '&::-webkit-scrollbar': {
          height: 10,
          width: 5,
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'white',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#d5d5d5',
          borderRadius: 2,
        },
      }}  
    ><Loader /></div>)}
    </>
  )
}

export default TerminalController
