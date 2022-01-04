import React from 'react';
import Button from '@material-ui/core/Button';

/**
 * Render submit form button
 *
 * @returns JSX
 */
function SubmitButton({ label }: { label: string }) {
    return (
        <div className="mt-10">
            <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
            >
                {label}
            </Button>
        </div>
    );
}

export default SubmitButton;
