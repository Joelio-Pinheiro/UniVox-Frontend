import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import { MdMenuOpen, MdExpandLess, MdExpandMore, MdQuestionAnswer } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isMobile, onClose }) => {
  const [openTopics, setOpenTopics] = React.useState(true);
  const navigate = useNavigate();

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
            <ListItemButton key={idx} className="pl-6 gap-3"
            onClick={() => navigate(`/topic/${item.name.replace('r/', '')}`)}>
              <Avatar alt={item.name} src={item.avatar} sx={{ width: 24, height: 24 }} />
              <ListItemText primary={item.name} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
  return (
    <nav className="flex flex-col px-2 text-gray-800">
      <List>
      {isMobile && (
          <div className="flex items-center h-16 px-4">
            <IconButton edge="start" onClick={onClose}>
              <MdMenuOpen className="text-3xl text-black" />
            </IconButton>
          </div>
        )}
        <ListItem disablePadding>
          <ListItemButton className="flex items-center gap-3 w-full h-12"
          onClick={() => navigate('/')}>
            <div className="w-6 flex justify-center">
              <FaHome className="text-xl" />
            </div>
            <ListItemText primary="Tela Inicial" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton className="flex items-center gap-3 w-full h-12"
          onClick={() => navigate('/faq')}>
            <div className="w-6 flex justify-center">
              <MdQuestionAnswer className="text-xl" />
            </div>
            <ListItemText primary="FAQ" />
          </ListItemButton>
        </ListItem>
        <Divider sx={{ my: 1 }} />
        {renderSection("Tópicos", openTopics, setOpenTopics, topics)}
      </List>
    </nav>
  );
};

export default Sidebar;
