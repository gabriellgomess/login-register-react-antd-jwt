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
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuGroup,
    MenuItem,
    MenuDivider,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import './Nav.css';
import LogoHorizontal from '../assets/logo/logo_horizontal.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGears, faArrowRightFromBracket, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';


const Nav = () => {
    const { logout, user } = useAuth();
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const pages = [
        { path: "/chamados", label: "Chamados" },
        { path: "/abertura-chamado", label: "Abertura de Chamado" },
    ];

    return (
        <div className="nav-container">
            <nav className="nav-layout-desktop">
                <div className='nav-layout-desktop-logo'>
                    <img width={250} src={LogoHorizontal} alt="Logo" />
                </div>
                <div className='nav-layout-desktop-message'>
                    <Text mr={4} display={{ base: 'none', md: 'none', lg: 'block' }}>
                        Olá {user.info.nome}, seja bem-vindo ao sistema de chamados
                    </Text>
                </div>
                <div className='nav-layout-desktop-menu'>
                    {pages.map((page, index) => (
                        <Link key={index} to={page.path}>{page.label} </Link>
                    ))}
                    <Menu>
                        <MenuButton as={Button}>
                            Gestão <FontAwesomeIcon icon={faEllipsisVertical} />
                        </MenuButton>
                        <MenuList>
                            <Text fontSize='sm' p={2}>{user.info.nome}</Text>
                            <MenuGroup title='Perfil'>
                                <MenuItem>Meus dados</MenuItem>
                            </MenuGroup>
                            <MenuDivider />
                            <MenuGroup title='Ajustes'>
                                <Link to='/configuracoes'>
                                    <MenuItem>Configurações</MenuItem>
                                </Link>
                            </MenuGroup>
                            <MenuDivider />
                            <MenuGroup title='Ajuda'>
                                <MenuItem>Docs</MenuItem>
                                <MenuItem>FAQ</MenuItem>
                            </MenuGroup>
                            <MenuDivider />
                            <MenuItem onClick={() => { logout(); }}>
                                <Text fontSize='sm'>Logout <FontAwesomeIcon icon={faArrowRightFromBracket} /></Text>
                            </MenuItem>
                        </MenuList>
                    </Menu>
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
                                <Text mb={4}>Olá {user.info.nome}, seja bem vindo ao sistema de chamados</Text>
                                <Divider />
                                {pages.map((page, index) => (
                                    <React.Fragment key={index}>
                                        <Link to={page.path} onClick={onClose}>{page.label}</Link>
                                        <Divider />
                                    </React.Fragment>
                                ))}
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
