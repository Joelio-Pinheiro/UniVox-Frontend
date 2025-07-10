import React from 'react';
import Header from './Header';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const MainLayout = ({ children }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <>
            <Header isMobile={isMobile} />
            <div
                className={`p-4 transition-all duration-300 ease-in-out ${!isMobile ? 'ml-64' : ''
                    }`}
            >
                {children}
            </div>
        </>
    );
};

export default MainLayout;
