import React from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

export default AuthContext;