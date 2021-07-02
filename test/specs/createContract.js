const LoginPage = require('../pageobjects/login.page');
const CreateContract = require('../pageobjects/createContract.page');

const data = {
    user: {
        email: '',
        password: ''
    },
    contract: {
        name: 'Simple test',
        scope: 'Good job',
        rate: '1234',
        currency: 'GBP',
        perDate: 'Week',
        clause: 'Test',
        country: 'United States',
        state: 'Colorado'
    }
}

describe('Login and Create Contract', () => {
    it('should login with valid credentials then create a fixed rate contract', () => {
        LoginPage.open();

        LoginPage.login(data.user);
        browser.pause(3000);
        CreateContract.open();
        CreateContract.createFixedContract(data.contract);
    });
});


