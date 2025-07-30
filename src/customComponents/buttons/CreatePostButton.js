import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

export default function FloatingActionButtons() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 30,
        right: 30,
        zIndex: 1000,
      }}
    >
      <Fab color="primary"
        aria-label="add"
        onClick={() => navigate("/create-post")}>
        <AddIcon />
      </Fab>
    </Box>
  );
}
