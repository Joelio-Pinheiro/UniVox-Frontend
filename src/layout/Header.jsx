import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import { MdMenuOpen } from "react-icons/md";
import UnivoxFullIcon from '../assets/UnivoxFullIcon.png';
import UnivoxIcon from '../assets/UnivoxIcon.png';
import Sidebar from './Sidebar';
import { MdSearch } from "react-icons/md";
import BasicMenu from './ProfileField';
import { TextField, InputAdornment } from '@mui/material';
import { FaBell } from "react-icons/fa";
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";


const Header = ({ isMobile }) => {
    const isAuthenticated = localStorage.getItem("user_data") !== null;
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const navigate = useNavigate();


    return (
        <>
            <AppBar position="static" className=" !bg-white !border-b !border-gray-200" elevation={1}>
                <Toolbar className="flex justify-between sm:px-6 py-2 sm:py-4 w-full min-w-0 overflow-x-hidden">
                    {isMobile ? (
                        <div className="flex items-center">
                            <IconButton
                                edge="start"
                                onClick={() => setDrawerOpen(true)}
                                size="large"
                                className="text-gray-700"
                            >
                                <MdMenuOpen />
                            </IconButton>
                            <Box className="flex items-center justify-center"
                                onClick={() => navigate('/')}>
                                <img
                                    src={UnivoxIcon}
                                    alt="Univox Logo"
                                    className="h-10 sm:h-10 md:h-14 object-contain"
                                />
                            </Box>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center cursor-pointer"
                            onClick={() => navigate('/')}>
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
                    {isAuthenticated ? (
                        <div className='flex items-center gap-1 '>
                            <IconButton className="p-1 sm:p-2">
                                <FaBell className='text-2xl sm:text-3xl text-black' />
                            </IconButton>
                            <BasicMenu />
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate("/login")}
                            className="text-md sm:text-base px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                        >
                            Entrar
                        </button>
                    )}
                </Toolbar>
            </AppBar>

            {isMobile && (
                <Drawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                >
                    <div className="w-64 px-4">
                        <Sidebar isMobile={true} onClose={() => setDrawerOpen(false)} />
                    </div>
                </Drawer>
            )}
        </>
    );
};

export default Header;
