import React from 'react';
import clsx from 'clsx';

//import untuk material ui
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PartNumberIcon from '@material-ui/icons/WorkOutlineOutlined'
import HomeIcon from '@material-ui/icons/Home';
import UserIcon from '@material-ui/icons/Face';
import GRListIcon from '@material-ui/icons/Layers';
import ExitIcon from '@material-ui/icons/ExitToApp';

//import styles
import useStyles  from "./style.js";

//import react router dom
import { Route, Switch } from "react-router-dom";

//import komponent
import Users from './users/index.js';
import PartNumber from './partnumber/index.js';
import GRList from './gr/index.js'
import Gr from './gr/index.js';

export default function Private() {
  
    // basic dashboard
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


  return (
    <div className={classes.root}>
      
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            <Switch>
               {/* Buat Title */}
                <Route path="/users" children="Title Users" />
                <Route path="/partnumbers" children="Title Part Number" />
                <Route path="/gr" children="Title GR" />
                <Route children="Home"/>
            </Switch>
          </Typography>
          <IconButton color="inherit">
            {/* <Badge badgeContent={4} color="secondary"> */}
              {/* <NotificationsIcon /> */}
              <ExitIcon />
            {/* </Badge> */}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        {/* <Divider /> */}

        {/* Menu */}
        <List>
            {/* match dan history bagian dari route utk menandakan isi path */}
            <Route path="/" exact children={({match, history}) => {
                    return <ListItem
                    //Button start
                    button
                    selected = {match ? true : false}
                    // buat efek di tombol aktif

                    onClick={() => {
                        history.push('/')
                    // di click link ke "/" 
                    
                    //Button end
                    }}
                    >
                        <ListItemIcon>
                            <HomeIcon/> 
                            {/* ini mau gambar rumah */}
                        </ListItemIcon>
                        <ListItemText primary="Home"/>
                        {/* huruf Home di list item, sesudah gambar rumah */}
                            
                    </ListItem>
            }}
            
            />

            <Route path="/users" children={({match, history}) => {
                    return <ListItem
                    button
                    selected = {match ? true : false}
                    onClick={() => {
                        history.push('/users')
                    }}
                    >
                        <ListItemIcon>
                            <UserIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Users"/>
                    </ListItem>
            }}
            
            />

            <Route path="/partnumbers" children={({match, history}) => {
                    return <ListItem
                    button
                    selected = {match ? true : false}
                    onClick={() => {
                        history.push('/partnumbers')
                    }}
                    >
                        <ListItemIcon>
                            <PartNumberIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Part Number"/>
                    </ListItem>
            }}
            />

            <Route path="/grlist" children={({match, history}) => {
                    return <ListItem
                    button
                    selected = {match ? true : false}
                    onClick={() => {
                        history.push('/grlist')
                    }}
                    >
                        <ListItemIcon>
                            <GRListIcon/>
                        </ListItemIcon>
                        <ListItemText primary="GR List"/>
                    </ListItem>
            }}
            />

      </List>
      
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
       {/* Container = isi dari komponen yg di private (isi list menu) */}
        <Container maxWidth="lg" className={classes.container}>

            <Switch>
                <Route path="/users" component={Users} />
                <Route path="/partnumbers" component={PartNumber} />
                <Route path="/grlist" component={GRList} />
            </Switch>

        
       
        </Container>
      </main>
    </div>
  );
}






// import React from 'react'

// export default function Private() {
//     return (
//         <div>
//             <h1>Dashboard</h1>
//         </div>
//     )
// }
