import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ThemeButton from '../layout/ThemeButton';
import IconButton from '@mui/material/IconButton';
import { MdPerson, MdQuestionAnswer, MdSettings, MdTopic, MdMenuOpen } from "react-icons/md";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';



const Sidebar = ({ toggleDrawer }) => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    if (typeof toggleDrawer === 'function') {
      toggleDrawer(false)();
    }
  };

  return (
    <Box
      sx={
        { width: isMobile ? 250 : 260 }
      }
      role="presentation"
      className="flex flex-col h-full justify-between bg-white border-r border-gray-200 shadow-md"
    >

      {isMobile ? (
        <List className='flex flex-col h-full gap-6'>
          {/* Icon from close sidebar*/}
          <div className="flex items-center h-16 px-4">
            <IconButton edge="start" onClick={handleClose}>
              <MdMenuOpen className="text-3xl text-black" />
            </IconButton>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col gap-1 px-4">

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
                <ListItemText primary="Notificações" />
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
            <ListItem>
              {/* Button Light/Dark Theme */}
              <ListItemButton className='flex items-center gap-3'>
                <ThemeButton />
              </ListItemButton>
            </ListItem>
          </div>
        </List>
      ) : (
        <div className="flex flex-col gap-1 px-4">

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

          <ListItem>
            {/* Button Light/Dark Theme */}
            <ListItemButton className='flex items-center gap-3'>
              <ThemeButton />
            </ListItemButton>
          </ListItem>
        </div>
      )}
      <div>Sair</div>
    </Box>
  );
};

export default Sidebar;
