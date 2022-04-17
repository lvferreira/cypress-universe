import recovery from '../support/pages/recovery'
import reset from '../support/pages/reset'

describe('password recovery', function () {

    before(function () {
        cy.fixture('password')
            .then(function (password) {
                this.data = password
            })
    })

    context('user forgets password', function () {

        before(function () {
            cy.createUser(this.data)
        })

        it('should redeem password by email', function () {
            recovery.go()
            recovery.form(this.data.email)
            recovery.submit()

            const msg = 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.'
            recovery.toast.haveText(msg)
        })

    })

    context('user requests password recovery', function () {

        before(function () {
            cy.createUser(this.data)
            cy.redeemPwd(this.data.email)
        })

        it('should register new password', function () {

            const token = Cypress.env('recoveryToken')
            const pwd = 'xpto#2022'

            reset.go(token)
            reset.form(pwd)
            reset.submit()

            const msg = 'Agora você já pode logar com a sua nova senha secreta.'
            reset.toast.haveText(msg)

            // cy.wait(10000)
            // Agora você já pode logar com a sua nova senha secreta.
        })

    })

})