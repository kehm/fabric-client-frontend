import { invoke, query } from './chaincode';

const FABRIC_IDENTITY = 'admin';
const FABRIC_CHANNEL = 'mychannel';
const FABRIC_CHAINCODE = 'basic';

describe('POST /chaincodes/invoke', () => {
    describe('invoke valid chaincode function', () => {
        it('should complete without error', async () => {
            await expect(invoke(
                FABRIC_IDENTITY,
                FABRIC_CHANNEL,
                FABRIC_CHAINCODE,
                'InitLedger',
                [],
            )).resolves.not.toThrowError();
        });
    });
    describe('invoke a chaincode that does not exist', () => {
        it('should throw error', async () => {
            await expect(invoke(
                'test',
                'test',
                'test',
                'test',
                ['test'],
            )).rejects.toThrowError();
        });
    });
});

describe('POST /chaincodes/query', () => {
    it('should complete without error', async () => {
        await expect(query(
            FABRIC_IDENTITY,
            FABRIC_CHANNEL,
            FABRIC_CHAINCODE,
            'GetAllAssets',
            [],
        )).resolves.not.toThrowError();
    });
    it('should throw error', async () => {
        await expect(query(
            'test',
            'test',
            'test',
            'test',
            ['test'],
        )).rejects.toThrowError();
    });
});
