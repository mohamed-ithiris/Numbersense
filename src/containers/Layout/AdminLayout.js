import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
// import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
// import CloseIcon from "@mui/icons-material/Close";
// import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import AddCommentIcon from "@mui/icons-material/AddComment";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
// import AllActions from "../../redux/ducks/actions"
import {
    // useDispatch, 
    useSelector
} from "react-redux";
import {
    Avatar,
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
// import { mainListItems, secondaryListItems } from './listItems';
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';
// import MenuList from './MenuList';
import {
    Redirect,
    Route,
    Switch,
    useHistory,
    useLocation,
    useRouteMatch,
} from "react-router-dom";
import { MENU } from "../../constants";
import ROUTES from "../../routes";
// import Dashboard from '../Dashboard/Dashboard';

// route config
const getUserRoutes = (routes) => {
    return routes.map((prop, key) => {
        if (prop.layout === "/admin") {
            console.log(prop.layout + prop.path)
            return (
                <Route
                    exact
                    path={prop.layout + prop.path}
                    component={prop.component}
                    key={key}
                />
            );
        } else {
            return null;
        }
    });
};

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();

export default function AdminLayout() {
    // const funllState = useSelector((state) => state.data);
    // Menu
    const history = useHistory(); //   HIstory
    const { url } = useRouteMatch(); //   Route
    const location = useLocation();
    const CurrentURL = location.pathname.split("/")[2];
    const [open, setOpen] = React.useState(true);
    // const dispatch = useDispatch(); // dispatch
    // const { count } = useSelector((state) => state.data);
    // console.log(count, "count");

    const toggleDrawer = () => {
        setOpen(!open);
    };
    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        {MENU.map((item, index) =>
                            item.layout === url ? (
                                <ListItem
                                    id={index}
                                    key={index}
                                    sx={{
                                        "&.MuiListItem-root": {
                                            background:
                                                item.menuURL === CurrentURL ? "#f9f4ff" : undefined,
                                            borderRadius: "12px",
                                            marginBottom: "6px",
                                        },
                                        "&.MuiListItem-root:hover": {
                                            background: "#f9f4ff",
                                        },
                                    }}
                                    button
                                    onClick={() => history.push(item.layout + "/" + item.menuURL)}
                                >
                                    <ListItemIcon>
                                        <Avatar
                                            sx={{
                                                background: "transparent",
                                                color: item.menuURL === CurrentURL ? "#0e1318" : "#000000",
                                            }}
                                        >
                                            {item.menuName === "Recent Activity" ? (
                                                <AddCommentIcon
                                                    sx={{
                                                        color:
                                                            item.menuURL === CurrentURL ? "#8d39fa" : "#0e1318",
                                                    }}
                                                />
                                            ) : item.menuName === "Manage Course" ? (
                                                <SchoolRoundedIcon
                                                    sx={{
                                                        color:
                                                            item.menuURL === CurrentURL ? "#8d39fa" : "#0e1318",
                                                    }}
                                                />
                                            ) : item.menuName === "Manage Folder" ? (
                                                <FolderOpenOutlinedIcon
                                                    sx={{
                                                        color:
                                                            item.menuURL === CurrentURL ? "#8d39fa" : "#0e1318",
                                                    }}
                                                />
                                            ) : item.menuName === "Manage Bot Creator" ? (
                                                <SmartToyOutlinedIcon
                                                    sx={{
                                                        color:
                                                            item.menuURL === CurrentURL ? "#8d39fa" : "#0e1318",
                                                    }}
                                                />
                                            ) : null}
                                        </Avatar>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.menuName}
                                        disableTypography
                                        sx={{
                                            color: item.menuURL === CurrentURL ? "#8d39fa" : "#0e1318",
                                            fontWeight: item.menuURL === CurrentURL ? 700 : undefined,
                                        }}
                                    />
                                </ListItem>
                            ) : null
                        )}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <AppBar position="relative">
                        <Toolbar>
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                sx={{ flexGrow: 1 }}
                            >
                                Dashboard
                            </Typography>
                            <IconButton color="inherit">
                                <Badge badgeContent={4} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    {/* <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}> */}
                        <Switch>
                            {getUserRoutes(ROUTES)}
                            <Redirect from="*" to="/admin/dashboard" />
                        </Switch>
                    {/* </Container> */}
                </Box>
            </Box>
        </ThemeProvider>
    );
}