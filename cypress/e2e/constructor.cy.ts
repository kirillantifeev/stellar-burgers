//<reference types="cypress"/>

describe('add ingredients to constructor', () => {
    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
        cy.viewport(1300, 800);
        cy.visit('http://localhost:4000')
        
    })

    it('add bun', () => {
        cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
        cy.wait(500); 
        cy.get('[data-cy=constructor-bun-1]')
          .contains('Булка 1').should('exist');
        cy.get('[data-cy=constructor-bun-2]')
          .contains('Булка 1').should('exist');
    });
})

describe('modal works currectly', () => {
    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
        cy.viewport(1300, 800);
        cy.visit('http://localhost:4000')
        
    })

    it('open modal', () => {
        cy.contains('Детали ингредиента').should('not.exist');
        cy.contains('Булка 1').click();
        cy.contains('Детали ингредиента').should('exist');
        cy.get('#modals').contains('Булка 1').should('exist');
    });

    it('close modal', () => {
        cy.contains('Булка 1').click();
        cy.contains('Детали ингредиента').should('exist');
        cy.get('#modals button[aria-label="Закрыть"]').click();
        cy.contains('Детали ингредиента').should('not.exist');
    });

    it('close modal overlay', () => {
        cy.contains('Булка 1').click();
        cy.contains('Детали ингредиента').should('exist');
        cy.get('[data-cy=overlay-modal]').click('left', {force: true});
        cy.contains('Детали ингредиента').should('not.exist');
    });
})

describe('order test', () => {
    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'}).as('ingredients');
        cy.intercept('GET', 'api/auth/user', {fixture: 'user.json'});
        cy.intercept('POST', 'api/orders', {fixture: 'post_order.json'}).as('postOrder');

        window.localStorage.setItem('refreshToken', JSON.stringify('test-refershToken'));
        cy.setCookie('accessToken', 'test-accessToken');

        cy.viewport(1300, 800);
        cy.visit('http://localhost:4000')
    })

    afterEach(() => {
        cy.clearLocalStorage();
        cy.clearCookies()
    })

    it('order burger', () => {
        cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
        cy.get('[data-cy=main-ingredients]').contains('Добавить').click();
        cy.get('[data-cy=sauce-ingredients]').contains('Добавить').click();
        cy.get('[data-cy=order-add]').click();

        cy.get('#modals').contains('12345').should('exist');

        cy.get('#modals button[aria-label="Закрыть"]').click();
        cy.get('#modals').contains('12345').should('not.exist');

        cy.get('[data-cy=constructor-bun-1-empty]').should('exist');
        cy.get('[data-cy=constructor-bun-2-empty]').should('exist');
        cy.get('[data-cy=constructor-ingredients-empty]').should('exist');

    })

})
