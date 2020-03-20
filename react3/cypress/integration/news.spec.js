describe(('News Login Testing'), () => {
    // it('Login Page Test', () => {
    //     cy.visit('http://localhost:3000/login')
    //     cy.url().should('include',"/login")
    //     cy.get(!"#inValidCredentials").should("not.exist")
    //     cy.get("#formBasicUsername").type("noAdmin").should('have.value','noAdmin')
    //     cy.get("#formBasicPassword").type("password").should('have.value','password')        
    //     cy.get("#loginButton").click()
    //     cy.get("#inValidCredentials")
    // })
    it('After Login Page to DashBoard Test', () => {
        cy.visit('http://localhost:3000/login')
        cy.get("#formBasicUsername").type("admin")
        cy.get("#formBasicPassword").type("password")       
        cy.get("#loginButton").click()
        cy.url().should('include', "/dashboard")
    })
})

describe(('News Dashboard page Testing'), () => {
     it('Dashboard container and row Test', () => {
         cy.visit('http://localhost:3000/login')
         cy.get("#formBasicUsername").type("admin")
         cy.get("#formBasicPassword").type("password")
         cy.get("#loginButton").click()
         cy.get(".container")
         cy.get(".row")
     })    

})

describe(('News Logout page Testing'), () => {
    it('Logout page Testing', () => {
        cy.visit('http://localhost:3000/login')
        cy.get("#formBasicUsername").type("admin")
        cy.get("#formBasicPassword").type("password")
        cy.get("#loginButton").click()
        cy.get(".dropdown-toggle").click()
        cy.contains("Logout").click()
        cy.url().should("include","/login")
    })    

})