

/**
 * burada select group adında bir fonksioyn tanımladık ve bu fonk sol menıu acık olup olmadıgını kontrol ediyor ve ona göre so menude
 * secim yapılabiliyor bu kontrol sayesinde elemntin bulunmamamsının onune geciyoruz.
 * yapılan işlem class attr unde chevron left varmı ona bakıyoruz.chevron left iken sol menude içerikler acık değil bunun için eger chevron left ise parent  a tıklanmasını saglıyoruz ve
 * bu sekilde alt menuler acılıyor.
 * .expand-state g g' ile gidilen yer expand state sınıfında g tag name e sahip data-name attr u.
 * burada g data-name="layer2"
 *           g data-name="chevron-left"  oldugu için find işlemi yapılırken .expand-state g g olarak buluyoruz .bu sekşlde buluyoruz
 */

function selectGroupMenuItem(groupName){
    cy.contains('a',groupName).then(menu =>{
        cy.wrap(menu).find('.expand-state g g').invoke('attr','data-name').then(attr =>{ //.expand-state g g' ile gidilen yer expand state sınıfında g tag name e sahip data-name attr u.
            if(attr .includes('left')){
                cy.wrap(menu).click()
            }
        })
    })
}
/**
 *navigationpage adında bir sınıf tanımlıyoruz ve burada gidilecek Page lerin methodlarını yazıyoruz.
 */
 
export class NavigationPage{

    formLayoutsPage(){
       

        selectGroupMenuItem('Form')
        cy.contains('Form Layouts').click()
    }

    datepickerPage(){
      
        selectGroupMenuItem('Form')
        cy.contains('Datepicker').click()
    }

    toesterPage(){
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Toastr').click()
    }

    smartTablePage(){
        selectGroupMenuItem('Tables & Data')
        cy.contains('Smart Table').click()
    }

    
    toolTipPage(){
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Tooltip').click()
    }

    dialogPage(){
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Dialog').click()
    }
    
    windowPage(){
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Window').click()
    }
}

/**
 * bu sınıfdan olusturdunugumuz export objeyi diger test tarafında kullanıyoruz
 */
export const navigateTo=new NavigationPage()