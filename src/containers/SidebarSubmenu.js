import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function SidebarSubmenu({ submenu, name, icon }) {
    const location = useLocation();
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();
    /** Open Submenu list if path found in routes, this is for directly loading submenu routes first time */
    useEffect(() => {
        if (submenu.filter(m => m.path === location.pathname)[0]) setIsExpanded(true);
    }, [submenu, location.pathname]);

    function redirect (){
        setIsExpanded(!isExpanded)
        console.log("here")
        
            navigate('/admin/charts');
       
    }
    return (
        <div className="flex flex-col">
            {/** Route header */}
            <div className="w-full block group flex items-center" onClick={() => redirect()}>
          {icon}
                <span className="ml-2">{name}</span>
                <ChevronDownIcon
                    className={
                        'w-5 h-5 mt-1 float-right delay-400 duration-500 transition-all ' +
                        (isExpanded ? 'rotate-180' : '')
                    }
                />
               
            </div>

            {/** Submenu list */}
            <div className={`w-full ${isExpanded ? '' : 'hidden'}`}>
                <ul className="menu menu-compact">
                    {submenu.map((m, k) => {
                        const isActive = location.pathname === m.path; // Check if the current path matches
                        return (
                            <li key={k}>
                                <Link
                                    to={m.path}
                                    className={isActive ? 'bg-primary text-white' : ''} // Apply active styles when the path matches
                                >
                                    {m.icon} {m.name}
                                    {isActive && (
                                        <span
                                            className="absolute mt-1 mb-1 inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary"
                                            aria-hidden="true"
                                        ></span>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default SidebarSubmenu;
