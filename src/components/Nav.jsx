import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth';
import { Button } from 'antd';

const Nav = () => {
  const { logout } = useAuth();

  return (
    <nav>
      <ul>
        <li><Link to="/page1">Chamados</Link></li>
        <li><Link to="/page2">Abertura de Chamado</Link></li>
        <li>
          <Button type="primary" onClick={logout}>
            Logout
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
