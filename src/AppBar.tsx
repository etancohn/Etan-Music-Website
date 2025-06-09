import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from "@mui/icons-material/Instagram"

export default function MenuAppBar() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ boxShadow: 'none' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-evenly'}}>
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