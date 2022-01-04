import React, { useState } from 'react';
import Chaincode from '../components/forms/Chaincode';
import strings from '../strings';

/**
 * Render chaincodes page
 *
 * @returns JSX
 */
function Chaincodes({ identities }: { identities: Array<string> }) {
    const [message, setMessage] = useState('');

    return (
        <div className="p-4">
            <h2 className="p-4 text-xl ml-2">
                {strings.headerChaincodes}
            </h2>
            <Chaincode
                identities={identities}
                onSubmitted={(msg: string) => setMessage(msg)}
            />
            {message !== '' && <p className="p-4 mb-8">{message}</p>}
        </div>
    );
}

export default Chaincodes;
