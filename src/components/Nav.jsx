import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth';
import { Button, Drawer, Typography, Divider } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
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
                    <Typography.Text style={{ marginRight: 16 }}>Olá {user.info.name}, seja bem vindo ao sistema de chamados</Typography.Text>
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
                <Button type="primary" icon={<MenuOutlined />} onClick={showDrawer} />
                <Drawer title="Menu" placement="right" closable={true} onClose={onClose} open={visible}>
                    <div className='nav-layout-mobile-menu'>
                        <Typography.Text style={{ marginBottom: 16 }}>Olá {user.info.name}, seja bem vindo ao sistema de chamados</Typography.Text>
                        <Divider />
                        <Link to="/page1" onClick={onClose}>Chamados</Link>
                        <Divider />
                        <Link to="/page2" onClick={onClose}>Abertura de Chamado</Link>
                        <Divider />
                        <Button onClick={() => { logout(); onClose(); }}>
                            Logout
                        </Button>
                    </div>

                </Drawer>
            </nav>
        </div>
    );
};

export default Nav;
