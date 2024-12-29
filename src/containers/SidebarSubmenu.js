import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function SidebarSubmenu({ submenu, name, icon }) {
    const location = useLocation();
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();

    const sidebarButtonClass = `
        group flex items-center space-x-3 py-3 px-4 rounded-md border 
        shadow-sm transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    `;

    useEffect(() => {
        if (submenu.some((m) => m.path === location.pathname)) {
            setIsExpanded(true);
        } else {
            setIsExpanded(false);
        }
    }, [submenu, location.pathname]);

    function redirect() {
        setIsExpanded(!isExpanded);
        navigate('/admin/Livecharts');
    }

    return (
        <div className="flex flex-col">
            <div
                className={`${sidebarButtonClass} ${
                    isExpanded
                        ? "bg-blue-500 text-white font-bold border-blue-500"
                        : "bg-white text-gray-800 border-gray-300 hover:bg-blue-100 hover:border-blue-500 hover:text-blue-600"
                }`}
                onClick={() => redirect()}
            >
                {icon}
                <span className="text-md font-medium">{name}</span>
                <ChevronDownIcon
                    className={`w-5 h-5 ml-auto transform transition-transform duration-500 ${
                        isExpanded ? "rotate-180" : ""
                    }`}
                />
            </div>

            {isExpanded && (
                <ul className="menu menu-compact bg-white rounded-md mt-1 shadow-sm border border-gray-300">
                    {submenu.map((m, k) => {
                        const isActive = location.pathname === m.path;
                        return (
                            <li key={k}>
                                <Link
                                    to={m.path}
                                    className={`${sidebarButtonClass} ${
                                        isActive
                                            ? "bg-blue-500 text-white font-bold border-blue-500"
                                            : "bg-white text-gray-800 border-gray-300 hover:bg-blue-100 hover:border-blue-500 hover:text-blue-600"
                                    }`}
                                >
                                    <span>{m.icon}</span>
                                    <span className="text-md font-medium">{m.name}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}


export default SidebarSubmenu;
