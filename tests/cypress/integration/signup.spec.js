import signupPage from '../support/pages/signup'

describe('signup', function () {

    before(function () {
        cy.fixture('signup')
            .then(function (signup) {
                this.valid_user = signup.valid_user
                this.invalid_user = signup.duplicate_email
                this.invalid_email = signup.invalid_email
                this.invalid_password = signup.invalid_password
            })
    })

    context('new user', function () {

        before(function () {
            // removing user so data is always valid
            cy.task('deleteUser', this.valid_user.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        it('should register a new user', function () {
            const user = this.valid_user
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            const msg = 'Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!'
            signupPage.toast.haveText(msg)
        })
    })

    context('duplicate email', function () {

        before(function () {
            cy.createUser(this.invalid_user)
        })

        it('should not register user', function () {
            signupPage.go()
            signupPage.form(this.invalid_user)
            signupPage.submit()
            const msg = 'Email já cadastrado para outro usuário.'
            signupPage.toast.haveText(msg)
        })
    })

    context('invalid email', function () {
        const err = 'Informe um email válido'

        it('should display alert message ' + err, function () {
            signupPage.go()
            signupPage.form(this.invalid_email)
            signupPage.submit()
            signupPage.alert.error(err)
        })
    })

    context('invalid password', function () {

        const password = ['1', '2a', 'ab3', 'abc4', 'ab#c5']
        const err = 'Pelo menos 6 caracteres'

        beforeEach(function () {
            signupPage.go()
        })

        password.forEach(function (pwd) {
            it('should display alert message ' + 'password: ' + pwd, function () {

                this.invalid_password.password = pwd

                signupPage.form(this.invalid_password)
                signupPage.submit()
            })
        })

        afterEach(function () {
            signupPage.alert.error(err)
        })
    })

    context('required fields', function () {
        const errors = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function () {
            signupPage.go()
            signupPage.submit()
        })

        errors.forEach(function (err) {
            it('should alert ' + err.toLowerCase(), function () {
                signupPage.alert.error(err)
            })

        })
    })
})