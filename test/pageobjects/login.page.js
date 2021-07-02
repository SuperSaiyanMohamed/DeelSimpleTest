const Page = require('./page');

class LoginPage extends Page {
    
    get inputUsername () { return $("input[name='email']") }
    get inputPassword () { return $("input[name='password']") }
    get btnSubmit () { return $("button[type='submit']") }

    login ({email, password}) {
        this.inputUsername.setValue(email);
        this.inputPassword.setValue(password);
        this.btnSubmit.click();
    }

    open () {
        return super.open('login');
    }
}

module.exports = new LoginPage();
