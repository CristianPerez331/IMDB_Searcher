import { emptyGetTVShowsByTitleResponse, getTVShowsByTitleResponse, getTVShowDetailsByIdResponse, getTVShowImagesByIdResponse } from '../mock_data/mockTVShows';

describe('TVShows Business Logic Tests', function () {
    
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    it('Validating getTVShowDataByTitle Checks For Null Title', async () => {
        const mockReq = {params: {}};
        const mockRes = {status: jest.fn().mockReturnThis(), send: jest.fn()};

        const TVShowLogic = require('./tvshow').default;
        await TVShowLogic.getTVShowDataByTitle(mockReq as any, mockRes as any);
        
        expect(mockRes.status).toBeCalledWith(400);
        expect(mockRes.send).toBeCalledWith('TV Show Title Cannot Be Empty.');
    });

    it('Validating getTVShowDataByTitle Checks For Empty Title', async () => {
        const mockReq = {params: { tvShowTitle: ''}};
        const mockRes = {status: jest.fn().mockReturnThis(), send: jest.fn()};

        const TVShowLogic = require('./tvshow').default;
        await TVShowLogic.getTVShowDataByTitle(mockReq as any, mockRes as any);
        
        expect(mockRes.status).toBeCalledWith(400);
        expect(mockRes.send).toBeCalledWith('TV Show Title Cannot Be Empty.');
    });

    it('Validating getTVShowDataByTitle Calls Data Access Layer Functions', async () => {
        const mockReq = {params: { tvShowTitle: 'Something'}};
        const mockRes = {status: jest.fn().mockReturnThis(), send: jest.fn()};

        const TVShowAccess =  require('../data_access/tvshows');
        jest.mock('../data_access/tvshows', () => ({ getTVShowsByTitle: jest.fn().mockReturnValue({movie_results: []}) }));

        const TVShowLogic = require('./tvshow').default;
        await TVShowLogic.getTVShowDataByTitle(mockReq as any, mockRes as any);
        
        expect(mockRes.send).toBeCalledWith([]);
        expect(TVShowAccess.getTVShowsByTitle).toHaveBeenCalledTimes(1);
    });

    it('Validating Can Handle No Results Returned', async () => {
        const mockReq = {params: { tvShowTitle: 'Something'}};
        const mockRes = {status: jest.fn().mockReturnThis(), send: jest.fn()};

        const TVShowAccess =  require('../data_access/tvshows');
        jest.mock('../data_access/tvshows', () => ({ getTVShowsByTitle: jest.fn().mockReturnValue(emptyGetTVShowsByTitleResponse) }));

        const TVShowLogic = require('./tvshow').default;
        await TVShowLogic.getTVShowDataByTitle(mockReq as any, mockRes as any);
        
        expect(mockRes.send).toBeCalledWith([]);
        expect(TVShowAccess.getTVShowsByTitle).toHaveBeenCalledTimes(1);
    });

    it('Validating Returns TVShows', async () => {
        const mockReq = {params: { tvShowTitle: 'Something'}};
        const mockRes = {status: jest.fn().mockReturnThis(), send: jest.fn()};

        jest.mock('../data_access/tvshows', () => ({ getTVShowsByTitle: jest.fn().mockReturnValue(getTVShowsByTitleResponse) }));

        const TVShowLogic = require('./tvshow').default;
        await TVShowLogic.getTVShowDataByTitle(mockReq as any, mockRes as any);
        
        expect((mockRes.send.mock.calls[0][0] as any[]).some(x => x.imdb_id === 'tt2741602')).toBeTruthy();
        expect(mockRes.send.mock.calls[0][0]).toHaveLength(8);
    });

    it('Validating getTVShowDataById Checks For Null Title', async () => {
        const mockReq = {params: {}};
        const mockRes = {status: jest.fn().mockReturnThis(), send: jest.fn()};

        const TVShowLogic = require('./tvshow').default;
        await TVShowLogic.getTVShowDataById(mockReq as any, mockRes as any);
        
        expect(mockRes.status).toBeCalledWith(400);
        expect(mockRes.send).toBeCalledWith('IMDB Id Cannot Be Empty.');
    });

    it('Validating getTVShowDataById Checks For Empty Title', async () => {
        const mockReq = {params: { id: ''}};
        const mockRes = {status: jest.fn().mockReturnThis(), send: jest.fn()};

        const TVShowLogic = require('./tvshow').default;
        await TVShowLogic.getTVShowDataById(mockReq as any, mockRes as any);
        
        expect(mockRes.status).toBeCalledWith(400);
        expect(mockRes.send).toBeCalledWith('IMDB Id Cannot Be Empty.');
    });

    it('Validating getTVShowDataById Calls Data Access Layer Functions', async () => {
        const mockReq = {params: { id: 'Something'}};
        const mockRes = {status: jest.fn().mockReturnThis(), send: jest.fn()};

        const TVShowAccess =  require('../data_access/tvshows');
        jest.mock('../data_access/tvshows', () => ({ 
            getTVShowDetailsById: jest.fn().mockReturnValue({}),
            getTVShowImagesById: jest.fn().mockReturnValue({}) 
        }));

        const TVShowLogic = require('./tvshow').default;
        await TVShowLogic.getTVShowDataById(mockReq as any, mockRes as any);
        
        expect(mockRes.send).toBeCalledWith({});
        expect(TVShowAccess.getTVShowDetailsById).toHaveBeenCalledTimes(1);
        expect(TVShowAccess.getTVShowImagesById).toHaveBeenCalledTimes(1);
    });
    
    it('Validating Returns TVShows Data', async () => {
        const mockReq = {params: { id: 'Something'}};
        const mockRes = {status: jest.fn().mockReturnThis(), send: jest.fn()};

        jest.mock('../data_access/tvshows', () => ({ 
            getTVShowDetailsById: jest.fn().mockReturnValue(getTVShowDetailsByIdResponse),
            getTVShowImagesById: jest.fn().mockReturnValue(getTVShowImagesByIdResponse) 
        }));

        const TVShowLogic = require('./tvshow').default;
        await TVShowLogic.getTVShowDataById(mockReq as any, mockRes as any);
        
        expect((mockRes.send.mock.calls[0][0]).title).toEqual('The Blacklist');
        expect((mockRes.send.mock.calls[0][0]).year_started).toEqual(2013);
        expect((mockRes.send.mock.calls[0][0]).poster).toEqual('http://image.tmdb.org/t/p/original/bgbQCW4fE9b6wSOSC6Fb4FfVzsW.jpg');
    });

});