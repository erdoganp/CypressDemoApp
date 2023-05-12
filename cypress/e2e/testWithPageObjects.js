const { onDatePickerPage } = require("../support/page_objects/datepickerPage")
const { onFormLayoutsPage } = require("../support/page_objects/formLayoutsPage")
const { onNavigationPage, navigateTo } = require("../support/page_objects/navigationPage")
const { onSmartTablePage } = require("../support/page_objects/smartTablePage")


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



    it.only( 'shoould submit inline and Basic form and select tomorrrow data in the calender',()=>{

       // navigateTo.formLayoutsPage()
       //onFormLayoutsPage.submitInlineFormWithNameAndEmail('Erdogan', 'epacaci@ku.edu.tr')//element i bulmada sorun yasıyor sonra bakılacak
       // onFormLayoutsPage.submitBasicFormWithEmailAndPassword('epacaci@ku.edu.tr','123')
        navigateTo.datepickerPage()
        onDatePickerPage.selectCommonDatepickerDateFromToday(1)
        onDatePickerPage.selectDatepickerWithRangeFromToday(7,14)
        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithFirstAndLastName("Erdogan","PACACI")
        onSmartTablePage.updateAgeByFirstName("Erdogan","35")
        onSmartTablePage.deleteRowByIndex(1)

    })
    
})