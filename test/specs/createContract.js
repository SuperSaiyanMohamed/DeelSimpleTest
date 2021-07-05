const LoginPage = require('../pageobjects/login.page');
const CreateContract = require('../pageobjects/createContract.page');
const UserData = require('../testData/user.json');
const ContractData = require('../testData/fixedContract.json');

describe('Login and Create Contract', () => {
    it('should login with valid credentials then create a fixed rate contract', () => {
        LoginPage.open();

        LoginPage.login(UserData.user);
        browser.pause(3000);
        CreateContract.open();
        CreateContract.createFixedContract(ContractData.contract);
    });
});


