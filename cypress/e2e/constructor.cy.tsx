/// <reference types="cypress" />

describe('Burger Constructor Page', () => {
  beforeEach(() => {
    cy.intercept('GET', `api/ingredients`, { fixture: 'ingredients.json' }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    cy.clearLocalStorage('refreshToken');
  });

  describe('Добавление ингредиентов', () => {
    it('должен добавлять булку в конструктор', () => {
      cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa093c"]')
        .find('button[type="button"]')
        .click();

      cy.get('[data-cy="burger-constructor"]').contains('Краторная булка N-200i (верх)').should('exist');
      cy.get('[data-cy="burger-constructor"]').contains('Краторная булка N-200i (низ)').should('exist');
    });

    it('должен добавлять начинку в конструктор', () => {
      cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0941"]')
        .find('button[type="button"]')
        .click();

      cy.get('[data-cy="constructor-ingredients-list"]')
        .contains('Биокотлета из марсианской Магнолии')
        .should('exist');
    });

    it('должен добавлять соус в конструктор', () => {
      cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0942"]')
        .find('button[type="button"]')
        .click();

      cy.get('[data-cy="constructor-ingredients-list"]')
        .contains('Соус Spicy-X')
        .should('exist');
    });
  });

  describe('Модальное окно ингредиента', () => {
    it('должно открываться при клике на ингредиент', () => {
      cy.get('[data-cy="ingredient-link-643d69a5c3f7b9001cfa093c"]').click();

      cy.get('[id="modals"]').should('be.visible');
      cy.get('[id="modals"]').contains('Детали ингредиента').should('be.visible');
      cy.get('[id="modals"]').contains('Краторная булка N-200i').should('be.visible');
    });

    it('должно закрываться по клику на крестик', () => {
      cy.get('[data-cy="ingredient-link-643d69a5c3f7b9001cfa093c"]').click();
      cy.get('[id="modals"]').should('be.visible');

      cy.get('[data-cy="modal-close"]').click();

      cy.get('[id="modals"]').should('be.empty');
    });

    it('должно закрываться по клику на оверлей', () => {
      cy.get('[data-cy="ingredient-link-643d69a5c3f7b9001cfa093c"]').click();
      cy.get('[id="modals"]').should('be.visible');

      cy.get('[data-cy="modal-overlay"]').click({ force: true });

      cy.get('[id="modals"]').should('be.empty');
    });

    it('должно отображать данные именно того ингредиента, по которому кликнули', () => {
      cy.get('[data-cy="ingredient-link-643d69a5c3f7b9001cfa093c"]').click();

      cy.get('[id="modals"]').contains('Краторная булка N-200i').should('be.visible');
      cy.get('[id="modals"]').contains('420').should('be.visible');
      cy.get('[id="modals"]').contains('80').should('be.visible');
      cy.get('[id="modals"]').contains('24').should('be.visible');
    });
  });

  describe('Создание заказа', () => {
    beforeEach(() => {
      cy.setCookie('accessToken', 'Bearer mock-access-token');
      cy.window().then((win) => {
        win.localStorage.setItem('refreshToken', 'mock-refresh-token');
      });

      cy.intercept('GET', `api/auth/user`, { fixture: 'user.json' }).as('getUser');
      cy.intercept('POST', `api/orders`, { fixture: 'order.json' }).as('createOrder');

      cy.visit('/');
      cy.wait('@getIngredients');
    });

    it('должен оформить заказ и отобразить номер в модальном окне', () => {
      cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa093c"]')
        .find('button[type="button"]')
        .click();

      cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0941"]')
        .find('button[type="button"]')
        .click();

      cy.get('[data-cy="order-button"]').click();

      cy.wait('@createOrder');

      cy.get('[id="modals"]').should('be.visible');
      cy.get('[data-cy="order-number"]').should('contain', '101550');

      cy.get('[data-cy="modal-close"]').click();
      cy.get('[id="modals"]').should('be.empty');

      cy.get('[data-cy="constructor-bun-top"]').should('not.exist');
      cy.get('[data-cy="constructor-bun-bottom"]').should('not.exist');
      cy.get('[data-cy="constructor-ingredients-list"]')
        .contains('Биокотлета из марсианской Магнолии')
        .should('not.exist');
    });
  });
});