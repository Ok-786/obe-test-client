import * as React from 'react';
// import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../../store/Actions/user';
import { useNavigate } from 'react-router-dom';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import CategoryIcon from '@mui/icons-material/Category';
import { useApolloClient } from '@apollo/client';
import { LOGIN_CREDENTIALS } from '../../../gql/gqlQueries';

export default function AvatarMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const client = useApolloClient();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    console.log('event.target')
    console.log(event.target)
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
    client.writeQuery({
      query: LOGIN_CREDENTIALS,
      data: {
        credentials: {
          token: null,
          user: null,
          __typename: 'Credentials',
        },
      },
      refetchQueries: [{ query: LOGIN_CREDENTIALS }],
    });
    navigate('/login');
  }

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 1 }}>
            <Avatar sx={{ width: 40, height: 38, backgroundColor: 'rgba(17, 22, 91, 0.5)' }} src={'#'} alt="Abdullah Makix" />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
      >

        {[
          <MenuItem style={{ width: '200px', }}
          key="1"
            onClick={() => {
              navigate(`/userprofile/${user.id}`, { state: { user, isOther: false } })
            }}
          >
            <Avatar src={'#'} alt="User" style={{}} /> My Profile
          </MenuItem>,
          // <Divider />,
          <MenuItem style={{}}
            key="2"
            >
            <ListItemIcon>
              <CategoryIcon fontSize="small" />
            </ListItemIcon>
            Comming Soon
          </MenuItem>,
          <MenuItem style={{}} onClick={() => { logout() }}
            key="3"
          >
            <ListItemIcon>
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            <span >Logout</span>
          </MenuItem>
        ]}
      </Menu>


    </div>
  );
}