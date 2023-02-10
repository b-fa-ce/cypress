/// <reference types="cypress" />

describe('Aliases', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');

    cy.get('[data-test="items"]').as('allItems');
    cy.get('[data-test="items-unpacked"]').as('unPackedItems');
    cy.get('[data-test="items-packed"]').as('packedItems');
    cy.get('[data-test="filter-items"]').as('filterInput');
  });

  it('should hold onto the filter input alias', () =>{
    const item = "iPhone";

    cy.get('@filterInput').type(item);

    cy.get('@allItems').should('contain.text', item);
    cy.get('@allItems').should('not.contain.text', 'Hoodie');



  });

  it('should move items from one list to the other', () => {
    // get first item of unpacked list
    cy.get('@unPackedItems').find('label').first().as('firstItem');

    // get text of first item
    cy.get('@firstItem').invoke('text').as('textFirstItem');

    // click first item
    cy.get('@firstItem').click();

    // check that clicked item is not there anymore
    cy.get('@textFirstItem').then(($text) => {
      cy.get('@unPackedItems').find('label').first().should('not.include.text', $text);
    });

    // check that clicked item is in packed list
    cy.get('@textFirstItem').then(($text) => {
      cy.get('@packedItems').find('label').first().should('include.text',$text);
    });

  })

});
