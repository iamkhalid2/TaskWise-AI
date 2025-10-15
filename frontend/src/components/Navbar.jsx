import React from 'react';
import { Link, useNavigate } from 'react-router';
import UseAuthUser from '../hooks/UseAuthUser';
import { User, CreditCard, LogOut, Settings } from 'lucide-react';
import { DEMO_MODE } from '../libs/mockData';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { authUser } = UseAuthUser();
    const navigate = useNavigate();
    
    const handleLogout = () => {
        if (DEMO_MODE) {
            localStorage.removeItem('demo_logged_in');
            toast.success('Logged out successfully');
            navigate('/landing');
            window.location.reload(); // Force reload to clear state
        }
        // Add real logout logic when backend is ready
    };

    return (
        <div className="navbar bg-base-100 border-b border-base-300 px-4 sticky top-0 z-50">
            <div className="flex-1">
                <span className="text-xl font-bold text-primary">TaskWise AI</span>
            </div>

            <div className="flex-none gap-2">
                {/* Credits Display */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-base-200 rounded-lg">
                    <CreditCard className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold">{authUser?.credits || 0}</span>
                    <span className="text-xs text-base-content/60">credits</span>
                </div>

                {/* User Dropdown */}
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                            {authUser?.profilePic ? (
                                <img src={authUser.profilePic} alt="profile" />
                            ) : (
                                <User className="w-5 h-5" />
                            )}
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="mt-3 z-[1] p-2 shadow-lg menu menu-sm dropdown-content bg-base-200 rounded-box w-52 border border-base-300"
                    >
                        <li className="menu-title">
                            <span className="text-xs">{authUser?.email}</span>
                        </li>
                        <li>
                            <Link to="/profile" className="flex gap-2">
                                <Settings className="w-4 h-4" />
                                Profile Settings
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile" className="flex gap-2">
                                <CreditCard className="w-4 h-4" />
                                Buy Credits
                            </Link>
                        </li>
                        <li>
                            <a onClick={handleLogout} className="flex gap-2 text-error cursor-pointer">
                                <LogOut className="w-4 h-4" />
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;