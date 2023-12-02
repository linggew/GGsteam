// Footer.jsx
import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
//comment
const Footer = () => {
  return (
    <div className='footer'>
      <AppBar position='static' color='primary'>
        <Toolbar>
          <Typography
            variant='body1'
            color='inherit'
            // style={{ position: 'fixed' }}
          >
            This is the footer of my React application.
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Footer;
