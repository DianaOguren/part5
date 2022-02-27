describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('5.17: Login form is shown', function() {
    cy.get('.loginform')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('5.18: Login',function() {
    beforeEach(function(){
      const user = {
        name: 'Alex',
        username: 'Alex',
        password: '123'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.visit('http://localhost:3000')
    })

    it('succeeds with correct credentials', function() {
      cy.get('input:first').type('Alex')
      cy.get('input:last').type('123')
      cy.get('button').click()

      cy.contains('Alex logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('input:first').type('Alex')
      cy.get('input:last').type('wrong_password')
      cy.get('button').click()

      cy.get('.error').should('contain', 'wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'Alex logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      const user = {
        name: 'Alex',
        username: 'Alex',
        password: '123'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.visit('http://localhost:3000')
      cy.get('input:first').type('Alex')
      cy.get('input:last').type('123')
      cy.get('button').click()
    })

    it('5.19: A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Digital Photography School')
      cy.get('#author').type('Darren Rowse')
      cy.get('#url').type('https://www.digital-photography-school.com/')
      cy.get('#likes').type('2500')
      cy.get('#addbutton').click()
      cy.contains('Digital Photography School by Darren Rowse')
    })

    it('5.20: Users can like a blog', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Digital Photography School')
      cy.get('#author').type('Darren Rowse')
      cy.get('#url').type('https://www.digital-photography-school.com/')
      cy.get('#likes').type('2500')
      cy.get('#addbutton').click()

      cy.get('#viewbutton').click()
      cy.get('#likebutton').click()
      cy.contains('2501')
    })

    it('5.21: User who created a blog can delete it', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Digital Photography School')
      cy.get('#author').type('Darren Rowse')
      cy.get('#url').type('https://www.digital-photography-school.com/')
      cy.get('#likes').type('2500')
      cy.get('#addbutton').click()

      cy.get('#viewbutton').click()
      cy.get('#deletebutton').click()
      cy.get('html').should('not.contain', '#blog')
    })

    it('5.22: Blogs are ordered according to likes with the blog with the most likes being first', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Digital Photography School')
      cy.get('#author').type('Darren Rowse')
      cy.get('#url').type('https://www.digital-photography-school.com/')
      cy.get('#likes').type('2500')
      cy.get('#addbutton').click()

      cy.wait(5000)

      cy.contains('create new blog').click()

      cy.get('#title').clear().type('Artist School')
      cy.get('#author').clear().type('Tom Holand')
      cy.get('#url').clear().type('https://www.artist.com/')
      cy.get('#likes').clear().type('2501')
      cy.get('#addbutton').click()

      cy.wait(5000)

      cy.contains('create new blog').click()
      cy.get('#title').clear().type('Photo Studio')
      cy.get('#author').clear().type('Amily Clark')
      cy.get('#url').clear().type('https://www.studio.com/')
      cy.get('#likes').clear().type('2502')
      cy.get('#addbutton').click()

      cy.wait(5000)

      cy.get('#allblogs')
        .then(($els) => Cypress._.map($els, 'innerText'))
        .should('be.an', 'array')
        .and('deep.equal', ['Photo Studio by Amily Clark\nview\nArtist School by Tom Holand\nview\nDigital Photography School by Darren Rowse\nview'])
    })
  })
})
