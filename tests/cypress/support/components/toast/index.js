import { el } from './elements'

class Toaster {
    haveText(expectedMessage) {
        cy.get(el.toast)
            .should('be.visible')
            .find('p')
            .should('have.text', expectedMessage)
    }
}

export default new Toaster()