
describe('TV Shows Router Tests', function () {
    
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    it('Validating TV Show Router Contains Correct Title Search Endpoint', () => {
        const express = require('express');
        const movieLogic = require('../business_logic/tvshow');
        const mockRouter = { get: jest.fn() };
        jest.spyOn(express, 'Router').mockImplementationOnce(() => mockRouter);
        jest.mock('../business_logic/tvshow', () => ({ getTVShowDataByTitle: () => jest.fn() }));

        require('./tvshows');
        expect(mockRouter.get).toHaveBeenCalledWith('/:tvShowTitle?/search', movieLogic.getTVShowDataByTitle);
    });

    it('Validating TV Show Router Contains Correct Data By Id Endpoint', () => {
        const express = require('express');
        const movieLogic = require('../business_logic/tvshow');
        const mockRouter = { get: jest.fn() };
        jest.spyOn(express, 'Router').mockImplementationOnce(() => mockRouter);
        jest.mock('../business_logic/tvshow', () => ({ getTVShowDataById: () => jest.fn() }));

        require('./tvshows');
        expect(mockRouter.get).toHaveBeenCalledWith('/:id?', movieLogic.getTVShowDataById);
    });

});