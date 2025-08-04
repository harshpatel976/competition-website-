import io from 'socket.io-client';

const socket = io('ws://localhost:5001');

export const subscribeToResults = (callback) => {
    socket.on('resultUpdate', callback);
    return () => socket.off('resultUpdate', callback);
};

export const subscribeToMedalTally = (callback) => {
    socket.on('medalTallyUpdate', callback);
    return () => socket.off('medalTallyUpdate', callback);
};