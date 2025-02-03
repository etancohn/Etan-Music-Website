import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from "@mui/icons-material/Instagram"

export default function MenuAppBar() {
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  // const [open, setOpen] = React.useState(false);

  // const toggleDrawer = (newOpen: boolean) => () => {
  //   setOpen(newOpen);
  // };

  // const DrawerList = (
  //   <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
  //     <List>
  //       {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
  //         <ListItem key={text} disablePadding>
  //           <ListItemButton>
  //             <ListItemIcon>
  //               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //             </ListItemIcon>
  //             <ListItemText primary={text} />
  //           </ListItemButton>
  //         </ListItem>
  //       ))}
  //     </List>
  //     <Divider />
  //     <List>
  //       {['All mail', 'Trash', 'Spam'].map((text, index) => (
  //         <ListItem key={text} disablePadding>
  //           <ListItemButton>
  //             <ListItemIcon>
  //               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //             </ListItemIcon>
  //             <ListItemText primary={text} />
  //           </ListItemButton>
  //         </ListItem>
  //       ))}
  //     </List>
  //   </Box>
  // );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ boxShadow: 'none' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-evenly'}}>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton> */}
          {/* <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer> */}
          {/* <Typography variant="h6" 
              // component="div" 
              // sx={{ flexGrow: 1 }}
          >
            Etan Cohn
          </Typography> */}
          <div style={{ display: 'flex', columnGap: '1rem', flex: 1, justifyContent: 'flex-end' }}>
          <div
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <IconButton 
                size='medium'
            >
                <InstagramIcon 
                    style={{ color: 'gray', fontSize: '1.5rem' }}
                >
                </InstagramIcon>
            </IconButton>
            {/* <a href={'#'} target="_blank" rel="noopener noreferrer"> */}
            <div style={{ color: 'gray' }}>@etan_drums</div>
            {/* </a> */}
          </div>
          
          <div
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <IconButton 
                size='medium'
            >
                <EmailIcon 
                    style={{ color: 'gray', fontSize: '1.5rem' }}
                >
                </EmailIcon>
            </IconButton>
            {/* <a href={'#'} target="_blank" rel="noopener noreferrer"> */}
            <div style={{ color: 'gray' }}>etan.cohn@gmail.com</div>
            {/* </a> */}
          </div>
          </div>
          {(
            <div>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}