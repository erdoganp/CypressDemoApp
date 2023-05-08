/// <reference types="cypress" />


const { Dropdown } = require("bootstrap")
const { table } = require("console")
const { first } =  require("rxjs-compat/operator/first")

describe("Our first suite",()=>{

    it("some test name",()=>{

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
      
        //search elemet by tag name
        cy.get('input')

        //search element by ID
        cy.get('#inputEmail1')

        //by Class Name
        cy.get('.input-full-width')
        
        //by Attribute name
        cy.get('[placeholder]')

        //find by Attribute name and value
        cy.get('[placeholder="Email"]')


        //find by Class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //by tagname and Attribute with value
        cy.get('input[placeholder="Email"]')

        //by two different attributes
        cy.get('[placeholder="Email"][type="email"]')

        //find element by tag name,Attribute with value,id and class name
        cy.get('input[placeholder="Email"]#inputEmail.input-full-width')

        //the most recommended way by cypress

        cy.get('[data-cy="imputEmail1"]')
        

    })

    it("second test ", ()=>{
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[data-cy="signInButton"]')

        cy.contains('Sign in')

        cy.contains('[status="warning"]', 'Sign in')

        cy.get('#inputEmail3')
            .parents('form')
            .find('button') //find element kullanmak için parent elememt den sonra kullanılması gerek
            .should('contain','Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click({force: true})
          
            .find('button') //find element kullanmak için parent elememt den sonra kullanılması gerek
        
        
          //  cy.find('button')//bu kullanım yanlıs



          // cy.contains('nb-card', 'Horizontal form').find('[type="email"]')
    
    })


    it('then  and wrap methods',()=>{
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain','Email')
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain','Password')
        cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', "Email")
        cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain','Password')

            //seleniumda formları bir degere atayıp oradan cagırdıgımızda asagıdaki gibi yapıyoruz.Fakat cypress async oldugu için formu kaydedemiyoruz
         /*
            const firstForm=cy.contains('nb-card', 'Using the Grid')
            const secondForm=cy.contains('nb-card', 'Basic form')

            firstForm.find('[for="inputEmail1"]').should('contain','Email')
            firstForm.find('[for="inputPassword2"]').should('contain','Password')
            secondForm.find('[for="exampleInputEmail1"]').should('contain','Email')
         */


            //cypress style-burda then methodunu  kullanıyoruz
            //then methodu bize jquery objesi donduruyor yani bizde ona firstForm dedik
            //altta kullandıgımız find,equal ,text methodları jquery a ait methodlar cypress e degil.Yukarıda kullandıgımız should ve find ler ise cypres methodları



        cy.contains('nb-card', 'Using the Grid').then(firstForm => { 
            const emailLabelFirst=firstForm.find('[for="inputEmail1"]').text() 
            const passwordLabelFirst=firstForm.find('[for="inputPassword2"]').text()

            expect(emailLabelFirst).to.equal('Email')
            expect(passwordLabelFirst).to.equal('Password')

                //ustteki passwordLabelFirst u kullanmak için aynı {} içinde yazdık
            cy.contains('nb-card', 'Basic form').then(secondForm => {
                const passwordSecondText=secondForm.find('[for="exampleInputPassword1"]').text()
                expect(passwordLabelFirst).to.equal(passwordSecondText)
               
                //wrap methodunu jquery objesi için cypress methodu kullanmak için yapıyoruz.mesela secondForm bir jquery ama should bir cypress methodu
                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain','Password')
               
                    
             })

         })
    })
        
    
        it.only("invoke command",()=>{
            cy.visit('/')
            cy.contains('Forms').click()
            cy.contains('Form Layouts').click()
            

            //1 (jquery kullanıyoruz)
            cy.get('[for="exampleInputEmail1"]')
                .should('contain','Email address')
                .should('have.class','label')
                .and('have.text','Email address')

            //2 (then ile jquery kullanıyoruz)
            cy.get('[for="exampleInputEmail1"]').then(label =>{
                expect(label.text()).to.equal("Email address")
                expect(label).to.have.class('label')
                expect(label).to.have.text('Email address')
            })

            //3(invoke cypress methodudur)
            cy.get('[for="exampleInputEmail1"]').invoke("text").then(text => {

                expect(text).to.equal("Email address")
            })

            //checkbox i kontrol ediyoruz
            cy.contains("nb-card","Basic form")
            .find("nb-checkbox")
            .click()
            .find(".custom-checkbox")
            .invoke("attr","class")
           // .should("contain","checked")
            .then(classValue=>{
                expect(classValue).to.contain("checked")//burada ustte invoke ile aldıgımız classValue u kontrol ediyoruz
            })
        })


       
        //datepicker da ki veriyi assert ediyoruz
        it.only("assert propery",()=>{
            function selectDayFromCurrent(day){
                let date =new Date()
                date.setDate(date.getDate() +day)
                let futureDay=date.getDate()
                let futureMonth=date.toLocaleString('default', {month:'short'})
                let dateAssert=futureMonth +' '+futureDay+', '+date.getFullYear()
                
                cy.get('nb-calendar-navigation').invoke('attr','ng-reflect-date').then(dateAttribute =>{
                    if(!dateAttribute.includes(futureMonth)){
                        cy.get('[data-name="chevron-right"]').click({force:true})
                        selectDayFromCurrent(day)
                        
                    }else{
                        cy.get('nb-calendar-day-picker').contains(futureDay).click({force:true})
                    }     
     
                 })
            return dateAssert    
        }
            cy.visit('/')
            cy.contains('Forms').click()
            cy.contains('Datepicker').click()

            cy.contains("nb-card","Common Datepicker").find('input').then(input =>{
                cy.wrap(input).click({force:true})
                let dateAssert=selectDayFromCurrent(2)
                //cy.get('nb-calendar-day-picker').contains("17").click()
                cy.wrap(input).invoke('prop','value').should('contain', dateAssert)
                cy.wrap(input).should('have.value',dateAssert)
            })
        })
    

        //radion butto üzerinde calısıyoruz
        it("radion button",()=>{
            cy.visit("/")
            cy.contains("Forms").click()
            cy.contains("Form Layout").click()


            cy.contains('nb-card', "Using the Grid").find('[type="radio"]').then(radioButtons =>{
                cy.wrap(radioButtons)
                    .first()
                    .check({force: true})
                    .should("be.checked")

                cy.wrap(radioButtons)
                    .eq(1) //2.index deki degeri alıyor yani ikinci radionbutton
                    .check({force: true})    

                cy.wrap(radioButtons)
                    .first() //bunun yerine eq(0) da kullanılabiliyor
                    .should("not.be.checked")

                cy.wrap(radioButtons)
                    .eq(2)
                    .should("be.disabled")
            })

        })


        it('check boxes', ()=>{
            cy.visit("/")
            cy.contains("Modal & Overlays")
            cy.contains("Toastr").click({force : true})

            //check methodu radio button ve checkboxlar için kullanılır.
            //eger checkbox uncheck ise check methodu calısır ,eger zaten check edilmis ise calısmaz
            //onun yerine click methodu kullanılabilir.click her durumda calısır
           // cy.get('[type="checkbox"]').check({force : true})
            cy.get('[type="checkbox"]').eq(0).click({force:true})
            cy.get('[type="checkbox"]').eq(1).check({force:true})
        })


    it('lists and dropdows',()=>{
        cy.visit('/')

        //1
        cy.get('nav nb-select').click()
        cy.get('.options-list').contains('Dark').click()
        cy.get('nav nb-select').should('contain','Dark')
        cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')  //cypress rgb formatinı destekledği için hex olan renk kodunu rgb olarak buluyoruz google dan

        //2.kullanım
        cy.get('nav nb-select').then( dropdown =>{
            cy.wrap(dropdown).click()
            cy.get('.options-list nb-option').each((listItem, index)=>{
                const itemText = listItem.text().trim()//text lerin basında bosluk oldugu içişn trim kullanıyoruz

                const colors={
                    "Light": "rgb(255, 255, 255)",
                    "Dark" : "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)"
                }

                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain', itemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])

                if(index < 3){
                    cy.wrap(dropdown).click()
                }
            })

        })

    })


    it.only('Web tables', ()=>{

        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()
    
        //1
        cy.get('tbody').contains('tr', 'Larry').then(tableRow =>{

            cy.wrap(tableRow).find('.nb-edit').click({force:true})
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
            cy.wrap(tableRow).find('.nb-checkmark').click({force:true})
            cy.wrap(tableRow).find('td').eq(6).should('contain', '25')


        })

        //2.kullanım olması

        cy.get('thead').find('.nb-plus').click({force:true})
        cy.get('thead').find('tr').eq(2).then(tableRow=>{
            cy.wrap(tableRow).find('[placeholder="First Name"]').type("Erdogan")
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type("PACACI")
            cy.wrap(tableRow).find('.nb-checkmark').click({force:true})
        
        })
        cy.get('tbody tr').first().find('td').then(tableColumns =>{
            cy.wrap(tableColumns).eq(2).should('contain', 'Erdogan')
            cy.wrap(tableColumns).eq(3).should('contain', 'PACACI')


        })
    

        //3.kullanım olması gereken
        const age =[20,30,40,200]

        cy.wrap(age).each(age =>{
            
            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(500) //search den gelen cevaplar tabloya yuklenmesi için 500 ms bekliyoruz
            cy.get('tbody tr').each(tableRow => {
                if(age == 200){
                    cy.wrap(tableRow).should('contain', 'No data found')
                }else{
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age)//age kolonu 7.sırada oldugu için 6.indisi seciyoruz
                }
       
            })
         })

    })



    it('Tooltips', ()=>{

        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()
    
        cy.contains('nb-card', 'Colored Tooltips')
            .contains('Default').click({force:true})
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')

    })

    it('Dialogbox', ()=>{

        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

       
       
       //1

        cy.get('tbody tr').first().find('.nb-trash').click({force:true})
        cy.on('window:confirm', (confirm)=>{
            expect(confirm).to.equal('Are you sure you want to delete?')

        })

        //2
        const stub =cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody tr').first().find('.nb-trash').click({force:true}).then(()=>{
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')


        })

        //3
        cy.get('tbody tr').first().find('.nb-trash').click({force:true})
        cy.on('window:confirm', ()=>false)

})


})