import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket ,  { ReadyState }from 'react-use-websocket';

const useWebSocketHook = (socketUrl) => {
    const [messageHistory, setMessageHistory] = useState([]);
    const [readyState, setReadyState] = useState(ReadyState.CLOSED); // Initial state

    const { sendMessage, lastMessage } = useWebSocket(socketUrl, {
        onOpen: () => setReadyState(ReadyState.OPEN),
        onClose: () => setReadyState(ReadyState.CLOSED),
        onError: (error) => console.error('Error:', error),
        shouldReconnect: () => true,
        reconnectInterval: 5000,
        share: true
    });

    // State for the message to be sent
    const [inputMessage, setInputMessage] = useState('');

    useEffect(() => {
        if (lastMessage !== null) {
            setMessageHistory((prev) => [...prev, {
                message: lastMessage.data,
                time: new Date().toLocaleTimeString(),
                type: 'received'
            }]);
        }
    }, [lastMessage]);



    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Connected',
        [ReadyState.CLOSING]: 'Disconnecting',
        [ReadyState.CLOSED]: 'Disconnected'
    }[readyState];

    const isLoading = readyState === ReadyState.CONNECTING; // Indicate loading

    return {
        messages: messageHistory,
        connectionStatus,
        isLoading,
    };
};

export default useWebSocketHook;