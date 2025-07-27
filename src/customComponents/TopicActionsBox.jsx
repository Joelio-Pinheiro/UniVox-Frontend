import React, { useState } from 'react';
import {
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
    Box,
    Menu,
    MenuItem,
    Avatar,
    Divider,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useAlert } from '../context/AlertContext';

export default function TopicActionsBox({ post, onEdit, onDelete }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openConfirm, setOpenConfirm] = useState(false);
    const { show } = useAlert();
    const open = Boolean(anchorEl);
    const userData = JSON.parse(localStorage.getItem("user_data"));
    const isAuthor = userData?.id === post.creator.id;

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`);
        show("success", "Link copiado para a área de transferência!");
        handleMenuClose();
    };


    const handleEdit = () => {
        handleMenuClose();
        onEdit(post);
    };

    const handleDelete = () => {
        handleMenuClose();
        setOpenConfirm(true);
    };

    const confirmDelete = () => {
        setOpenConfirm(false);
        onDelete(post.id);
    };

    return (
        <>
            {/* Botão do menu flutuante */}
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Ações">
                    <IconButton
                        onClick={handleMenuClick}
                        size="small"
                        aria-controls={open ? 'post-actions-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <MoreVertIcon />
                    </IconButton>
                </Tooltip>
            </Box>

            {/* Menu flutuante com ações */}
            <Menu
                anchorEl={anchorEl}
                id="post-actions-menu"
                open={open}
                onClose={handleMenuClose}
                PaperProps={{
                    elevation: 4,
                    sx: {
                        mt: 1.5,
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.25))',
                        '& .MuiAvatar-root': {
                            width: 28,
                            height: 28,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 16,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleCopyLink}>
                    <ListItemIcon><ContentCopyIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>Copiar link</ListItemText>
                </MenuItem>
                {isAuthor && (
                    <MenuItem onClick={handleEdit}>
                        <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
                        <ListItemText>Editar</ListItemText>
                    </MenuItem>
                )}
                {isAuthor && (<Divider />)}
                {isAuthor && (
                    <MenuItem onClick={handleDelete}>
                        <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
                        <ListItemText sx={{ color: 'error.main' }}>Deletar</ListItemText>
                    </MenuItem>
                )}

            </Menu>

            {/* Diálogo de confirmação de delete */}
            <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
                <DialogTitle>Tem certeza que deseja deletar este post?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setOpenConfirm(false)} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={confirmDelete} color="error">
                        Deletar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
