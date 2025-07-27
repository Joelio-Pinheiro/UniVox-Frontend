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
import topicService from "../services/topicService";
import { useEffect, useState } from "react";

const Sidebar = ({ isMobile, onClose }) => {
  const [openTopics, setOpenTopics] = React.useState(true);
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const data = await topicService.getTopics();
        setTopics(data.slice(0, 10).map(topic => ({
          ...topic,
        })));
      } catch (error) {
        console.error("Erro ao carregar tópicos:", error);
      }
    };

    fetchTopics();
  }, []);



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
              <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>
                {item.name?.[1]?.toUpperCase() || "?"}
              </Avatar>
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
