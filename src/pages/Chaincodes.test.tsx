/* eslint-disable no-irregular-whitespace */
import React from 'react';
import {
    fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import strings from '../strings';
import Chaincodes from './Chaincodes';

const FABRIC_IDENTITY = 'admin';
const FABRIC_CHANNEL = 'mychannel';
const FABRIC_CHAINCODE = 'basic';
const FABRIC_CHAINCODE_INVOKE = 'TransferAsset';
const FABRIC_CHAINCODE_QUERY = 'GetAllAssets';

/**
 * Select the identity from the Select component
 *
 * @param input Input name
 * @param option Option to select
 */
const selectOption = (input: string, option: string) => {
    const select = screen.getByRole('button', { name: input });
    userEvent.click(select);
    const li = screen.getByRole('option', { name: option });
    userEvent.click(li);
};

describe('invoke chaincode from chaincodes page', () => {
    describe('submit complete form', () => {
        it('should render success message', async () => {
            render(<Chaincodes identities={[FABRIC_IDENTITY]} />);
            selectOption(`${strings.labelTransactionType} ${strings.labelQuery}`, strings.labelInvoke);
            selectOption(`${strings.labelIdentity} ​`, FABRIC_IDENTITY);
            fireEvent.input(screen.getByRole('textbox', { name: strings.labelChannelName }), { target: { value: FABRIC_CHANNEL } });
            fireEvent.input(screen.getByRole('textbox', { name: strings.labelChaincodeName }), { target: { value: FABRIC_CHAINCODE } });
            fireEvent.input(screen.getByRole('textbox', { name: strings.labelFunctionName }), { target: { value: FABRIC_CHAINCODE_INVOKE } });
            fireEvent.input(screen.getByRole('textbox', { name: strings.labelArguments }), { target: { value: 'asset6,Christopher' } });
            const button = screen.getByText(strings.labelSubmit);
            userEvent.click(button);
            await waitFor(() => {
                expect(screen.getByText(strings.labelSuccessInvoke)).toBeInTheDocument();
            }, { timeout: 5000 });
        });
    });
    describe('submit incomplete form', () => {
        it('should render error message', async () => {
            render(<Chaincodes identities={[FABRIC_IDENTITY]} />);
            selectOption(`${strings.labelTransactionType} ${strings.labelQuery}`, strings.labelInvoke);
            const button = screen.getByText(strings.labelSubmit);
            userEvent.click(button);
            await waitFor(() => {
                expect(screen.getByText(strings.labelError)).toBeInTheDocument();
            }, { timeout: 5000 });
        });
    });
});

describe('query chaincode from chaincodes page', () => {
    describe('submit complete form', () => {
        it('should render success message', async () => {
            render(<Chaincodes identities={[FABRIC_IDENTITY]} />);
            selectOption(`${strings.labelIdentity} ​`, FABRIC_IDENTITY);
            fireEvent.input(screen.getByRole('textbox', { name: strings.labelChannelName }), { target: { value: FABRIC_CHANNEL } });
            fireEvent.input(screen.getByRole('textbox', { name: strings.labelChaincodeName }), { target: { value: FABRIC_CHAINCODE } });
            fireEvent.input(screen.getByRole('textbox', { name: strings.labelFunctionName }), { target: { value: FABRIC_CHAINCODE_QUERY } });
            const button = screen.getByText(strings.labelSubmit);
            userEvent.click(button);
            await waitFor(() => {
                expect(screen.getByText(new RegExp(strings.labelSuccessQuery))).toBeInTheDocument();
            }, { timeout: 5000 });
        });
    });
    describe('submit incomplete form', () => {
        it('should render error message', async () => {
            render(<Chaincodes identities={[FABRIC_IDENTITY]} />);
            const button = screen.getByText(strings.labelSubmit);
            userEvent.click(button);
            await waitFor(() => {
                expect(screen.getByText(strings.labelError)).toBeInTheDocument();
            }, { timeout: 5000 });
        });
    });
    describe('with empty identity wallet', () => {
        it('should render error message', async () => {
            render(<Chaincodes identities={[]} />);
            expect(screen.getByText(strings.infoEnrollFirst)).toBeInTheDocument();
        });
    });
});
