import { makeStyles } from '@mui/styles'
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';
import React from 'react'
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Hidden from '@mui/material/Hidden';
import CardMedia from '@mui/material/CardMedia';
const useStyles=makeStyles({
    card:{
        display:'flex'
    },
    cardDetails:{
        flex:1
    },
    cardMedia:{
        width:160
    }
})

const PostCard = ({post}) => {
    const classes=useStyles;
  return (
    <div>
      <Grid item xs={12} md={6}>
      <CardActionArea component="a" href='#'>
      <Card className={classes.card}>
         <div className={classes.cardDetails}>
            <CardContent>
                <Typography component="h2" variant='h5'>
               {post.title}
                </Typography>

                <Typography variant="subtitle1" color='textSecondary'>
               {post.data}
                </Typography>

                <Typography variant="subtitle1"  paragraph>
               {post.description}
                </Typography>

                <Typography variant='subtitle1' style={{color:"skyblue"}}>
               Continue reading....
                </Typography>
            </CardContent>
         </div>
         <Hidden xsDown>
          <CardMedia  className={classes.cardMedia}
          image={post.image}
          title={post.imageTitle}
          />
         </Hidden>
      </Card>
      </CardActionArea>
      </Grid>
    </div>
  )
}


export default PostCard
