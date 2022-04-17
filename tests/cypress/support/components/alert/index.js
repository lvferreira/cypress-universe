import { el } from './elements'

class Alert {
    error(err) {
        cy.contains(el.error, err)
            .should('be.visible')
    }
}

export default new Alert()