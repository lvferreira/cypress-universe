import login from '../support/pages/login'
import dashboard from '../support/pages/dashboard'

describe('login', function () {

    context('valid user', function () {

        const user = {
            name: 'Léo Ferreira',
            email: 'leo.ferreira@mail.io',
            password: 'pwd@123',
            is_provider: true
        }

        before(function () {
            cy.createUser(user)
        })

        it('should login successfully', function () {

            login.go()
            login.form(user)
            login.submit()

            dashboard.header.loggedIn(user.name)
        })

    })

    context('invalid e-mail', function () {

        const emails = [
            'barbershop.com.br',
            'samuraibs.com',
            '@gmail.com',
            '@', ,
            'samuraibs@',
            '999',
            '@#$%^&*',
            'xpto123'
        ]
        const alert = 'Informe um email válido'

        before(function () {
            login.go()
        })

        emails.forEach(function (email) {
            it('should not login with email: ' + email, function () {
                const user = { email: email, password: 'pwd123' }


                login.form(user)
                login.submit()

                login.alert.error(alert)
            })
        })

    })

    context('invalid password', function () {
        let user = {
            name: 'Celso Kamura',
            email: 'kamura@samuraibs.io',
            password: 'pwd@123',
            is_provider: true
        }

        before(function () {
            cy.createUser(user)
                .then(function () {
                    user.password = 'xpto#123'
                })
        })

        it('should notify credential error', function () {
            login.go()
            login.form(user)
            login.submit()

            const msg = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            login.toast.haveText(msg)
        })

    })

    context('required fields', function () {
        const alertMessages = [
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function () {
            login.go()
            login.submit()
        })

        alertMessages.forEach(function (err) {
            it('should alert message ' + err.toLowerCase(), function () {
                login.alert.error(err)
            })

        })
    })
})


