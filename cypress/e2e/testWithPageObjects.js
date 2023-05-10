const { onNavigationPage, navigateTo } = require("../support/page_objects/navigationPage")


/**
 * before each ile herseferinde cagrılması gereken Layout u bir kere yazıyoruz ve her test baslamadan once kendisi beforeeach i 
 * calıstırıyor.
 */
describe('Test with Page Objects', ()=>{
    beforeEach('open Application', ()=>{
        cy.visit('/')
    })


    it('verify navigations actross the pages', ()=>{
        navigateTo.formLayoutsPage()
        navigateTo.datepickerPage()
        navigateTo.smartTablePage()
        navigateTo.toolTipPage()
        navigateTo.toesterPage()
        navigateTo.dialogPage()
        navigateTo.windowPage()
        navigateTo.popOverPage()
    })



    
})