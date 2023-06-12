import React from 'react'
import { useParams } from 'react-router'
import schemearray from './scheme.json'
import { useState } from 'react'
import { useEffect } from 'react'
import { Box, CardContent, List, ListItem, Typography } from '@mui/material'
import { bold_name, card, ptag } from '../../theme/CssMy'

export default function SchemeDetails() {
    const params = useParams()
    const id = params.id
    const [dets, setDets] = useState(null)

    useEffect(() => {
        setDets(schemearray.find((dc) => dc.id === parseInt(id)));
    }, [id]);

    console.log(dets, id)

    return (
        <>
            {
                dets && <Box sx={{ padding: '0% 20%' }}>
                    <p style={ptag}>{dets.by}</p>
                    <Typography sx={bold_name} variant='h5'>{dets.name}</Typography>

                    <CardContent sx={{ ...card, marginTop: '5%', padding:'4%', paddingBottom:'5%', marginBottom:'5%' }}>
                        <Typography sx={{ ...bold_name }}>Details</Typography>
                        <p style={{ ...ptag }}>{dets.Details}</p>
                    </CardContent>

                    <CardContent sx={{ ...card, marginTop: '5%', padding:'4%', paddingBottom:'5%', marginBottom:'5%' }}>
                        <Typography sx={{ ...bold_name }}>Benefits</Typography>
                        <List>
                        {
                            dets.Benefits.map((ben, i) => {
                                return <ListItem><p key ={i} style={{ ...ptag }}><b>{i+1}.</b> &nbsp; {ben}</p></ListItem>
                            })
                        }
                        </List>
                        
                    </CardContent>
                    <CardContent sx={{ ...card, marginTop: '5%', padding:'4%', paddingBottom:'5%', marginBottom:'5%' }}>
                        <Typography sx={{ ...bold_name }}>Eligibility</Typography>
                        <List>
                        {
                            dets.Eligibility.map((ben, i) => {
                                return <ListItem><p key ={i} style={{ ...ptag }}><b>{i+1}.</b> &nbsp; {ben}</p></ListItem>
                            })
                        }
                        </List>
                        
                    </CardContent>
                    <CardContent sx={{ ...card, marginTop: '5%', padding:'4%', paddingBottom:'5%', marginBottom:'5%' }}>
                        <Typography sx={{ ...bold_name }}>Application Process</Typography>
                        <List>
                        {
                            dets.Application_Process.map((ben, i) => {
                                return <ListItem><p key ={i} style={{ ...ptag }}><b>{i+1}.</b> &nbsp; {ben}</p></ListItem>
                            })
                        }
                        </List>
                        
                    </CardContent>
                    <CardContent sx={{ ...card, marginTop: '5%', padding:'4%', paddingBottom:'5%', marginBottom:'5%' }}>
                        <Typography sx={{ ...bold_name }}>Documents</Typography>
                        <List>
                        {
                            dets.documents.map((ben, i) => {
                                return <ListItem><p key ={i} style={{ ...ptag }}><b>{i+1}.</b> &nbsp; {ben}</p></ListItem>
                            })
                        }
                        </List>
                        
                    </CardContent>
                </Box>
            }
        </>
    )
}
