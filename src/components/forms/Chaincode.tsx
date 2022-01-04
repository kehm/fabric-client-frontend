import React, {
    ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import strings from '../../strings';
import { invoke, query } from '../../utils/chaincode';
import SubmitButton from '../buttons/SubmitButton';

/**
 * Render form for invoking/querying chaincode
 *
 * @returns JSX
 */
function Chaincode(
    {
        identities,
        onSubmitted,
    }: {
        identities: Array<string>,
        onSubmitted: Function,
    },
) {
    const defaultFormValues = {
        type: 'QUERY',
        identity: '',
        channel: '',
        chaincode: '',
        function: '',
        args: '',
    };
    const [formValues, setFormValues] = useState(defaultFormValues);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const types = [
        {
            value: 'QUERY',
            label: strings.labelQuery,
        },
        {
            value: 'INVOKE',
            label: strings.labelInvoke,
        },
    ];

    /**
     * Submit to client API
     */
    const submit = async () => {
        try {
            if (formValues.type === 'QUERY') {
                const response = await query(
                    formValues.identity,
                    formValues.channel,
                    formValues.chaincode,
                    formValues.function,
                    formValues.args.split(','),
                );
                onSubmitted(`${strings.labelSuccessQuery} ${response}`);
            } else {
                const response = await invoke(
                    formValues.identity,
                    formValues.channel,
                    formValues.chaincode,
                    formValues.function,
                    formValues.args.split(','),
                );
                onSubmitted(`${strings.labelSuccessInvoke} ${response}`);
            }
        } catch (err: unknown) {
            onSubmitted(strings.labelError);
        } finally {
            setIsSubmitting(false);
        }
    };

    /**
     * Submit to API if submit button has been clicked
     */
    useEffect(() => {
        if (isSubmitting) submit();
    }, [isSubmitting]);

    /**
     * Handle submit
     *
     * @param e Event
     */
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
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
            <FormControl variant="outlined" fullWidth>
                <InputLabel id="type-label">
                    {strings.labelTransactionType}
                </InputLabel>
                <Select
                    className="mb-4"
                    labelId="type-label"
                    id="type"
                    value={formValues.type}
                    variant="outlined"
                    label={strings.labelTransactionType}
                    fullWidth
                    onChange={(e) => setFormValues({
                        ...formValues,
                        type: e.target.value as string,
                    })}
                    name="type"
                >
                    {types.map((element) => (
                        <MenuItem key={element.value} value={element.value}>
                            {element.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth>
                <InputLabel id="identity-label" required>
                    {strings.labelIdentity}
                </InputLabel>
                <Select
                    labelId="identity-label"
                    id="identity"
                    value={formValues.identity}
                    variant="outlined"
                    label={strings.labelIdentity}
                    fullWidth
                    onChange={(e) => setFormValues({
                        ...formValues,
                        identity: e.target.value as string,
                    })}
                    name="identity"
                    required
                >
                    {identities.map((element: string) => (
                        <MenuItem key={element} value={element}>
                            {element}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <div className="my-4">
                <TextField
                    id="channel"
                    name="channel"
                    type="text"
                    label={strings.labelChannelName}
                    variant="outlined"
                    fullWidth
                    required
                    value={formValues.channel}
                    onChange={handleChangeText}
                    inputProps={{ maxLength: 280 }}
                />
            </div>
            <div className="mb-4">
                <TextField
                    id="chaincode"
                    name="chaincode"
                    type="text"
                    label={strings.labelChaincodeName}
                    variant="outlined"
                    fullWidth
                    required
                    value={formValues.chaincode}
                    onChange={handleChangeText}
                    inputProps={{ maxLength: 280 }}
                />
            </div>
            <div className="mb-4">
                <TextField
                    id="function"
                    name="function"
                    type="text"
                    label={strings.labelFunctionName}
                    variant="outlined"
                    fullWidth
                    required
                    value={formValues.function}
                    onChange={handleChangeText}
                    inputProps={{ maxLength: 280 }}
                />
            </div>
            <TextField
                id="args"
                name="args"
                type="text"
                label={strings.labelArguments}
                variant="outlined"
                fullWidth
                value={formValues.args}
                onChange={handleChangeText}
                inputProps={{ maxLength: 1120 }}
            />
        </>
    );

    return identities.length > 0 ? (
        <form className="w-96 p-4" onSubmit={handleSubmit}>
            {renderForm()}
            {isSubmitting ? (
                <div className="mt-10 ml-8">
                    <CircularProgress />
                </div>
            ) : (
                <SubmitButton
                    label={strings.labelSubmit}
                />
            )}
        </form>
    ) : <p>{strings.infoEnrollFirst}</p>;
}

export default Chaincode;
