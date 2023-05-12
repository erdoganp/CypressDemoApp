export class formLayoutsPage{

    submitInlineFormWithNameAndEmail(name,email){
        cy.contains('nb-card', 'Inline form').find('form').then(form =>{
            cy.wrap(form).find('[placeholder="Jane Doe"]').type(name)
            cy.wrap(form).find('[placeholder]="Email"]').type(email)
            cy.wrap(form).find('[type="checkbox"]').check({force : true})
            cy.wrap(form).submit()//cypress de submit adında özel bir fonksiyon bulunuyor ve bu fonksiyon sadece form larda calısıyor.yukarıda form olarak belirttik zaten
                                    //submit dısında submit butonu üzerine click de yaptırabilirdik
        })
    }

    submitBasicFormWithEmailAndPassword(email,password){
        cy.contains('nb-card', 'Basic form').find('form').then(form =>{
            cy.wrap(form).find('[placeholder="Email"]').type(email)
            cy.wrap(form).find('[placeholder="Password"]').type(password)
            cy.wrap(form).find('[type="checkbox"]').check({force : true})
            cy.wrap(form).submit()//cypress de submit adında özel bir fonksiyon bulunuyor ve bu fonksiyon sadece form larda calısıyor.yukarıda form olarak belirttik zaten
                                    //submit dısında submit butonu üzerine click de yaptırabilirdik
        })
    }
}

export const onFormLayoutsPage=new formLayoutsPage()