import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import Learners from './Learners';
// import ReportedUsers from './ReportedUsers';
// import BlockedUsers from './BlockedUsers';
import { signout } from '../../../store/Actions/user';
import { useNavigate } from 'react-router-dom';
import Image from '../../../utils/assets/trans-logo.png';
import ResourcePersons from './ResourcePersons';
import OfferedCourses from './OfferedCourses';
import { useApolloClient } from '@apollo/client';
import { LOGIN_CREDENTIALS } from '../../../gql/gqlQueries';
import CoursesApproval from './CoursesApproval';
import Dashboard from './Dashboard';

const drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),

    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const user = useSelector(state => state.user.user);
    console.log(user, "aaaaaaa")
    const [selectedPage, setSelectedPage] = React.useState('Dashboard');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const client = useApolloClient();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
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
        navigate('/')
    }

    return (
        <Box sx={{ display: 'flex' }}>
            {/* <CssBaseline /> */}
            <AppBar position="fixed" open={open} style={{ background: 'linear-gradient(107deg, #1c65c6 82%, #e9851d 72%)', color: 'white' }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                        style={{ width: '8vh' }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Admin Panel
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                PaperProps={{
                    sx: {
                        background: 'linear-gradient(0deg, rgba(28, 101, 198, 0.3) 32%, rgba(233, 133, 29, 0.3)52%)', color: 'rgb(0,0,28)'
                    }
                }}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
                autoWidth={false}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <br />
                <div style={{ alignSelf: 'center', justifyContent: 'center', textAlign: 'center', display: "flex", alignItems: 'center', width: "100%", }}>
                    <Avatar style={{ backgroundColor: 'rgb(0,60,164,.8)', width: '10vh', height: '10vh', border: '10px solid darkorange' }} />
                </div>
                <div style={{ alignSelf: 'center', justifyContent: 'center', textAlign: 'center', display: "flex", alignItems: 'center', width: "100%", }}>
                    <h2 style={{ justifyContent: 'center', textAlign: 'center', width: '80%' }}>{user.email}</h2>
                </div>
                <Divider />
                <br />
                <List style={{}}>
                    {['Dashboard', 'Learners', 'Resource Persons', 'Courses Approval', 'Offered Courses', 'Log Out'].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={() => setSelectedPage(text)}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {text === "Log Out" ? <InboxIcon color='primary' /> : <MailIcon color='primary' />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <div style={{ marginTop: '53%' }}>
                        <img src={Image} alt="logo" width="90%" />
                    </div>
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                {
                    selectedPage === 'Dashboard' && <Dashboard />
                }
                {
                    selectedPage === 'Learners' && <Learners />
                }
                {
                    selectedPage === 'Resource Persons' && <ResourcePersons />
                    // <ReportedUsers />
                }
                {
                    selectedPage === 'Offered Courses' && <OfferedCourses />
                    // <BlockedUsers />
                }
                {
                    selectedPage === 'Courses Approval' && <CoursesApproval />
                    // <BlockedUsers />
                }
                {
                    selectedPage === 'Log Out' && logout()
                }
            </Main>
        </Box>
    );
}
