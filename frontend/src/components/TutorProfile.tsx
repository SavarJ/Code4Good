import { Grid } from '@mui/material'
import React from 'react'


export const TutorProfile = (name : string, image : string, subjects : string, bio : string) => {
  return (
    <div>
        <Grid container spacing={2}>
  <Grid item xs={8}>
    <Item>xs=8</Item>
  </Grid>
  <Grid item xs={4}>
    <Item>xs=4</Item>
  </Grid>
  <Grid item xs={4}>
    <Item>xs=4</Item>
  </Grid>
  <Grid item xs={8}>
    <Item>xs=8</Item>
  </Grid>
</Grid>
    <img src = {image}></img>
    <p>Subjects: {subjects}</p>
    <p>Bio: {bio}</p>
    </div>
  )
}
