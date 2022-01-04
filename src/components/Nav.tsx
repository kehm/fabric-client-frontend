import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import strings from '../strings';

/**
 * Render navigation
 *
 * @returns JSX
 */
function Nav() {
    const [selected, setSelected] = useState(0);

    /**
     * Set selected nav element based on URL path
     */
    useEffect(() => {
        if (window.location.pathname === '/chaincodes') {
            setSelected(1);
        } else setSelected(0);
    }, [window.location.pathname]);

    return (
        <nav className="bg-black pb-2">
            <ul className="flex text-2xl text-white ml-8">
                <li className={classNames('cursor-pointer', 'hover:text-blue-400', { 'text-blue-400': selected === 0 })}>
                    <Link
                        to="/identities"
                        onClick={() => setSelected(0)}
                    >
                        {strings.navIdentities}
                    </Link>
                </li>
                <li className={classNames('ml-10', 'cursor-pointer', 'hover:text-blue-400', { 'text-blue-400': selected === 1 })}>
                    <Link
                        to="/chaincodes"
                        onClick={() => setSelected(1)}
                    >
                        {strings.navChaincodes}
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;
