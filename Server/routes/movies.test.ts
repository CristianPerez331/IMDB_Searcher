
describe('Movie Router Tests', function () {
    
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    it('Validating Movie Router Contains Correct Title Search Endpoint', () => {
        const express = require('express');
        const movieLogic = require('../business_logic/movies');
        const mockRouter = { get: jest.fn() };
        jest.spyOn(express, 'Router').mockImplementationOnce(() => mockRouter);
        jest.mock('../business_logic/movies', () => ({ getMovieDataByTitle: () => jest.fn() }));

        require('./movies');
        expect(mockRouter.get).toHaveBeenCalledWith('/:movieTitle?/search', movieLogic.getMovieDataByTitle);
    });

    it('Validating Movie Router Contains Correct Data By Id Endpoint', () => {
        const express = require('express');
        const movieLogic = require('../business_logic/movies');
        const mockRouter = { get: jest.fn() };
        jest.spyOn(express, 'Router').mockImplementationOnce(() => mockRouter);
        jest.mock('../business_logic/movies', () => ({ getMovieDataById: () => jest.fn() }));

        require('./movies');
        expect(mockRouter.get).toHaveBeenCalledWith('/:id?', movieLogic.getMovieDataById);
    });

});