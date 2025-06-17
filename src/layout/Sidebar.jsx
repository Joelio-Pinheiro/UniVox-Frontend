import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ThemeButton from '../layout/ThemeButton';
import IconButton from '@mui/material/IconButton';
import { MdMenuOpen } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { MdPerson, MdQuestionAnswer, MdSettings, MdTopic } from "react-icons/md";



const Sidebar = ({ toggleDrawer }) => {
  return (
    <Box sx={{ width: 250 }} role="presentation" className="!flex !flex-col !h-full !justify-between">

      <List className='flex flex-col h-full gap-6'>
        {/* Icon from close sidebar*/}
        <div className="flex items-center h-16 px-7">
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(false)}>
            <MdMenuOpen className="text-5xl text-black" />
          </IconButton>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col gap-1 px-4">
          <div className="relative w-full mb-5">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              <MdSearch className="text-xl" />
            </span>
            <input
              type="text"
              placeholder="Pesquisar..."
              className="w-full pl-10 pr-4 py-2 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* List of items in the sidebar */}
          <ListItem disablePadding>
            <ListItemButton className='flex items-center gap-3'>
                <MdPerson className="text-xl" />
              <ListItemText primary="Perfil" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton className='flex items-center gap-3'>
                <MdTopic className="text-xl" />
              <ListItemText primary="Tópicos" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton className='flex items-center gap-3'>
                <MdQuestionAnswer className="text-xl" />
              <ListItemText primary="FAQ" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton className='flex items-center gap-3'>
                <MdSettings className="text-xl" />
              <ListItemText primary="Configurações" />
            </ListItemButton>
          </ListItem>
        </div>
      </List>

      {/* Button Light/Dark Theme */}
      <Box className="flex justify-end items-center h-16">
        <ThemeButton />
      </Box>
    </Box>
  );
};

export default Sidebar;
