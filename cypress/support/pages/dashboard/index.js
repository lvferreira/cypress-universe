import { el } from './elements'
import header from '../../components/header'

class Dashboard {

    constructor() {
        this.header = header
    }

    calendarShouldBeVisible() {
        cy.get(el.calendar)
            .should('be.visible')
    }

    selectDay(appointmentDate) {
        let today = new Date()
        let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

        if (today.getDate() === lastDayOfMonth.getDate()) {
            cy.log('Last Day of Month')
            cy.get(el.nextButton)
                .should('be.visible')
                .click()

            let monthName
            switch (appointmentDate.getMonth()) {
                case 0:
                    monthName = 'Janeiro'
                    break;
                case 1:
                    montName = 'Fevereiro'
                    break;
                case 2:
                    montName = 'Março'
                    break;
                case 3:
                    montName = 'Abril'
                    break;
                case 4:
                    montName = 'Maio'
                    break;
                case 5:
                    montName = 'Junho'
                    break;
                case 6:
                    montName = 'Julho'
                    break;
                case 7:
                    montName = 'Agosto'
                    break;
                case 8:
                    montName = 'Setembro'
                    break;
                case 9:
                    montName = 'Outubro'
                    break;
                case 10:
                    montName = 'Novembro'
                    break;
                case 11:
                    montName = 'Dezembro'
                    break;
                default:
                    break;
            }
            cy.contains(el.dateTitle, monthName)
                .should('be.visible')

        } else {
            cy.log('Not Last Day of Month')
        }

        cy.log(today.toString())
        cy.log(lastDayOfMonth.toString())

        const target = new RegExp('^' + appointmentDate.getDate() + '$', 'g')
        cy.contains(el.dayBox, target)
            .click({ force: true })
    }

    appointmentShouldBeVisible(customer, hour) {
        cy.contains('div', customer.name)
            .should('be.visible')
            .parent()
            .contains(el.hourBox, hour)
            .should('be.visible')
    }

}

export default new Dashboard()