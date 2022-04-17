import { el } from './elements'

class Header {

    loggedIn(user) {
        cy.get(el.profile, { timeout: 10000 })
            .should('be.visible')
            .should('have.text', user.name)
    }

}

export default new Header()