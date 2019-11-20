import 'reflect-metadata'

import { expect } from 'chai';
import 'mocha';
import { MyErrorHandler } from "../src/errors/MyErrorHandler"
import { ErrorTreatment } from '../src/ErrorTreatment';
import { Handle } from '../src/Handle';


describe('Response handler tests', () => {

    it('Handle register', async () => {

        Handle.register(new MyErrorHandler)

        const countRegister = ErrorTreatment.countRegister()
       
        expect(countRegister).to.equal(2)

    });
});


