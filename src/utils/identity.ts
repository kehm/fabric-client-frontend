import axios from 'axios';
import env from '../types/env';

/**
 * Get enrolled identities from wallet
 */
export const getIdentities = async () => {
    const identities = await axios.get(
        `${env.ClientUrl}/identities`,
        { timeout: parseInt(env.HttpTimeout, 10) },
    );
    return identities.data;
};

/**
 * Enroll an admin identity with the Fabric CA
 */
export const enrollAdmin = async () => {
    await axios.post(
        `${env.ClientUrl}/identities/enroll/admin`,
        {
            name: env.DefaultAdminName,
            secret: env.DefaultAdminSecret,
            organization: env.OrganizationName,
        },
        { timeout: parseInt(env.HttpTimeout, 10) },
    );
};

/**
 * Enroll a client identity with the Fabric CA
 *
 * @param name Identity name
 * @param secret Identity secret
 */
export const enroll = async (
    name: string,
    secret: string,
) => {
    await axios.post(
        `${env.ClientUrl}/identities/enroll`,
        {
            name,
            secret,
            organization: env.OrganizationName,
        },
        { timeout: parseInt(env.HttpTimeout, 10) },
    );
};

/**
 * Register an identity with the Fabric CA
 *
 * @param name Identity name
 * @param secret Identity secret
 */
export const register = async (
    name: string,
    secret: string,
    role: string,
) => {
    await axios.post(
        `${env.ClientUrl}/identities/register`,
        {
            name,
            secret,
            role: role.toLowerCase(),
            organization: env.OrganizationName,
            affiliation: env.DefaultAffiliation,
            registrar: env.DefaultAdminName,
        },
        { timeout: parseInt(env.HttpTimeout, 10) },
    );
};

/**
 * Clear client wallet
 */
export const clearWallet = async () => {
    await axios.post(
        `${env.ClientUrl}/identities/clear`,
        {},
        { timeout: parseInt(env.HttpTimeout, 10) },
    );
};
