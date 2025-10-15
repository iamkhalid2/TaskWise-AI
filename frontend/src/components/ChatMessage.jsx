import React from 'react';
import { Bot, User } from 'lucide-react';

const ChatMessage = ({ message, isUser }) => {
    if (isUser) {
        return (
            <div className="flex justify-end gap-3 mb-6">
                <div className="max-w-[70%] bg-primary text-primary-content rounded-2xl rounded-tr-sm px-4 py-3">
                    <p className="text-sm whitespace-pre-wrap">{message}</p>
                </div>
                <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-8 h-8">
                        <User className="w-5 h-5" />
                    </div>
                </div>
            </div>
        );
    }

    // AI response with dual outputs
    return (
        <div className="flex justify-start gap-3 mb-6">
            <div className="avatar placeholder">
                <div className="bg-primary text-primary-content rounded-full w-8 h-8">
                    <Bot className="w-5 h-5" />
                </div>
            </div>
            <div className="max-w-[85%] space-y-3">
                {message}
            </div>
        </div>
    );
};

export default ChatMessage;
