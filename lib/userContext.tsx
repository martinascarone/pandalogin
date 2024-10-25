// context/UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import dbConnect from '../lib/dbConnect';
import User from '../models/User';

interface UserContextType {
    user: any; // Replace 'any' with a more specific type if you define a user interface
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, password: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null); // Replace 'any' with the user type

    const login = async (username: string, password: string) => {
        await dbConnect();
        const foundUser = await User.findOne({ username, password }); // Use hashed passwords in production
        if (foundUser) {
            setUser(foundUser);
            // Additional logic for login success (e.g., redirect, session management)
        } else {
            throw new Error('Invalid username or password');
        }
    };

    const register = async (username: string, password: string) => {
        await dbConnect();
        const newUser = new User({ username, password }); // Hash password in production
        await newUser.save();
        setUser(newUser);
    };

    return (
        <UserContext.Provider value={{ user, login, register }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};