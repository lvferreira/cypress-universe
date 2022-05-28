import dashboard from '../support/pages/dashboard'
import { customer, provider, appointment } from '../support/factories/appointment'

describe('appointments', function () {

    context('customer makes an appointment in the mobile app', function () {

        before(function () {
            cy.createUser(provider)
            cy.createUser(customer)

            cy.apiLogin(customer)

            cy.setProviderID(provider.email)
            cy.createAppointment(appointment.hour)

        })

        it('should be displayed in dashboard', function () {
            const date = Cypress.env('appointmentDate')

            // cy.webLogin(provider)
            cy.apiLogin(provider, true)

            dashboard.calendarShouldBeVisible()
            dashboard.selectDay(date)
            dashboard.appointmentShouldBeVisible(customer, appointment.hour)

        })

    })

})