import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {Avatar, Tooltip} from "@mui/material";
import Divider from '@mui/material/Divider'
import Modals from "./Header/Modal";
import Popovers from "./Header/Popover";

export default function Header() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);

    const isUserMenuOpen = Boolean(anchorElUser);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            sx={{mt: '45px'}}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Избранное</MenuItem>
            <MenuItem onClick={handleMenuClose}>Мероприятия</MenuItem>
        </Menu>
    );

    const renderSettings = (
        <Menu
            sx={{mt: '45px'}}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            open={isUserMenuOpen}
            onClose={handleCloseUserMenu}
        >
            <MenuItem>
                <Box>
                    <Typography variant="button" display="block" gutterBottom sx={{mr: 1}}>
                        UserName
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                        email
                    </Typography>
                </Box>
            </MenuItem>

            <Divider/>

            <MenuItem onClick={handleCloseUserMenu}>
                <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                    <Avatar sx={{width: 25, height: 25, mr: 3}}/>
                </Box>
                <Box>
                    <Typography sx={{mr: 2}}>
                        Profile
                    </Typography>
                </Box>
            </MenuItem>

            <Divider/>

            <MenuItem onClick={handleCloseUserMenu}> Выход</MenuItem>
        </Menu>
    );

    return (
        <Box sx={{flexGrow: 1, borderBottom: 2}}>
            <AppBar style={{background: "#fdfff5"}} position="static">
                <Toolbar>

                    <Tooltip title="Open menu">
                        <IconButton
                            onClick={handleProfileMenuOpen}
                            size="large"
                            edge="start"
                            style={{color: "black"}}
                            aria-label="open drawer"
                            sx={{mr: 2}}
                        >
                            <MenuIcon sx={{fontSize: 32}}/>
                        </IconButton>
                    </Tooltip>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        style={{color: "black"}}
                        sx={{display: {xs: 'none', sm: 'block'}}}
                    >
                        Events map
                    </Typography>

                    <Box sx={{flexGrow: 1}}/>
                    <Box sx={{display: {xs: 'none', md: 'flex'}}}>

                        <Modals/>

                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 2}}>
                                <AccountCircle sx={{fontSize: 35}}/>
                            </IconButton>
                        </Tooltip>

                        <Popovers/>

                    </Box>
                </Toolbar>
            </AppBar>
            {renderSettings}
            {renderMenu}
        </Box>
    );
}