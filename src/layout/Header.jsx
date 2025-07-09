import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import { MdMenuOpen } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import UnivoxFullIcon from '../icons/UnivoxFullIcon.png';
import Sidebar from './Sidebar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { MdSearch } from "react-icons/md";
import { TextField, InputAdornment } from '@mui/material';
import { FaBell } from "react-icons/fa";

const Header = () => {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    return (
        <>
            {isMobile ? (
                <div>
                    <AppBar position='static' className="!shadow-sm !bg-white" elevation={0}>
                        <Toolbar className="flex justify-between items-center px-3 sm:px-6 py-2 sm:py-4">

                            <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)} className="p-1 sm:p-2">
                                <MdMenuOpen className="text-3xl sm:text-4xl text-black" />
                            </IconButton>

                            <div className="flex items-center justify-center">
                                <img
                                    src={UnivoxFullIcon}
                                    alt="Univox Logo"
                                    className="h-10 sm:h-10 md:h-14 object-contain"
                                />
                            </div>

                            <IconButton className="p-1 sm:p-2">
                                <IoIosSearch className="text-2xl sm:text-3xl text-black" />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                        <Sidebar toggleDrawer={toggleDrawer} />
                    </Drawer>
                </div>
            ) : (
                <div>
                    <AppBar position='static' className=" !bg-white !border-b !border-gray-200 shadow-md" elevation={0}>
                        <Toolbar className="flex justify-between items-center px-3 sm:px-6 py-2 sm:py-4">

                            <div className="flex items-center justify-center">
                                <img
                                    src={UnivoxFullIcon}
                                    alt="Univox Logo"
                                    className="h-10 sm:h-10 md:h-14 object-contain"
                                />
                            </div>

                            <div className="flex justify-center items-center w-2/5">
                                <TextField
                                    type="text"
                                    placeholder="Pesquisar..."
                                    variant="outlined"
                                    fullWidth
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <MdSearch className="text-gray-500 text-xl" />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                    className="bg-white !shadow-sm"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '100px',
                                        },
                                    }}
                                />
                            </div>

                            <IconButton className="p-1 sm:p-2">
                                {/* <IoIosSearch className="text-2xl sm:text-3xl text-black" /> */}
                                <FaBell className='text-2xl sm:text-3xl text-black' />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <div className="hidden md:block fixed left-0 h-full w-64 bg-white shadow-md z-10 border-t-0">
                        <Sidebar />
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;