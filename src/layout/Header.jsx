import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import { MdMenuOpen } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import UnivoxFullIcon from '../icons/UnivoxFullIcon.png';
import Sidebar from './Sidebar';

const Header = () => {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    return (
        <>
            <AppBar position="static" className="shadow-sm h-20 md:h-24 !bg-white flex justify-center" >
                <Toolbar className="flex justify-between items-center px-4">

                    <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
                        <MdMenuOpen className="text-5xl text-black" />
                    </IconButton>

                    <div className="flex items-center">
                        <img
                            src={UnivoxFullIcon}
                            alt="Univox Logo"
                            className="h-12 md:h-16"
                        />
                    </div>

                    <IconButton color="inherit" className="relative text-gray-800">
                        <IoNotifications className="text-5xl text-black" />
                        <span className="absolute top-2 right-2 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500"></span>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                 <Sidebar toggleDrawer={toggleDrawer} />
            </Drawer>
        </>
    );
};

export default Header;