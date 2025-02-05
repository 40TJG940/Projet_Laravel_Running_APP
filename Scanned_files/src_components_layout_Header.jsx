import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/Button';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md px-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Running App</h1>
        <div className="flex items-center gap-4">
          <span>{user?.name}</span>
          <Button onClick={logout} variant="outline" size="sm">Logout</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;