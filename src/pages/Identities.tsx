import React, { useState } from 'react';
import Identity from '../components/forms/Identity';
import strings from '../strings';

/**
 * Render identities page
 *
 * @returns JSX
 */
function Identities(
    {
        identities,
        onChangeIdentity,
    }:
        {
            identities: Array<string>
            onChangeIdentity: Function,
        },
) {
    const [message, setMessage] = useState('');

    return (
        <div className="p-4">
            <h2 className="p-4 text-xl ml-2">
                {strings.headerIdentities}
            </h2>
            <Identity
                identities={identities}
                onSubmitted={(msg: string) => {
                    setMessage(msg);
                    onChangeIdentity();
                }}
            />
            {message !== '' && <p className="p-4 mb-8">{message}</p>}
        </div>
    );
}

export default Identities;
