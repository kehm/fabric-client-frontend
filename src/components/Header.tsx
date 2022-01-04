import React from 'react';
import strings from '../strings';

/**
 * Render header
 *
 * @returns JSX
 */
function Header() {
    return (
        <header className="bg-black text-white p-4">
            <h1 className="text-3xl">
                {strings.appName}
            </h1>
        </header>
    );
}

export default Header;
