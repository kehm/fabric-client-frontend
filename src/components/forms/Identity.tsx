import React, {
    ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import strings from '../../strings';
import {
    clearWallet, enroll, register,
} from '../../utils/identity';
import SubmitButton from '../buttons/SubmitButton';
import env from '../../types/env';

/**
 * Render form for enrolling/registering identities
 *
 * @returns JSX
 */
function Enroll(
    {
        identities,
        onSubmitted,
    }: {
        identities: Array<string>,
        onSubmitted: Function,
    },
) {
    const defaultFormValues = {
        action: 'REGISTERENROLL',
        role: 'CLIENT',
        name: '',
        secret: '',
    };
    const [formValues, setFormValues] = useState(defaultFormValues);
    const [isLoading, setIsLoading] = useState<string | undefined>(undefined);
    const actions = [
        {
            value: 'REGISTERENROLL',
            label: strings.labelRegisterEnroll,
        },
        {
            value: 'REGISTER',
            label: strings.labelRegister,
        },
        {
            value: 'ENROLL',
            label: strings.labelEnroll,
        },
    ];
    const roles = [
        {
            value: 'CLIENT',
            label: strings.labelClient,
        },
        {
            value: 'PEER',
            label: strings.labelPeer,
        },
        {
            value: 'ORDERER',
            label: strings.labelOrderer,
        },
    ];

    /**
     * Submit to client API
     */
    const submit = async () => {
        try {
            if (identities.length === 0) {
                await enroll(
                    env.DefaultAdminName,
                    env.DefaultAdminSecret,
                );
                onSubmitted('');
            } else if (formValues.action === 'REGISTERENROLL') {
                await register(
                    formValues.name,
                    formValues.secret,
                    formValues.role,
                );
                await enroll(
                    formValues.name,
                    formValues.secret,
                );
                onSubmitted(strings.labelSuccessRegEnroll);
            } else if (formValues.action === 'REGISTER') {
                await register(
                    formValues.name,
                    formValues.secret,
                    formValues.role,
                );
                onSubmitted(strings.labelSuccessRegister);
            } else if (formValues.action === 'ENROLL') {
                await enroll(
                    formValues.name,
                    formValues.secret,
                );
                onSubmitted(strings.labelSuccessEnroll);
            }
        } catch (err: unknown) {
            setIsLoading(undefined);
            onSubmitted(strings.labelError);
        }
    };

    /**
     * Disable loading indicator on new identities array
     */
    useEffect(() => {
        setIsLoading(undefined);
    }, [identities]);

    /**
     * Invoke API if submit/clear
     */
    useEffect(() => {
        if (isLoading === 'SUBMIT') submit();
        if (isLoading === 'CLEAR') {
            const clear = async () => {
                try {
                    await clearWallet();
                    onSubmitted('');
                } catch (err: unknown) {
                    onSubmitted(strings.labelError);
                }
            };
            clear();
        }
    }, [isLoading]);

    /**
     * Submit to client API
     *
     * @param e Event
     */
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading('SUBMIT');
    };

    /**
     * Handle change text field input
     *
     * @param e Event
     */
    const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value as string,
        });
    };

    /**
     * Render form inputs
     *
     * @returns JSX
     */
    const renderForm = () => (
        <>
            {!isLoading && (
                <div className="absolute right-4 -top-12">
                    <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        type="button"
                        onClick={() => setIsLoading('CLEAR')}
                    >
                        {strings.labelClearWallet}
                    </Button>
                </div>
            )}
            <FormControl variant="outlined" fullWidth>
                <InputLabel id="action-label">
                    {strings.labelAction}
                </InputLabel>
                <Select
                    className="mb-4"
                    labelId="action-label"
                    id="action"
                    value={formValues.action}
                    variant="outlined"
                    label={strings.labelAction}
                    fullWidth
                    onChange={(e) => setFormValues({
                        ...formValues,
                        action: e.target.value as string,
                    })}
                    name="action"
                >
                    {actions.map((element) => (
                        <MenuItem key={element.value} value={element.value}>
                            {element.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {formValues.action !== 'ENROLL' && (
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="role-label">
                        {strings.labelIdentityRole}
                    </InputLabel>
                    <Select
                        className="mb-4"
                        labelId="role-label"
                        id="role"
                        value={formValues.role}
                        variant="outlined"
                        label={strings.labelIdentityRole}
                        fullWidth
                        onChange={(e) => setFormValues({
                            ...formValues,
                            role: e.target.value as string,
                        })}
                        name="role"
                    >
                        {roles.map((element) => (
                            <MenuItem key={element.value} value={element.value}>
                                {element.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
            <TextField
                id="name"
                name="name"
                type="text"
                label={strings.labelIdentityName}
                variant="outlined"
                fullWidth
                required
                value={formValues.name}
                onChange={handleChangeText}
                inputProps={{ maxLength: 280 }}
            />
            <div className="mt-4">
                <TextField
                    id="secret"
                    name="secret"
                    type="text"
                    label={strings.labelIdentitySecret}
                    variant="outlined"
                    fullWidth
                    required
                    value={formValues.secret}
                    onChange={handleChangeText}
                    inputProps={{ maxLength: 280 }}
                    autoComplete="off"
                />
            </div>
        </>
    );

    return (
        <form className="relative w-96 p-4" onSubmit={handleSubmit}>
            {identities.length > 0 ? renderForm() : <p>{strings.infoWalletEmpty}</p>}
            {isLoading ? (
                <div className="mt-10 ml-8">
                    <CircularProgress />
                </div>
            ) : (
                <SubmitButton
                    label={identities.length > 0
                        ? strings.labelSubmit
                        : strings.labelEnrollAdmin}
                />
            )}
        </form>
    );
}

export default Enroll;
