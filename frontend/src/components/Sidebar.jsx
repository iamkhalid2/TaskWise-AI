import React from 'react';
import UseAuthUser from '../hooks/UseAuthUser';
import UseChatHistory from '../hooks/UseChatHistory';
import { Link, useLocation } from 'react-router';
import { BotMessageSquare, MessageSquare, Plus, Clock } from 'lucide-react';

const Sidebar = () => {
    const { authUser } = UseAuthUser();
    const { chatHistory, isLoading } = UseChatHistory();
    const location = useLocation();
    const currentPath = location.pathname;

    // Parse chat history for display
    const historyItems = chatHistory?.responses || [];

    return (
        <aside className="w-64 bg-base-200 border-r border-base-300 flex flex-col sticky top-0 h-screen">
            {/* Logo Section */}
            <div className="p-4 border-b border-base-300">
                <Link to={'/'} className="flex items-center justify-start gap-3">
                    <BotMessageSquare className="size-7 text-primary" />
                    <span className="font-bold text-lg">TaskWise AI</span>
                </Link>
            </div>

            {/* New Chat Button */}
            <div className="p-3 border-b border-base-300">
                <Link
                    to={'/'}
                    className="btn btn-primary w-full gap-2 normal-case"
                    onClick={() => window.location.reload()} // Simple reload to start fresh chat
                >
                    <Plus className="size-5" />
                    <span>New Chat</span>
                </Link>
            </div>

            {/* Chat History */}
            <nav className="flex-1 overflow-y-auto p-3 space-y-2">
                <div className="text-xs font-semibold text-base-content/60 px-3 py-2 flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    <span>Recent Chats</span>
                </div>

                {isLoading ? (
                    <div className="space-y-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="skeleton h-12 w-full rounded-lg"></div>
                        ))}
                    </div>
                ) : historyItems.length === 0 ? (
                    <div className="text-center py-8 px-4">
                        <MessageSquare className="w-8 h-8 mx-auto text-base-content/30 mb-2" />
                        <p className="text-xs text-base-content/60">
                            No chat history yet
                        </p>
                    </div>
                ) : (
                    historyItems.slice(0, 20).map((item, index) => (
                        <div
                            key={index}
                            className="btn btn-ghost btn-sm justify-start w-full h-auto min-h-[3rem] whitespace-normal text-left px-3 py-2 normal-case"
                        >
                            <MessageSquare className="w-4 h-4 shrink-0 text-base-content/40" />
                            <span className="text-xs line-clamp-2 flex-1">
                                {item.prompt || 'Untitled chat'}
                            </span>
                        </div>
                    ))
                )}
            </nav>

            {/* User Info at Bottom */}
            <div className="p-3 border-t border-base-300">
                <div className="flex items-center gap-3 px-3 py-2 bg-base-300 rounded-lg">
                    <div className="avatar placeholder">
                        <div className="bg-primary text-primary-content rounded-full w-8 h-8 text-xs">
                            {authUser?.username?.[0]?.toUpperCase() || 'U'}
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">
                            {authUser?.username || 'User'}
                        </p>
                        <p className="text-xs text-base-content/60 truncate">
                            {authUser?.email}
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;