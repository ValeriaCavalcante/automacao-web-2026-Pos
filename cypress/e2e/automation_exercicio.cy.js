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
   // cy.get('a[href*="delete_account"]').click()

    //8. Verifique se a mensagem "CONTA EXCLUÍDA!" está visível
   // cy.get('[data-qa="account-deleted"]').should('be.visible')

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
      cy.get('[data-qa="login-email"]').type('emailinexistente123@example.com')
      cy.get('[data-qa="login-password"]').type('SenhaErrada999')

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
    cy.get('[data-qa="login-email"]').type(email)
    cy.get('[data-qa="login-password"]').type(senha)

    // 6. Clique no botão 'Entrar'
    cy.get('[data-qa="login-button"]').click()
    cy.wait(2000)

    // 7. Verifique se "Logged in as PGATS Aut" está visível
    cy.contains('Logged in as PGATS Aut').should('be.visible')

    // 8. Clique no botão 'Sair'
    cy.get('a[href*="logout"]').click()

    // 9. Verifique se foi redirecionado para a página de login
    cy.url().should('include', '/login')
    cy.contains('Login to your account').should('be.visible')

 })

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

 it ('Exercício 8 - Verificar todos os produtos e a página de detalhes do produto', () => {

    // 1. Acesse o site
    cy.visit('https://www.automationexercise.com')

    // 2. Verifique se a página inicial está visível
    cy.contains('AutomationExercise').should('be.visible')

    // 3. Clique em Products
    cy.contains('Products').click()

    // 4. Verifique se a página de produtos foi aberta
    cy.url().should('include', '/products')
    cy.contains('All Products').should('be.visible')

    // 5. Verifique se a lista de produtos está visível
    cy.get('.features_items').should('be.visible')

    // 6. Clique em View Product no primeiro produto
    cy.get('.features_items .product-image-wrapper')
        .first()
        .contains('View Product')
        .click()

    // 7. Verifique se a página de detalhes foi aberta
    cy.url().should('include', '/product_details/')

    // 8. Verifique se o nome do produto está visível
    cy.get('.product-information h2').should('be.visible')

    // 9. Verifique os detalhes do produto
    cy.get('.product-information').within(() => {
        cy.contains('Category:').should('be.visible')
        cy.contains('Rs.').should('be.visible')
        cy.contains('Availability:').should('be.visible')
        cy.contains('Condition:').should('be.visible')
        cy.contains('Brand:').should('be.visible')
    })
  
 })

 it ('Exercício 9 - Pesquisar produtos', () => {

    // 1. Acesse o site
    cy.visit('https://www.automationexercise.com')

    // 2. Verifique se a página inicial está visível
    cy.contains('AutomationExercise').should('be.visible')

    // 3. Clique em Products
    cy.contains('Products').click()

    // 4. Verifique se a página de produtos foi aberta
    cy.url().should('include', '/products')
    cy.contains('All Products').should('be.visible')

    // 5. Digite o nome do produto na caixa de pesquisa
    cy.get('#search_product').type('Blue Top')

    // 6. Clique no botão de pesquisar
    cy.get('#submit_search').click()

    // 7. Verifique se o título dos resultados está visível
    cy.contains('Searched Products').should('be.visible')

    // 8. Verifique se existem produtos nos resultados
    cy.get('.features_items .product-image-wrapper')
        .should('have.length.greaterThan', 0)

    // 9. Verifique se o produto pesquisado aparece nos resultados
    cy.get('.features_items')
        .should('contain.text', 'Blue Top')

})   

it ('Exercício 10 - Verificar assinatura na página inicial', () => {

    // 1. Acesse o site
    cy.visit('https://www.automationexercise.com')

    // 2. Verifique se a página inicial está visível corretamente
    cy.contains('AutomationExercise').should('be.visible')

    // 3. Role até o rodapé
    cy.get('footer').scrollIntoView()

    // 4. Verifique se o texto SUBSCRIPTION está visível
    cy.contains('h2', 'Subscription', { matchCase: false })
        .should('be.visible')

    // 5. Insira um endereço de e-mail no campo de assinatura
    cy.get('#susbscribe_email')
        .type(`valeria-${Date.now()}@example.com`)

    // 6. Clique no botão de seta
    cy.get('#subscribe').click()

    // 7. Verifique se a mensagem de sucesso está visível
    cy.contains('You have been successfully subscribed!')
        .should('be.visible')

})

it ('Exercício 15 - Fazer pedido com cadastro antes do checkout', () => {

    // DADOS DO USUÁRIO
    const nome = 'Valeria Teste'
    const emailCadastro = `valeria-pedido-${Date.now()}@example.com`
    const senhaCadastro = 'Teste12345'

    // 1. Acesse o site
    cy.visit('https://www.automationexercise.com')

    // 2. Verifique se a página inicial está visível
    cy.contains('AutomationExercise').should('be.visible')

    // 3. Clique em Signup / Login
    cy.get('a[href*="login"]').click()

    // 4. Preencha o nome e o e-mail
    cy.get('[data-qa="signup-name"]').type(nome)
    cy.get('[data-qa="signup-email"]').type(emailCadastro)

    // 5. Clique em Signup
    cy.get('[data-qa="signup-button"]').click()

    // 6. Verifique se a área de cadastro está visível
    cy.contains('Enter Account Information').should('be.visible')

    // 7. Preencha as informações da conta
    cy.get('#id_gender2').check()
    cy.get('[data-qa="password"]').type(senhaCadastro)
    cy.get('[data-qa="days"]').select('1')
    cy.get('[data-qa="months"]').select('7')
    cy.get('[data-qa="years"]').select('1987')

    // 8. Marque as opções de inscrição
    cy.get('#newsletter').check()
    cy.get('#optin').check()

    // 9. Preencha o endereço
    cy.get('[data-qa="first_name"]').type('Valeria')
    cy.get('[data-qa="last_name"]').type('Teste')
    cy.get('[data-qa="company"]').type('Empresa Teste')
    cy.get('[data-qa="address"]').type('Rua Teste, 123')
    cy.get('[data-qa="country"]').select('Canada')
    cy.get('[data-qa="state"]').type('California')
    cy.get('[data-qa="city"]').type('San Francisco')
    cy.get('[data-qa="zipcode"]').type('12345')
    cy.get('[data-qa="mobile_number"]').type('999999999')

    // 10. Crie a conta
    cy.get('[data-qa="create-account"]').click()

    // 11. Verifique a criação da conta
    cy.contains('Account Created!').should('be.visible')

    // 12. Clique em Continue
    cy.get('[data-qa="continue-button"]').click()

    // 13. Verifique se o usuário está conectado
    cy.url().should('eq', 'https://www.automationexercise.com/')
    cy.contains('Products').should('be.visible')

    // 14. Acesse a página de produtos
    cy.contains('Products').click()

    // 15. Adicione o primeiro produto ao carrinho
    cy.get('.features_items .product-image-wrapper')
        .first()
        .contains('Add to cart')
        .click({ force: true })

    // 16. Acesse o carrinho
    cy.get('a[href="/view_cart"]').filter(':visible').first().click()

    // 17. Verifique se a página do carrinho está visível
    cy.url().should('include', '/view_cart')
    cy.get('#cart_info').should('be.visible')

    // 18. Prossiga para o checkout
    cy.contains('Proceed To Checkout').click()

    // 19. Verifique os endereços e o resumo do pedido
    cy.contains('Address Details').should('be.visible')
    cy.contains('Review Your Order').should('be.visible')

    // 20. Escreva um comentário sobre o pedido
    cy.get('textarea[name="message"]')
        .type('Pedido de teste automatizado do Exercício 15.')

    // 21. Clique em Place Order
    cy.contains('Place Order').click()

    // 22. Preencha os dados fictícios de pagamento
    cy.get('[data-qa="name-on-card"]').type('Valeria Teste')
    cy.get('[data-qa="card-number"]').type('4111111111111111')
    cy.get('[data-qa="cvc"]').type('123')
    cy.get('[data-qa="expiry-month"]').type('10')
    cy.get('[data-qa="expiry-year"]').type('2028')

    // 23. Confirme o pedido
    cy.get('[data-qa="pay-button"]').click()

    // 24. Verifique a confirmação do pedido
    cy.contains(
        /Congratulations! Your order has been confirmed!|Your order has been placed successfully!/i
    ).should('be.visible')

    // 25. Exclua a conta criada para o teste
    cy.get('a[href*="delete_account"]').click()

    // 26. Verifique a exclusão da conta
    cy.contains('Account Deleted!').should('be.visible')

    // 27. Continue
    cy.get('[data-qa="continue-button"]').click()

})


it ('Exercício 16 - Fazer pedido com login antes do checkout', () => {

    // DADOS DO USUÁRIO DE TESTE
    const nome = 'Valeria Teste 16'
    const emailTeste = `valeria-teste16-${Date.now()}@example.com`
    const senhaTeste = 'Teste12345'

    // 1. Acesse o site
    cy.visit('https://www.automationexercise.com')

    // 2. Verifique a página inicial
    cy.contains('AutomationExercise').should('be.visible')

    // 3. Acesse a tela de cadastro
    cy.get('a[href*="login"]').click()
    cy.get('[data-qa="signup-name"]').type(nome)
    cy.get('[data-qa="signup-email"]').type(emailTeste)
    cy.get('[data-qa="signup-button"]').click()

    // 4. Preencha as informações da conta
    cy.contains('Enter Account Information').should('be.visible')
    cy.get('#id_gender2').check()
    cy.get('[data-qa="password"]').type(senhaTeste)
    cy.get('[data-qa="days"]').select('1')
    cy.get('[data-qa="months"]').select('7')
    cy.get('[data-qa="years"]').select('1987')

    // 5. Preencha o endereço
    cy.get('[data-qa="first_name"]').type('Valeria')
    cy.get('[data-qa="last_name"]').type('Teste')
    cy.get('[data-qa="company"]').type('Empresa Teste')
    cy.get('[data-qa="address"]').type('Rua Teste, 123')
    cy.get('[data-qa="country"]').select('Canada')
    cy.get('[data-qa="state"]').type('California')
    cy.get('[data-qa="city"]').type('San Francisco')
    cy.get('[data-qa="zipcode"]').type('12345')
    cy.get('[data-qa="mobile_number"]').type('999999999')

    // 6. Crie a conta
    cy.get('[data-qa="create-account"]').click()
    cy.contains('Account Created!').should('be.visible')

    // 7. Continue e saia da conta
    cy.get('[data-qa="continue-button"]').click()
    cy.get('a[href*="logout"]').click()


// Preencher o e-mail
cy.get('[data-qa="login-email"]')
    .should('be.visible')
    .invoke('val', emailTeste)
    .trigger('input')
    .trigger('change')

// Preencher a senha
cy.get('[data-qa="login-password"]')
    .should('be.visible')
    .invoke('val', senhaTeste)
    .trigger('input')
    .trigger('change')

// Clicar em Login
cy.get('[data-qa="login-button"]').click()


    // 9. Verifique se o login foi realizado
    cy.contains(`Logged in as ${nome}`).should('be.visible')

    // 10. Acesse os produtos
    cy.contains('Products').click()

    // 11. Abra os detalhes do primeiro produto
    cy.get('.features_items .product-image-wrapper')
        .first()
        .contains('View Product')
        .click()

    // 12. Adicione o produto ao carrinho
    cy.get('button.cart').click()

    // 13. Acesse o carrinho pela janela de confirmação
    cy.get('#cartModal').should('be.visible')
    cy.get('#cartModal').contains('View Cart').click()

    // 14. Verifique o produto no carrinho
    cy.url().should('include', '/view_cart')
    cy.get('#cart_info tr[id^="product-"]')
        .should('have.length.greaterThan', 0)

    // 15. Prossiga para o checkout
    cy.contains('Proceed To Checkout').click()

    // 16. Verifique o endereço e o resumo do pedido
    cy.contains('Address Details').should('be.visible')
    cy.contains('Review Your Order').should('be.visible')

    // 17. Informe uma mensagem
    cy.get('textarea[name="message"]')
        .type('Pedido de teste automatizado do Exercício 16.')

    // 18. Faça o pedido
    cy.contains('Place Order').click()

    // 19. Preencha os dados fictícios de pagamento
    cy.get('[data-qa="name-on-card"]').type('Valeria Teste')
    cy.get('[data-qa="card-number"]').type('4111111111111111')
    cy.get('[data-qa="cvc"]').type('123')
    cy.get('[data-qa="expiry-month"]').type('10')
    cy.get('[data-qa="expiry-year"]').type('2028')

    // 20. Confirme o pagamento
    cy.get('[data-qa="pay-button"]').click()

    // 21. Verifique a confirmação do pedido
    cy.contains(
        /Congratulations! Your order has been confirmed!|Your order has been placed successfully!/i
    ).should('be.visible')

    // 22. Exclua a conta de teste
    cy.get('a[href*="delete_account"]').click()
    cy.contains('Account Deleted!').should('be.visible')

    // 23. Continue
    cy.get('[data-qa="continue-button"]').click()

})

 })