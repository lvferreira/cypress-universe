import { el } from './elements'

class Header {

    loggedIn(username) {
        cy.get(el.profile, { timeout: 10000 })
            .should('be.visible')
            .should('have.text', username)
    }

}

export default new Header()