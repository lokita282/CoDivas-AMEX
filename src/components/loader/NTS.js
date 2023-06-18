import React from 'react'
import giphy2 from '../../images/nts.gif'
import { ptag } from '../../theme/CssMy'

export default function NTS() {
    return (
        <>
            <img src={giphy2} style={{ width: '200px' }} />
            <p style={{...ptag, margin:'0', padding:'0'}}>Nothing to show</p>
        </>
    )
}
