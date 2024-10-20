import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Dashboard from './Dashboard';
import NotesSidePage from './NotesSidePage';
import PreviousYearQuestionPaper from './PreviousYearQuestionPaper';
import Department from './Department';
import Subject from './Subject';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

export default function SideBar() {
    const [menuData, setMenuData] = useState("Add Food") 
    const navigate = useNavigate()
    
    useEffect(() => {
        setMenuData("Dashboard")
    }, [])
    const handleLogout = () => {
        const token = localStorage.getItem('accessToken')
        dispatch(logout(token, navigate));
    }
    return (
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar 
        position="fixed" 
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        style={{ backgroundColor: 'black' , color: 'white', fontWeight: 'bold'}}
        >
            <Toolbar>
            <Typography variant="h6" noWrap component="div">
                NoteStack Admin
            </Typography>

            <button
            onClick={() => handleLogout()}
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-auto'
            >
                Logout
            </button>
            </Toolbar>
        </AppBar>
        <Drawer
            variant="permanent"
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
            <List>
                {['Dashboard', 'Notes', 'Question Paper', 'Department', 'Subject'].map((text, index) => (
                <ListItem 
                key={text} 
                disablePadding
                onClick = {() => setMenuData(text)}
                >
                    <ListItemButton>
                    <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
                ))}
            </List>
            </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
            {menuData === "Dashboard" && <Dashboard />}
            {menuData === "Notes" && <NotesSidePage />}
            {menuData === "Question Paper" && <PreviousYearQuestionPaper />}
            {menuData === "Department" && <Department />}
            {menuData === "Subject" && <Subject />}
        </Box>
        </Box>
    );
}
