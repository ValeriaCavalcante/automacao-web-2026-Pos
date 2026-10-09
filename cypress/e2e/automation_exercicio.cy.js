/// <reference types="cypress" />

describe('Automation Exercise', () => {

    const nomeUsuario = 'PGATS Aut'
    const senha = '12345'
    const email = `pgats-aut-${Date.now()}@mail.com`
  // Cadastro
    //cy.get () -- Elementos baseados em css seletor
   // cy.constains () -- elementos baseados em textos

  it ('Cadastrar um novo usuário com sucesso', () => {
    cy.visit('https://www.automationexercise.com')
   // cy.get('a[href*=login]').click()
   cy.xpath('//a[contains(@href, "login")]').click()
    cy.get('[data-qa="signup-name"]').type(nomeUsuario)
    cy.get('[data-qa="signup-email"]').type(email)
    cy.get('[data-qa="signup-button"]').click()

    // radio buttons -> check
  cy.get('#id_gender2').check()

  cy.get('[data-qa="password"]').type('12345')

  // Selects e Comboboxes -> select // adicionar mês e ano
  cy.get('[data-qa="days"]').select('1')
  cy.get('[data-qa="months"]').select('7')
  cy.get('[data-qa="years"]').select('1987')
  

  // checkboxes -> check
  cy.get('#newsletter').check()
  cy.get('#optin').check()
 // Preencher os campos ADRESS INFORMATION
   cy.get('[data-qa="first_name"]').type('PGATS')
   cy.get('[data-qa="last_name"]').type('Aut')
   cy.get('[data-qa="company"]').type('PNUD')
   cy.get('[data-qa="address"]').type('Rua Teste')

   cy.get('[data-qa="country"]').select('Canada')
   cy.get('[data-qa="state"]').type ('California')
    cy.get('[data-qa="city"]').type('San Francisco')
    cy.get('[data-qa="zipcode"]').type('12345')
    cy.get('[data-qa="mobile_number"]').type('999999999')
    cy.get('[data-qa="create-account"]')
    cy.get('[data-qa="create-account"]').click()

})

 it ('Exercício 2 - Login com e-mail e senha corretos', () => {

    cy.visit('https://www.automationexercise.com')

    // 1. Verifique se a página inicial está visível corretamente.
    cy.contains('AutomationExercise').should('be.visible')

    // 2. Clique no botão 'Cadastrar-se / Entrar'.
    cy.get('a[href*="login"]').click()

    // 3. Verifique se a opção "Faça login na sua conta" está visível.
    cy.contains('Login to your account').should('be.visible')

    //4. Insira o endereço de e-mail e a senha corretos.
    cy.get('[data-qa="login-email"]').type(email)
    cy.get('[data-qa="login-password"]').type(senha)

    //5. Clique no botão 'entrar'
    cy.get('[data-qa="login-button"]').click()

    //6.  Verifique se a mensagem "Conectado como [nome de usuário]" está visível.
    cy.contains('Logged in as PGATS Aut').should('be.visible')

    //7. Clique no botão "Excluir conta"
    cy.get('a[href*="delete_account"]').click()

    //8. Verifique se a mensagem "CONTA EXCLUÍDA!" está visível
    cy.get('[data-qa="account-deleted"]').should('be.visible')

 })

  it ('Exercício 3 - Login do usuário com e-mail e senha incorretos', () => {

     // 1. Acesse o endereço URL 'http://automationexercise.com'
      cy.visit('https://www.automationexercise.com')

      // 2. Verifique se a página inicial está visível corretamente.
      cy.contains('AutomationExercise').should('be.visible')

      // 3. Clique no botão 'Cadastrar-se / Entrar'.
      cy.get('a[href*="login"]').click()

      // 4. Verifique se a opção "Faça login na sua conta" está visível.
      cy.contains('Login to your account').should('be.visible')

      //5. Insira o endereço de e-mail e a senha corretos.
    cy.get('[data-qa="login-email"]').type(email)
    cy.get('[data-qa="login-password"]').type(senha)

      //6. Clique no botão 'entrar'
       cy.get('[data-qa="login-button"]').click()

     //7. Verifique se a mensagem de erro "Seu e-mail ou senha está incorreto!" está visível.
      cy.contains('Your email or password is incorrect!').should('be.visible') 
})

 it ('Exercício 4 - Fazer logout do usuário', () => {
   // 1. Acesse o endereço URL
    cy.visit('https://www.automationexercise.com')

    // 2. Verifique se a página inicial está visível corretamente
    cy.contains('AutomationExercise').should('be.visible')

    // 3. Clique no botão 'Cadastrar-se / Entrar'
    cy.get('a[href*="login"]').click()

    // 4. Verifique se a opção "Faça login na sua conta" está visível
    cy.contains('Login to your account').should('be.visible')

    // 5. Insira o endereço de e-mail e a senha corretos
    cy.get('[data-qa="login-email"]').type('pgats-aut-1790976298385@mail.com')
    cy.get('[data-qa="login-password"]').type(senha)

    // 6. Clique no botão 'Entrar'
    cy.get('[data-qa="login-button"]').click()

    // 7. Verifique se "Logged in as PGATS Aut" está visível
    cy.contains('Logged in as PGATS Aut').should('be.visible')

    // 8. Clique no botão 'Sair'
    cy.get('a[href*="logout"]').click()

    // 9. Verifique se foi redirecionado para a página de login
    cy.url().should('include', '/login')
    cy.contains('Login to your account').should('be.visible')

it ('Exercício 5 - Tentar cadastrar um e-mail já cadastrado ', () => {
   // ARRANGE
  const nomeUsuario = 'PGATS Aut'
  const emailExistente = 'pgats-aut-test-1791030872114@mail.com'

  // ACT
  cy.visit('https://www.automationexercise.com')

  cy.xpath('//a[contains(@href, "login")]').click()

  cy.xpath('//input[@data-qa="signup-name"]')
    .type(nomeUsuario)

  cy.xpath('//input[@data-qa="signup-email"]')
    .type(emailExistente)

  cy.xpath('//button[@data-qa="signup-button"]')
    .click()

  // ASSERT
  cy.contains('Email Address already exist!')
    .should('be.visible')
})

 })
})
