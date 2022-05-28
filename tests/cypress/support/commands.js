// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import moment from 'moment'
import { apiServer } from '../../cypress.json'
import dashboard from './pages/dashboard'
import login from './pages/login'

Cypress.Commands.add('webLogin', function (user) {
    login.go()
    login.form(user)
    login.submit()
    dashboard.header.loggedIn(user.name)
})

Cypress.Commands.add('createUser', function (user) {
    cy.task('deleteUser', user.email)
        .then(function (result) {
            console.log(result)
        })
    cy.request({
        method: 'POST',
        url: apiServer + '/users',
        body: user
    }).then(function (response) {
        expect(response.status).to.eq(200)
    })
})

Cypress.Commands.add('redeemPwd', function (email) {
    cy.request({
        method: 'POST',
        url: apiServer + '/password/forgot',
        body: { email: email }
    }).then(function (response) {
        expect(response.status).to.eq(204)

        cy.task('findToken', this.data.email)
            .then(function (result) {
                Cypress.env('recoveryToken', result.token)
            })
    })
})

Cypress.Commands.add('createAppointment', function (hour) {

    let now = new Date()
    now.setDate(now.getDate() + 1)

    Cypress.env('appointmentDate', now)

    const date = moment(now).format(`YYYY-MM-DD ${hour}:00`)
    const id = Cypress.env('providerId')

    const payload = {
        provider_id: id,
        date: date
    }

    cy.request({
        method: 'POST',
        url: apiServer + '/appointments',
        body: payload,
        headers: {
            authorization: 'Bearer ' + Cypress.env('authToken')
        }
    }).then(function (response) {
        expect(response.status).to.eq(200)
    })

})

Cypress.Commands.add('setProviderID', function (email) {

    cy.request({
        method: 'GET',
        url: apiServer + '/providers',
        headers: {
            authorization: 'Bearer ' + Cypress.env('authToken')
        }
    }).then(function (response) {
        expect(response.status).to.eq(200)
        console.log(response.body)

        const providers = response.body

        providers.forEach(function (provider) {
            if (provider.email === email) {
                Cypress.env('providerId', provider.id)
            }
        })
    })

})

Cypress.Commands.add('apiLogin', function (user, setLocalStorage) {

    const payload = {
        email: user.email,
        password: user.password
    }

    cy.request({
        method: 'POST',
        url: apiServer + '/sessions',
        body: payload
    }).then(function (response) {
        expect(response.status).to.eq(200)
        Cypress.env('authToken', response.body.token)

        if (setLocalStorage) {
            const { token, user } = response.body

            window.localStorage.setItem('@Samurai:token', token)
            window.localStorage.setItem('@Samurai:user', JSON.stringify(user))
        }

    })

    if (setLocalStorage) cy.visit('/dashboard')

})