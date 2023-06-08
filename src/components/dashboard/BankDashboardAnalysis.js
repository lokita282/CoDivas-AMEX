import React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import WeeklyActivity from '../bankAnalysis/WeeklyActivity'
import MonthwiseAnalysis from '../bankAnalysis/MonthwiseAnalysis'
import TrendingAssets from '../bankAnalysis/TrendingAssets'
import CategoryAnalysis from '../bankAnalysis/CategoryAnalysis'

export default function BankDashboard() {
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <Paper>
              <WeeklyActivity />
            </Paper>
          </Grid>
          <Grid item xs={5}>
            <Paper>
              <MonthwiseAnalysis />
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper>
              <TrendingAssets />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>
              <CategoryAnalysis />
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
}
