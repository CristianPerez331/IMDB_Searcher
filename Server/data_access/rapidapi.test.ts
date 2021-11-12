
describe('RapidAPI Data Access Tests', function () {
    
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    it('Validating callEndpoint calls axios function with correct config', async () => {
        const axios =  require('axios');
        jest.mock('axios', () => ({ request: jest.fn().mockReturnValue(Promise.resolve({data: {status: 'OK'}})) }));

        process.env.APIHOST = "Test";
        process.env.APIKEY = "Test2";
        const RapidAPIDataAccess = require('./rapidapi').default;
        await RapidAPIDataAccess.callEndpoint({something: 'something'});
        
        expect(axios.request).toBeCalledWith({
            "headers": {
                "x-rapidapi-host": "Test",
                "x-rapidapi-key": "Test2",
            },
            "method": "GET",
            "params": {
                "something": "something",
            },
            "url": "https://movies-tvshows-data-imdb.p.rapidapi.com/",
        });
    });

    it('Validating callEndpoint calls axios function with correct config when env undefined', async () => {
        const axios =  require('axios');
        jest.mock('axios', () => ({ request: jest.fn().mockReturnValue(Promise.resolve({data: {status: 'OK'}})) }));

        delete process.env.APIHOST;
        delete process.env.APIKEY;
        const RapidAPIDataAccess = require('./rapidapi').default;
        await RapidAPIDataAccess.callEndpoint({something: 'something'});
        
        expect(axios.request).toBeCalledWith({
            "headers": {
                "x-rapidapi-host": "",
                "x-rapidapi-key": "",
            },
            "method": "GET",
            "params": {
                "something": "something",
            },
            "url": "https://movies-tvshows-data-imdb.p.rapidapi.com/",
        });
    });

    it('Validating callEndpoint throws error when response data status is not ok ', async () => {
        jest.mock('axios', () => ({ request: jest.fn().mockReturnValue(Promise.resolve({data: {status: 'SOMETHING ELSE'}})) }));
        const RapidAPIDataAccess = require('./rapidapi').default;
        
        await expect(RapidAPIDataAccess.callEndpoint({something: 'something'})).rejects.toBeInstanceOf(Error);
    });


});