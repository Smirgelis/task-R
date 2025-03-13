import testObjectIDs from "../support/objectIDs";
export async function useSearch(word) {
    cy.get(testObjectIDs.SEARCH_FIELD).eq(0)
        .type(`${word}{enter}`);
    cy.url().should('include', `/find/${word}`);
}