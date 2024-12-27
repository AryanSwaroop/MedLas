import {createContext} from 'react';

const MessageContext = createContext({
    message: "",
    setMessage: (message: string) => {}
});