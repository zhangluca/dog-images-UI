import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ChatHistory.css';

function ChatHistory() {
    const [chatHistory, setChatHistory] = useState([]);

    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                const response = await axios.get('https://dog-images-2fa748890e13.herokuapp.com/chat_history');
                setChatHistory(response.data);
            } catch (err) {
                console.error('Error fetching chat history:', err);
            }
        };

        fetchChatHistory();
    });

    return (
        <div className="chat-history">
            <h1>5 most recent Chat History</h1>
            {chatHistory.length > 0 ? (
                
                chatHistory.slice(-5).reverse().map((chat) => (
                    <div key={chat.id} className="chat-item">
                        <div>
                            <strong>Input Number:</strong> {chat.input_number}
                        </div>
                        <div>
                            <strong>Is Valid:</strong> {chat.is_valid ? 'Yes' : 'No'}
                        </div>
                        <div>
                            <strong>Execution Time:</strong> {chat.execution_time}
                        </div>
                    </div>
                ))
            ) : (
                <p>No chat history available</p>
            )}
        </div>
    );
}


export default ChatHistory;