describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {

    cy.get('#firstName').type('Maycon')
    cy.get('#lastName').type('Placco')
    cy.get('#email').type('maycon@email.com')

    cy.get('#open-text-area')
      .type(
        'Este é um texto longo para testar o preenchimento rápido do campo de mensagem utilizando o Cypress com delay zero.',
        { delay: 0 }
      )

    cy.contains('button', 'Enviar').click()


    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {

    cy.get('#firstName').type('Maycon')
    cy.get('#lastName').type('Placco')
    cy.get('#email').type('mayconemail.com') // email inválido

    cy.get('#open-text-area')
      .type('Tentando enviar o formulário com email inválido', { delay: 0 })

   cy.contains('button', 'Enviar').click()


    cy.get('.error').should('be.visible')
  })

  it('não aceita caracteres não numéricos no campo telefone', () => {

  cy.get('#phone')
    .type('abcde')
    .should('have.value', '')

})

it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {

  cy.get('#firstName').type('Maycon')
  cy.get('#lastName').type('Placco')
  cy.get('#email').type('maycon@email.com')

  // Marca o checkbox Telefone (agora usando .check())
  cy.get('input[type="checkbox"][value="phone"]')
    .check()

  // Envia o formulário sem preencher o telefone
  cy.get('button[type="submit"]').click()

  // Verifica se a mensagem de erro é exibida
  cy.get('.error')
    .should('be.visible')

})

it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {

  cy.get('#firstName')
    .type('Maycon')
    .should('have.value', 'Maycon')
    .clear()
    .should('have.value', '')

  cy.get('#lastName')
    .type('Placco')
    .should('have.value', 'Placco')
    .clear()
    .should('have.value', '')

  cy.get('#email')
    .type('maycon@email.com')
    .should('have.value', 'maycon@email.com')
    .clear()
    .should('have.value', '')

  cy.get('#phone')
    .type('11999999999')
    .should('have.value', '11999999999')
    .clear()
    .should('have.value', '')
})

it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {

  cy.contains('button', 'Enviar').click()

  cy.get('.error').should('be.visible')
})

it('envia o formulário com sucesso usando um comando customizado', () => {
  cy.fillMandatoryFieldsAndSubmit()
  cy.get('.success').should('be.visible')
})

it('seleciona um produto (YouTube) por seu texto', () => {

  cy.get('#product')
    .select('YouTube')

  cy.get('#product')
    .should('have.value', 'youtube')

})

it('seleciona um produto (Mentoria) por seu valor (value)', () => {

  cy.get('#product')
    .select('mentoria')

  cy.get('#product')
    .should('have.value', 'mentoria')

})

it('seleciona um produto (Blog) por seu índice', () => {

  cy.get('#product')
    .select(1)

  cy.get('#product')
    .should('have.value', 'blog')

})

it('marca o tipo de atendimento "Feedback"', () => {

  cy.get('input[type="radio"][value="feedback"]')
    .check()

  cy.get('input[type="radio"][value="feedback"]')
    .should('be.checked')

})

it('marca cada tipo de atendimento', () => {

  cy.get('input[type="radio"]').each(($radio) => {
    cy.wrap($radio)
      .check()
      .should('be.checked')
  })

})

it('marca ambos checkboxes, depois desmarca o último', () => {

  cy.get('input[type="checkbox"]')
    .check()

  cy.get('input[type="checkbox"]')
    .should('be.checked')

  cy.get('input[type="checkbox"]')
    .last()
    .uncheck()

  cy.get('input[type="checkbox"]')
    .last()
    .should('not.be.checked')

})

it('seleciona um arquivo da pasta fixtures', () => {

  cy.get('input[type="file"]')
    .selectFile('cypress/fixtures/example.json')

  cy.get('input[type="file"]').should(($input) => {
    expect($input[0].files[0].name).to.equal('example.json')
  })

})

it('seleciona um arquivo simulando um drag-and-drop', () => {

  cy.get('input[type="file"]')
    .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })

  cy.get('input[type="file"]').should(($input) => {
    expect($input[0].files[0].name).to.equal('example.json')
  })

})
it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {

  cy.fixture('example.json').as('arquivo')

  cy.get('input[type="file"]')
    .selectFile('@arquivo')

  cy.get('input[type="file"]').should(($input) => {
    expect($input[0].files[0].name).to.equal('example.json')
  })

})

it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {

  cy.get('#privacy a')
    .should('have.attr', 'target', '_blank')

})
it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {

  cy.get('#privacy a')
    .invoke('removeAttr', 'target')
    .click()

  cy.contains('CAC TAT - Política de Privacidade')
    .should('be.visible')

})
it('testa a página da política de privacidade de forma independente', () => {

  cy.visit('./src/privacy.html')

  cy.contains('CAC TAT - Política de Privacidade')
    .should('be.visible')

})


})
