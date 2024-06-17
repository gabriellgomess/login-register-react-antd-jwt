import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth';
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Box,
    Text,
    Divider,
    IconButton
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import './Nav.css';

const Nav = () => {
    const { logout, user } = useAuth();
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    return (
        <div className="nav-container">
            <nav className="nav-layout-desktop">
                <div className='nav-layout-desktop-logo'>
                    LOGO
                </div>
                <div className='nav-layout-desktop-message'>
                    <Text mr={4}>Olá {user.info.name}, seja bem vindo ao sistema de chamados</Text>
                </div>

                <div className='nav-layout-desktop-menu'>
                    <Link to="/page1">Chamados</Link>
                    <Link to="/page2">Abertura de Chamado</Link>
                    <Button onClick={logout}>
                        Logout
                    </Button>
                </div>
            </nav>
            <nav className="mobile-nav">
                <IconButton
                    icon={<HamburgerIcon />}
                    onClick={showDrawer}
                    aria-label="Open menu"
                />
                <Drawer isOpen={visible} placement="right" onClose={onClose}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Menu</DrawerHeader>
                        <DrawerBody>
                            <Box className='nav-layout-mobile-menu'>
                                <Text mb={4}>Olá {user.info.name}, seja bem vindo ao sistema de chamados</Text>
                                <Divider />
                                <Link to="/page1" onClick={onClose}>Chamados</Link>
                                <Divider />
                                <Link to="/page2" onClick={onClose}>Abertura de Chamado</Link>
                                <Divider />
                                <Button onClick={() => { logout(); onClose(); }}>
                                    Logout
                                </Button>
                            </Box>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </nav>
        </div>
    );
};

export default Nav;
