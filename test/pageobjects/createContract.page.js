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

    async setEffectiveDate () {
        const date = new Date();
        const yesterday = new Date(date.setDate(date.getDate() - 1));
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        await (await $(`abbr[aria-label='${monthNames[yesterday.getMonth()]} ${yesterday.getDate()}, ${yesterday.getFullYear()}']`)).click();
    }

    async generalInfo (name, scope){
        await (await this.fixedContractBox).click();
        await (await this.contractName).setValue(name);
        await (await this.contractScope).setValue(scope);
        await (await this.selectEffectiveDates).click();
        await this.setEffectiveDate();
        await (await this.submitBtn).click();
    }
    
    async paymentDetails (rate, currency, perDate){
        await (await this.rate).setValue(rate);
        await (await this.textInputs)[0].setValue(currency);
        await (await this.menuList)[0].click();
        await (await this.textInputs)[1].setValue(perDate);
        await (await this.perDate).click();
        await (await this.submitBtn).click();
    }

    async defineDates (){
        await (await this.submitBtn).click();
    }

    async extras (clause){
        await (await this.clauseBtn)[4].click();
        await (await this.clauseText).setValue(clause);
        await (await this.nxtBtn).click();
    }

    async compliance (country, state){
        await (await this.textInputs)[0].setValue(country);
        await (await this.menuList)[0].click();
        await (await this.textInputs)[1].setValue(state);
        await (await this.menuList)[0].click();
        await (await this.nxtBtn).click();
    }

    async contractCreatedSuccessfully (){
        await browser.waitUntil( async () => {
            return await (await this.status).getText() === 'WAITING FOR CLIENT SIGN';
        } )
        await expect(await this.status).toExist();
    }

    async createFixedContract ({name, scope, rate, currency, perDate, clause, country, state}) {
        await this.generalInfo(name, scope);
        await this.paymentDetails(rate, currency, perDate);
        await this.defineDates();
        await this.extras(clause);
        await this.compliance(country, state);
        await this.contractCreatedSuccessfully();
    }

    open () {
        return super.open('create');
    }
}

module.exports = new CreateContractPage();
