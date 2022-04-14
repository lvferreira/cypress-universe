import signupPage from '../support/pages/signup'

describe('signup', function () {

    context('new user', function () {
        // test data
        const user = {
            name: 'Léo Ferreira',
            email: 'leo.ferreira@mail.io',
            password: 'pwd@123'
        }

        before(function () {
            // removing user so data is always valid
            cy.task('deleteUser', user.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        it('should register a new user', function () {
            // accessing registration page
            signupPage.go()
            // filling & submitting the registration form
            signupPage.form(user)
            signupPage.submit()
            //  expected result assertion
            const msg = 'Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!'
            signupPage.toast.haveText(msg)
        })
    })

    context('duplicate email', function () {
        const user = {
            name: 'João Lucas',
            email: 'joao.lucas@mail.io',
            password: 'pwd@123',
            is_provider: true
        }

        before(function () {
            cy.task('deleteUser', user.email)
                .then(function (result) {
                    console.log(result)
                })

            cy.request(
                'POST',
                'http://localhost:3333/users',
                user
            ).then(function (response) {
                expect(response.status).to.eq(200)
            })
        })

        it('should not register user', function () {
            // accessing registration page
            signupPage.go()
            // filling & submitting the registration form
            signupPage.form(user)
            signupPage.submit()
            //  expected result assertion
            const msg = 'Email já cadastrado para outro usuário.'
            signupPage.toast.haveText(msg)
        })
    })

    context('invalid email', function () {
        const user = {
            name: 'Liza Olsen',
            email: 'liza.mail.io',
            password: 'pwd@123',
            is_provider: true
        }
        const msg = 'Informe um email válido'

        it('should display alert message ' + msg, function () {
            signupPage.go()

            signupPage.form(user)
            signupPage.submit()

            signupPage.alertError(msg)
        })
    })

    context('invalid password', function () {

        const password = ['1', '2a', 'ab3', 'abc4', 'ab#c5']
        const msg = 'Pelo menos 6 caracteres'

        beforeEach(function () {
            signupPage.go()
        })

        password.forEach(function (pwd) {
            it('should display alert message ' + msg + " password: " + pwd, function () {
                const user = {
                    name: 'Liza Olsen',
                    email: 'liza.olsen@mail.io',
                    password: pwd
                }
                signupPage.form(user)
                signupPage.submit()
            })
        })

        afterEach(function () {
            signupPage.alertError(msg)
        })
    })

    context('required fields', function () {
        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function () {
            signupPage.go()
            signupPage.submit()
        })

        alertMessages.forEach(function (msg) {
            it('should alert ' + msg.toLowerCase(), function () {
                signupPage.alertError(msg)
            })

        })
    })
})