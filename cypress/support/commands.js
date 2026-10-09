

Cypress.Commands.add('fazerLogin', (email, senha) => {
  cy.get('[data-qa="login-email"]').type(email)
  cy.get('[data-qa="login-password"]').type(senha)
  cy.get('[data-qa="login-button"]').click()
})