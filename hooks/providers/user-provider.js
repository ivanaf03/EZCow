import React from 'react';

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);

    const login = (data) => {
        setUser(data);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );  
};

export default UserProvider;

export const useUser = () => React.useContext(UserContext);