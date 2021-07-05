const Page = require('./page');

class CreateContractPage extends Page {
    
    get fixedContractBox () { return $("div.box") }
    get contractName () { return $("input[name='name']") }
    get contractScope () { return $("textarea[name='scope']") }
    get selectEffectiveDates () { return $("div[name='effectiveDate']") }
    get submitBtn () { return $("button[type='submit']") }
    get rate () { return $("input[name='rate']")}
    get textInputs () { return $$("input[type='text']")}
    get menuList () { return $$("div.select__menu") }
    get perDate () { return $("#react-select-4-option-0") }
    get clauseBtn () { return $$(`button[class="button"]`) }
    get clauseText () { return $("textarea.textarea") }
    get nxtBtn () { return $("button[class='button mt-7 w-100']") }
    get status () { return $("p.contract-layout-status.mb-4")}

    setEffectiveDate () {
        const date = new Date();
        const yesterday = new Date(date.setDate(date.getDate() - 1));
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        $(`abbr[aria-label='${monthNames[yesterday.getMonth()]} ${yesterday.getDate()}, ${yesterday.getFullYear()}']`).click();
    }

    generalInfo (name, scope){
        this.fixedContractBox.click();
        this.contractName.setValue(name);
        this.contractScope.setValue(scope);
        this.selectEffectiveDates.click();
        this.setEffectiveDate();
        this.submitBtn.click();
    }
    
    paymentDetails (rate, currency, perDate){
        this.rate.setValue(rate);
        this.textInputs[0].setValue(currency);
        this.menuList[0].click();
        this.textInputs[1].setValue(perDate);
        this.perDate.click();
        this.submitBtn.click();
    }

    defineDates (){
        this.submitBtn.click();
    }

    extras (clause){
        this.clauseBtn[4].click();
        this.clauseText.setValue(clause);
        this.nxtBtn.click();
    }

    compliance (country, state){
        this.textInputs[0].setValue(country);
        this.menuList[0].click();
        this.textInputs[1].setValue(state);
        this.menuList[0].click();
        this.nxtBtn.click();
    }

    contractCreatedSuccessfully (){
        this.status.waitForDisplayed({timeout: 10000});
        expect(this.status).toExist();
    }

    createFixedContract ({name, scope, rate, currency, perDate, clause, country, state}) {
        this.generalInfo(name, scope);
        this.paymentDetails(rate, currency, perDate);
        this.defineDates();
        this.extras(clause);
        this.compliance(country, state);
        this.contractCreatedSuccessfully();
    }

    open () {
        return super.open('create');
    }
}

module.exports = new CreateContractPage();
