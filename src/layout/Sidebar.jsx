import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import { MdMenuOpen, MdExpandLess, MdExpandMore, MdQuestionAnswer } from "react-icons/md";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FaHome } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import ThemeButton from '../layout/ThemeButton';


const Sidebar = ({ toggleDrawer }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [openTopics, setOpenTopics] = React.useState(true);

  const handleClose = () => {
    if (typeof toggleDrawer === 'function') {
      toggleDrawer(false)();
    }
  };


  const topics = [
    { name: "r/anime", avatar: "/path/to/anime.jpg" },
    { name: "r/anime_irl", avatar: "/path/to/animeirl.jpg" },
    { name: "r/BaldursGate3", avatar: "/path/to/baldur.jpg" },
    { name: "r/books", avatar: "/path/to/books.jpg" },
    { name: "r/investimentos", avatar: "/path/to/invest.jpg" }
  ];

  const renderSection = (title, open, setOpen, items) => (
    <>
      <ListItemButton onClick={() => setOpen(!open)} className="text-gray-500">
        <ListItemText primary={title} />
        {open ? <MdExpandLess /> : <MdExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items.map((item, idx) => (
            <ListItemButton key={idx} className="pl-6 gap-3">
              <Avatar alt={item.name} src={item.avatar} sx={{ width: 24, height: 24 }} />
              <ListItemText primary={item.name} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );

  return (
    <Box
      sx={{ width: isMobile ? 250 : 260 }}
      className="flex flex-col h-full justify-between bg-white border-r border-gray-200 shadow-md"
    >
      <div>
        {isMobile && (
          <div className="flex items-center h-16 px-4">
            <IconButton edge="start" onClick={handleClose}>
              <MdMenuOpen className="text-3xl text-black" />
            </IconButton>
          </div>
        )}

        <List>
          <ListItem disablePadding>
            <ListItemButton className="flex items-center gap-3 w-full h-12">
              <div className="w-6 flex justify-center">
                <FaHome className="text-xl" />
              </div>
              <ListItemText primary="Tela Inicial" />
            </ListItemButton>
          </ListItem>

          {/* {isMobile && (
            <ListItem disablePadding>
              <ListItemButton className="flex items-center gap-3 w-full h-12">
                <div className="w-6 flex justify-center">
                  <FaBell className='text-xl text-black' />
                </div>
                <ListItemText primary="Notificações" />
              </ListItemButton>
            </ListItem>
          )} */}
          <ListItem disablePadding>
            <ListItemButton className="flex items-center gap-3 w-full h-12">
              <div className="w-6 flex justify-center">
                <MdQuestionAnswer className="text-xl" />
              </div>
              <ListItemText primary="FAQ" />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ my: 1 }} />
          {renderSection("Tópicos", openTopics, setOpenTopics, topics)}
        </List>

      </div>
    </Box>
  );
};

export default Sidebar;
