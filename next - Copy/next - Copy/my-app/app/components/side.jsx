"use client"
import React, { useState } from 'react';

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const sidebarItems = [
    { label: 'Dashboard', submenu: ['Item 1', 'Item 2', 'Item 3'] },
    { label: 'Analytics', submenu: ['Analytic A', 'Analytic  B', 'Analytic  C'] },
    { label: 'Reports', submenu: ['Report 1', 'Report 2', 'Report 3'] },
    { label: 'Settings', submenu: ['Setting A', 'Setting B', 'Setting C'] },
  ];

  return (
    <div className="bg-gray-800 text-white w-64 h-screen fixed">
      <div className="px-4 py-6">
        <h2 className="text-xl font-semibold">Sidebar</h2>
        <ul className="mt-6">
          {sidebarItems.map((item, index) => (
            <li key={index} className="mb-2">
              <a
                href="#"
                className="block py-2 px-4 rounded hover:bg-gray-700"
                onClick={() => toggleMenu(item.label)}
              >
                {item.label}
              </a>
              {activeMenu === item.label && (
                <ul className="ml-2 mt-2">
                  {item.submenu.map((subItem, subIndex) => (
                    <li key={subIndex} className="mb-2">
                      <a
                        href="#"
                        className="block py-2 px-4 rounded hover:bg-gray-700"
                      >
                        {subItem}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
