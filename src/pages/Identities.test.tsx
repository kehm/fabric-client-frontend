import React from 'react';
import {
    fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import strings from '../strings';
import Identities from './Identities';

describe('enroll admin from identities page', () => {
    it('should hide button on click', async () => {
        render(<Identities identities={[]} onChangeIdentity={jest.fn()} />);
        const button = screen.getByText(strings.labelEnrollAdmin);
        userEvent.click(button);
        await waitFor(() => expect(button).not.toBeInTheDocument());
    });
});

describe('register and enroll client from identities page', () => {
    describe('submit complete form', () => {
        it('should render success message', async () => {
            render(<Identities identities={['admin']} onChangeIdentity={jest.fn()} />);
            const name = `test-${new Date().getTime()}`;
            fireEvent.input(screen.getByRole('textbox', { name: strings.labelIdentityName }), { target: { value: name } });
            fireEvent.input(screen.getByRole('textbox', { name: strings.labelIdentitySecret }), { target: { value: 'testpw' } });
            const button = screen.getByText(strings.labelSubmit);
            userEvent.click(button);
            await waitFor(() => {
                expect(screen.getByText(strings.labelSuccessRegEnroll)).toBeInTheDocument();
            }, { timeout: 5000 });
        });
    });
    describe('submit incomplete form', () => {
        it('should render error message', async () => {
            render(<Identities identities={['admin']} onChangeIdentity={jest.fn()} />);
            const button = screen.getByText(strings.labelSubmit);
            userEvent.click(button);
            await waitFor(() => {
                expect(screen.getByText(strings.labelError)).toBeInTheDocument();
            }, { timeout: 5000 });
        });
    });
});

describe('register and enroll client from identities page', () => {
    describe('submit complete form', () => {
        it('should render success message', async () => {
            render(<Identities identities={['admin']} onChangeIdentity={jest.fn()} />);
            const name = `test-${new Date().getTime()}`;
            fireEvent.input(screen.getByRole('textbox', { name: strings.labelIdentityName }), { target: { value: name } });
            fireEvent.input(screen.getByRole('textbox', { name: strings.labelIdentitySecret }), { target: { value: 'testpw' } });
            const button = screen.getByText(strings.labelSubmit);
            userEvent.click(button);
            await waitFor(() => {
                expect(screen.getByText(strings.labelSuccessRegEnroll)).toBeInTheDocument();
            }, { timeout: 5000 });
        });
    });
    describe('submit incomplete form', () => {
        it('should render error message', async () => {
            render(<Identities identities={['admin']} onChangeIdentity={jest.fn()} />);
            const button = screen.getByText(strings.labelSubmit);
            userEvent.click(button);
            await waitFor(() => {
                expect(screen.getByText(strings.labelError)).toBeInTheDocument();
            }, { timeout: 5000 });
        });
    });
});

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

describe('register and enroll client from identities page', () => {
    const name = `test-${new Date().getTime()}`;
    describe('register identity', () => {
        it('should render success message', async () => {
            render(<Identities identities={['admin']} onChangeIdentity={jest.fn()} />);
            selectOption(`${strings.labelAction} ${strings.labelRegisterEnroll}`, strings.labelRegister);
            fireEvent.input(screen.getByRole('textbox', { name: strings.labelIdentityName }), { target: { value: name } });
            fireEvent.input(screen.getByRole('textbox', { name: strings.labelIdentitySecret }), { target: { value: 'testpw' } });
            const button = screen.getByText(strings.labelSubmit);
            userEvent.click(button);
            await waitFor(() => {
                expect(screen.getByText(strings.labelSuccessRegister)).toBeInTheDocument();
            }, { timeout: 2500 });
        });
    });
    describe('enroll identity', () => {
        it('should render success message', async () => {
            render(<Identities identities={['admin']} onChangeIdentity={jest.fn()} />);
            selectOption(`${strings.labelAction} ${strings.labelRegisterEnroll}`, strings.labelEnroll);
            fireEvent.input(screen.getByRole('textbox', { name: strings.labelIdentityName }), { target: { value: name } });
            fireEvent.input(screen.getByRole('textbox', { name: strings.labelIdentitySecret }), { target: { value: 'testpw' } });
            const button = screen.getByText(strings.labelSubmit);
            userEvent.click(button);
            await waitFor(() => {
                expect(screen.getByText(strings.labelSuccessEnroll)).toBeInTheDocument();
            }, { timeout: 2500 });
        });
    });
    describe('enroll without registering first', () => {
        it('should render error message', async () => {
            render(<Identities identities={['admin']} onChangeIdentity={jest.fn()} />);
            selectOption(`${strings.labelAction} ${strings.labelRegisterEnroll}`, strings.labelEnroll);
            const newName = `test-${new Date().getTime()}`;
            fireEvent.input(screen.getByRole('textbox', { name: strings.labelIdentityName }), { target: { value: newName } });
            fireEvent.input(screen.getByRole('textbox', { name: strings.labelIdentitySecret }), { target: { value: 'testpw' } });
            const button = screen.getByText(strings.labelSubmit);
            userEvent.click(button);
            await waitFor(() => {
                expect(screen.getByText(strings.labelError)).toBeInTheDocument();
            }, { timeout: 5000 });
        });
    });
});

describe('clear wallet', () => {
    it('should hide button on click', async () => {
        render(<Identities identities={['admin']} onChangeIdentity={jest.fn()} />);
        const button = screen.getByText(strings.labelClearWallet);
        userEvent.click(button);
        await waitFor(() => expect(button).not.toBeInTheDocument());
    });
});
