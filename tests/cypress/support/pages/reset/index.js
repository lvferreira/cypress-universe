import { el } from './elements'
import toast from '../../components/toast'

class ResetPage {

    constructor() {
        this.toast = toast
    }

    go(token) {
        cy.visit('/reset-password?token=' + token)
    }

    form(pwd) {
        cy.get(el.password)
            .clear()
            .type(pwd)
        cy.get(el.confirm)
            .clear()
            .type(pwd)
    }

    submit() {
        cy.contains(el.buttonPwd)
            .click()
    }

}

export default new ResetPage()
