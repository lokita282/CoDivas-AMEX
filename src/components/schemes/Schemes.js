import React, { useEffect, useState } from 'react'
import schemearray from './scheme.json'
import { Box, CardContent, Chip, InputAdornment, TextField, Typography } from '@mui/material'
import { bold_name, card, ptag, textField } from '../../theme/CssMy'
import { Icon } from '@iconify/react'
import FuzzySearch from 'fuzzy-search'
import { useNavigate } from 'react-router'

export default function Schemes() {
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const [showSch, setShowSch] = useState(schemearray)
    console.log(schemearray)
    const searcher = new FuzzySearch(schemearray, ['name', 'tags'], {
        caseSensitive: false,
    });

    useEffect(() => {
        const res = searcher.search(search)
        setShowSch(res)
        console.log(res)
    }, [search])

    function highlightSearchWord(text, searchWord) {
        // Escape special characters in the search word
        const escapedSearchWord = searchWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        // Create a regular expression with the escaped search word
        const regex = new RegExp(`(${escapedSearchWord})`, 'gi');

        // Replace the matched search word with a highlighted version
        const highlightedText = text.replace(regex, '<span class="highlighted">$1</span>');

        return highlightedText;
    }

    return (
        <Box sx={{ padding: '0% 20%' }}>
            <TextField value={search} sx={textField} InputProps={{
                endAdornment: <InputAdornment position="end"><Icon icon="ic:round-search" width={22} height={22} /></InputAdornment>,
            }} placeholder='Search schemes' onChange={(e) => setSearch(e.target.value)} />
            {
                showSch.map((sc, i) => {
                    return <CardContent onClick={() => navigate(`/scheme/${sc.id}`)} sx={{ ...card, cursor:'pointer', height: 'auto', marginBottom: '3%', paddingBottom: '1%' }}>
                        <p style={ptag}>{sc.by}</p>
                        {search ? (
                            <Typography
                                sx={bold_name}
                                dangerouslySetInnerHTML={{
                                    __html: highlightSearchWord(sc.name, search)
                                }}
                            />
                        ) : <Typography sx={bold_name}> {sc.name}</Typography>}
                        <p style={{ ...ptag, marginTop: '2%', marginBottom: '2%' }}>{sc.Details.slice(0, 200)}...</p>
                        {
                            sc.tags.map((ta, i) => {
                                return <Chip
                                    label={search ? (
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: highlightSearchWord(ta, search)
                                            }}
                                        />
                                    ) : (
                                        ta
                                    )}
                                    size='small'
                                    key={i}
                                    sx={{ marginRight: '1%', marginBottom: '1%' }}
                                />
                            })
                        }
                    </CardContent>
                })
            }
        </Box>
    )
}
