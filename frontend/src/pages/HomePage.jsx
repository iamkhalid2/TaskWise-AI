import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles } from 'lucide-react';
import UseDualAI from '../hooks/UseDualAI';
import ChatMessage from '../components/ChatMessage';
import DualOutput from '../components/DualOutput';
import UseAuthUser from '../hooks/UseAuthUser';

const HomePage = () => {
    const [prompt, setPrompt] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const { sendPrompt, isLoading, data, reset } = UseDualAI();
    const { authUser } = UseAuthUser();
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);

    // Auto-scroll to bottom when new messages arrive
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory, isLoading]);

    // Update chat history when data arrives
    useEffect(() => {
        if (data?.response) {
            setChatHistory((prev) => [
                ...prev,
                {
                    type: 'ai',
                    model1: data.response.model1,
                    model2: data.response.model2,
                    timestamp: new Date(),
                },
            ]);
            reset(); // Clear the mutation data
        }
    }, [data, reset]);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [prompt]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!prompt.trim() || isLoading) return;

        // Add user message to chat
        setChatHistory((prev) => [
            ...prev,
            {
                type: 'user',
                content: prompt,
                timestamp: new Date(),
            },
        ]);

        // Send to backend
        sendPrompt(prompt);
        setPrompt('');

        // Reset textarea height
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-base-100">
            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
                <div className="max-w-5xl mx-auto">
                    {chatHistory.length === 0 ? (
                        // Empty state
                        <div className="flex flex-col items-center justify-center h-full min-h-[60vh]">
                            <div className="text-center space-y-4">
                                <div className="flex items-center justify-center gap-2">
                                    <Sparkles className="w-12 h-12 text-primary animate-pulse" />
                                    <Sparkles className="w-12 h-12 text-secondary animate-pulse" />
                                </div>
                                <h1 className="text-4xl font-bold text-base-content">
                                    Dual AI Comparison
                                </h1>
                                <p className="text-lg text-base-content/60 max-w-md">
                                    Get responses from two different AI models simultaneously.
                                    Compare their outputs side by side.
                                </p>
                                <div className="flex gap-3 mt-6">
                                    <div className="badge badge-primary badge-lg">GPT-4o-mini</div>
                                    <div className="badge badge-secondary badge-lg">Claude 3.5 Sonnet</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Chat messages
                        chatHistory.map((message, index) => (
                            <ChatMessage
                                key={index}
                                message={
                                    message.type === 'user' ? (
                                        message.content
                                    ) : (
                                        <DualOutput
                                            model1Data={message.model1}
                                            model2Data={message.model2}
                                            isLoading={false}
                                        />
                                    )
                                }
                                isUser={message.type === 'user'}
                            />
                        ))
                    )}

                    {/* Loading state */}
                    {isLoading && (
                        <ChatMessage
                            message={<DualOutput isLoading={true} />}
                            isUser={false}
                        />
                    )}

                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input Area - Sticky at Bottom */}
            <div className="border-t border-base-300 bg-base-100 sticky bottom-0">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <form onSubmit={handleSubmit} className="relative">
                        <div className="flex items-end gap-2 bg-base-200 rounded-2xl border border-base-300 focus-within:border-primary transition-colors p-2">
                            <textarea
                                ref={textareaRef}
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask anything... (Shift+Enter for new line)"
                                className="textarea textarea-ghost w-full resize-none focus:outline-none min-h-[24px] max-h-[200px] bg-transparent text-base"
                                rows={1}
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={!prompt.trim() || isLoading}
                                className="btn btn-primary btn-circle btn-sm shrink-0"
                            >
                                {isLoading ? (
                                    <span className="loading loading-spinner loading-xs"></span>
                                ) : (
                                    <Send className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </form>
                    <p className="text-xs text-center text-base-content/40 mt-2">
                        Credits remaining: <span className="font-semibold">{authUser?.credits || 0}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;