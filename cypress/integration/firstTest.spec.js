/// <reference types="cypress" />

describe('Test with backend', () => {
    
    beforeEach('login to the app',() => {
         
        cy.intercept('GET', '**/tags',{fixtures: 'tags.json'}) 
     
        cy.loginToApplication() 
    
    })
    
    it.skip('verify correct request and response ' , () => {

        cy.server()
        cy.route('POST', '**/articles').as('postArticles')
    
        cy.contains('New Article').click()
        cy.get('[placeholder="Article Title"]').type("This is a title4")
        cy.get('[formcontrolname="description"]').type("This is description ")
        cy.get('[formcontrolname="body"]').type("This is body ")
        cy.contains('Publish Article').click()


        cy.wait('@postArticles')
        cy.get('@postArticles').then( xhr =>{

            console.log(xhr)
            expect(xhr.status).to.equal(200)
            expect(xhr.request.body.article.body).to.equal('This is body ')
            expect(xhr.response.body.article.description).to.equal('This is description ')



        }
            
            )


    })
    
    
    it('should gave tags with routing object', () => {
        cy.wait(50000)
        cy.get('.tag-list').should('contain', 'cypress')
        .and('contain', 'automation')
        .and('contain', 'testing')
        
 
    })
    
    
    })
    
    
    