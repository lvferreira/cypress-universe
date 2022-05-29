import { el } from './elements'

class Header {

    loggedIn(username) {
        cy.get(el.profile)
            .should('be.visible')
            .should('have.text', username)
    }

}

export default new Header()