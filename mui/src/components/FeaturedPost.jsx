import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import React from 'react';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  title: {
    fontSize: 40,
    fontFamily: "Montserrat",
  },
  cover: {
    backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwUnlLfLm43e03n-C50NYZ3jrht7tQCMAeMg&s)',
    backgroundPosition: "center",
    backgroundSize: "cover", 
    padding: "35px 25px",
    color: "white", 
  },
});

const FeaturedPost = () => {
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.cover}>
        <CardContent>
          <Typography className={classes.title}>
            Title of a longer featured blog post
          </Typography>
          <Typography variant="h5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse in libero ducimus non cum nulla
            blanditiis quibusdam dolorem accusamus eum!
          </Typography>
        </CardContent>
        <CardActions>
          <Button className={classes.btn} style={{ color: 'white' }}>Read More</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default FeaturedPost;

