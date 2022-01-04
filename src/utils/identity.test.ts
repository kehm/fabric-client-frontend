import { enroll, enrollAdmin, register } from './identity';

describe('POST /identities/enroll/admin', () => {
    it('should respond with HTTP code 200', async () => {
        await expect(enrollAdmin()).resolves.not.toThrowError();
    });
});

describe('POST /identities/register and POST /identities/enroll', () => {
    describe('register and enroll identity', () => {
        it('should complete without error', async () => {
            const name = `test-${new Date().getTime()}`;
            await expect(register(
                name,
                'test',
                'client',
            )).resolves.not.toThrowError();
            await expect(enroll(
                name,
                'test',
            )).resolves.not.toThrowError();
        });
    });
    describe('enroll without registering first', () => {
        const name = `test-${new Date().getTime()}`;
        it('should throw error', async () => {
            await expect(enroll(
                name,
                'test',
            )).rejects.toThrowError();
        });
    });
});
