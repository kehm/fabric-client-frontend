import axios from 'axios';
import env from '../types/env';

/**
 * Invoke the chaincode function
 *
 * @param identity Identity name
 * @param channel Channel name
 * @param chaincode Chaincode name
 * @param func Function name
 * @param args Function arguments
 * @returns Function response
 */
export const invoke = async (
    identity: string,
    channel: string,
    chaincode: string,
    func: string,
    args: string[],
) => {
    if (identity === '' || channel === '' || chaincode === '' || func === '') {
        throw new Error('Missing required parameter(s)');
    }
    const response = await axios.post(
        `${env.ClientUrl}/chaincodes/invoke`,
        {
            identity,
            channel,
            chaincode,
            func,
            args,
        },
        { timeout: parseInt(env.HttpTimeout, 10) },
    );
    return JSON.stringify(response.data);
};

/**
 * Query the blockchain
 *
 * @param identity Identity name
 * @param channel Channel name
 * @param chaincode Chaincode name
 * @param func Function name
 * @param args Function arguments
 * @param profile Connection profile
 * @returns Query response
 */
export const query = async (
    identity: string,
    channel: string,
    chaincode: string,
    func: string,
    args: string[],
) => {
    if (identity === '' || channel === '' || chaincode === '' || func === '') {
        throw new Error('Missing required parameter(s)');
    }
    const response = await axios.post(
        `${env.ClientUrl}/chaincodes/query`,
        {
            identity,
            channel,
            chaincode,
            func,
            args,
        },
        { timeout: parseInt(env.HttpTimeout, 10) },
    );
    return JSON.stringify(response.data);
};
