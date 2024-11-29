import React from "react";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Badge from "@mui/material/Badge";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { makeStyles } from "@mui/styles"; // Correct import
import SideDrawer from "./SideDrawer";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  tagline: {
    fontSize: 20,
    textTransform: "uppercase",
    justifyContent: "center",
    fontFamily: "Montserrat",
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <>
      <Toolbar>
        <SideDrawer>
          {" "}
          <IconButton>
            <MenuIcon />
          </IconButton>
        </SideDrawer>

        <Typography variant="h6" component="h2" className={classes.title}>
          Blogging Website
        </Typography>
        <Badge badgeContent={4} color="primary">
          <NotificationsActiveIcon style={{ color: "gray" }} />
        </Badge>
        <IconButton>
          <AccountCircle />
        </IconButton>
      </Toolbar>
      <Divider />
      <Toolbar className={classes.tagline}>
        Express your emotions through words
      </Toolbar>
    </>
  );
};

export default Header;

// import React from 'react';
// import IconButton from '@mui/material/IconButton';
// import Divider from '@mui/material/Divider';
// import Toolbar from '@mui/material/Toolbar';
// import MenuIcon from '@mui/icons-material/Menu';
// import Typography from '@mui/material/Typography';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import Badge from '@mui/material/Badge';
// import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
// import { styled } from '@mui/material/styles';

// const TitleTypography = styled(Typography)({
//   color: 'blue',
//   fontWeight: 'bold',
//   flexGrow: 1,
// });

// const Header = () => {
//   return (
//     <>
//       <Toolbar>
//         <IconButton>
//           <MenuIcon />
//         </IconButton>
//         <TitleTypography variant="h6" component="h2" style={{ flexGrow: 1 }}>
//           Blogging Website
//         </TitleTypography>
//         <Badge badgeContent={4} color="primary">
//           <NotificationsActiveIcon style={{ color: 'gray' }} />
//         </Badge>
//         <IconButton>
//           <AccountCircle />
//         </IconButton>
//       </Toolbar>
//       <Divider />
//       <Toolbar>
//         Express your emotions through words
//       </Toolbar>
//     </>
//   );
// };

// export default Header;
