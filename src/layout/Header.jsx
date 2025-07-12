import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import { MdMenuOpen } from "react-icons/md";
import UnivoxFullIcon from '../assets/UnivoxFullIcon.png';
import UnivoxIcon from '../assets/UnivoxIcon.png';
import Sidebar from './Sidebar';
import BasicMenu from './ProfileField';
import { MdSearch } from "react-icons/md";
import { TextField, InputAdornment } from '@mui/material';
import { FaBell } from "react-icons/fa";
import Box from '@mui/material/Box';


const Header = ({isMobile}) => {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    return (
        <>
            <div>
                <AppBar position='static' className=" !bg-white !border-b !border-gray-200 shadow-md" elevation={0}>
                    <Toolbar className="flex justify-between items-center px-3 sm:px-6 py-2 sm:py-4">
                        {isMobile ? (

                            <div className="flex items-center">
                                <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)} className="p-1 sm:p-2">
                                    <MdMenuOpen className="text-3xl sm:text-4xl text-black" />
                                </IconButton>

                                <Box className="flex items-center justify-center">
                                    <img
                                        src={UnivoxIcon}
                                        alt="Univox Logo"
                                        className="h-10 sm:h-10 md:h-14 object-contain"
                                    />
                                </Box>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center">
                                <img
                                    src={UnivoxFullIcon}
                                    alt="Univox Logo"
                                    className="h-10 sm:h-10 md:h-14 object-contain"
                                />
                            </div>

                        )}


                        <div className="flex justify-center items-center w-2/5">
                            <TextField
                                type="text"
                                size={isMobile ? "small" : "medium"}
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
                        <div className='flex items-center gap-1 '>
                            <IconButton className="p-1 sm:p-2">
                                <FaBell className='text-2xl sm:text-3xl text-black' />
                            </IconButton>
                            <BasicMenu />
                        </div>
                    </Toolbar>
                </AppBar>
                {isMobile ? (
                    <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                        <Sidebar isMobile={true} toggleDrawer={toggleDrawer} />
                    </Drawer>
                ) : (
                    <div className="fixed left-0 h-full w-64 bg-white shadow-md z-10 border-t-0">
                        <Sidebar isMobile={false} />
                    </div>
                )}

            </div>
        </>
    );
};

export default Header;
