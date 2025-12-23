import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/themeSlice';

const ICONS = {
    dashboard: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
    ),
    users: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    ),
    settings: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    ),
    clients: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
    ),
    schedule: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
    ),
    workouts: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    ),
    profile: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    ),
    menu: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    )
};

const MainLayout = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const dispatch = useDispatch();
    const currentTheme = useSelector((state) => state.theme.currentTheme);

    // Helper to determine page title based on path
    const getPageTitle = () => {
        const path = location.pathname.split('/').pop();
        if (!path) return 'Dashboard';
        return path.charAt(0).toUpperCase() + path.slice(1);
    };

    const getNavItems = () => {
        switch (user?.role) {
            case 'admin':
                return [
                    { to: '/admin/dashboard', label: 'Dashboard', key: 'dashboard', icon: ICONS.dashboard },
                    { to: '/admin/users', label: 'Users', key: 'users', icon: ICONS.users },
                    { to: '/admin/settings', label: 'Settings', key: 'settings', icon: ICONS.settings },
                ];
            case 'trainer':
                return [
                    { to: '/trainer/dashboard', label: 'Dashboard', key: 'dashboard', icon: ICONS.dashboard },
                    { to: '/trainer/clients', label: 'My Clients', key: 'clients', icon: ICONS.clients },
                    { to: '/trainer/schedule', label: 'Schedule', key: 'schedule', icon: ICONS.schedule },
                ];
            case 'member':
                return [
                    { to: '/member/dashboard', label: 'Dashboard', key: 'dashboard', icon: ICONS.dashboard },
                    { to: '/member/workouts', label: 'Workouts', key: 'workouts', icon: ICONS.workouts },
                    { to: '/member/profile', label: 'Profile', key: 'profile', icon: ICONS.profile },
                ];
            default:
                return [];
        }
    };

    const navItems = getNavItems();

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col bg-base-200 min-h-screen">
                {/* Common Header / Navbar */}
                <div className="navbar bg-base-100 shadow-sm sticky top-0 z-10 px-4">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost drawer-button">
                            {ICONS.menu}
                        </label>
                    </div>
                    <div className="flex-1">
                        <h1 className="text-xl font-semibold px-2">{getPageTitle()}</h1>
                    </div>
                    <div className="flex-none gap-2">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar placeholder">
                                <div className="bg-neutral text-neutral-content rounded-full w-10">
                                    <span className="text-xl">{user?.name?.charAt(0)}</span>
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                <li className="menu-title">Logged in as {user?.role}</li>
                                <li><a>Profile</a></li>
                                <li><a onClick={logout}>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Main Page Content */}
                <main className="p-6 flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>

            {/* Sidebar */}
            <div className="drawer-side z-20 is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-100 text-base-content transition-[width] duration-300 ease-in-out is-drawer-close:w-14 is-drawer-open:w-64 overflow-hidden border-r border-base-300">
                    {/* Sidebar Header - Collapses/Expands */}
                    <div className="h-16 flex items-center justify-center w-full border-b border-base-300">
                        {/* Logo Icon - Always visible */}
                        <div className="w-8 h-8 rounded bg-primary flex-shrink-0"></div>
                        {/* Text Logo - Hidden when closed */}
                        <span className="ml-2 text-xl font-bold whitespace-nowrap is-drawer-close:hidden">RJ Fitness</span>
                    </div>

                    {/* Nav Links */}
                    <ul className="menu w-full p-2 gap-1 flex-1">
                        {navItems.map((item) => (
                            <li key={item.to}>
                                <Link
                                    to={item.to}
                                    className={`truncate ${location.pathname.includes(item.key) ? 'active' : ''} is-drawer-close:tooltip is-drawer-close:tooltip-right flex-nowrap`}
                                    data-tip={item.label}
                                >
                                    {/* Icon */}
                                    <span className="flex-shrink-0">
                                        {item.icon}
                                    </span>
                                    {/* Label */}
                                    <span className="is-drawer-close:hidden whitespace-nowrap">
                                        {item.label}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Theme Toggle */}
                    <div className="p-2 w-full border-t border-base-300">
                        <button
                            onClick={() => dispatch(toggleTheme())}
                            className="btn btn-ghost w-full justify-start px-2 is-drawer-close:justify-center is-drawer-close:px-0 is-drawer-close:tooltip is-drawer-close:tooltip-right flex-nowrap overflow-hidden"
                            data-tip={currentTheme === 'light' ? 'Dark Mode' : 'Light Mode'}
                        >
                            <span className="flex-shrink-0">
                                {currentTheme === 'light' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                )}
                            </span>
                            <span className="ml-2 is-drawer-close:hidden whitespace-nowrap">
                                {currentTheme === 'light' ? 'Dark Mode' : 'Light Mode'}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
