import {useSearch} from "../support/actions";
import objectIDs from "../support/objectIDs";
import testObjectIDs from "../support/objectIDs";

const downloadsFolder = Cypress.config('downloadsFolder');

describe('Search', () => {
    beforeEach(() => {
        cy.visit('/ringtones-and-wallpapers')
    })
    it('searching for wallpapers by keyword.', () => {
        useSearch('flowers');
        cy.get(objectIDs.WALLPAPER_LIST)
            .find('a')
            .should('have.length.greaterThan', 0);
    });
});

    describe('wallpapers', () => {
        beforeEach(() => {
            cy.visit('/find/flowers');
        })
        after(() => {
            cy.task('deleteFile', `${downloadsFolder}/flowers.jpg`);

        })
            it('identifying free vs premium', () => {
                cy.get(testObjectIDs.WALLPAPER_LIST)
                    .eq(0)
                    .find(testObjectIDs.WALLPAPER_EACH_OBJECT)
                    .then(($wallpapers) => {
                        let premiumCount = 0;
                        let freeCount = 0;
                        $wallpapers.each((index, el) => {
                            if (Cypress.$(el).find(testObjectIDs.WALLPAPER_PREMIUM_BADGE).length > 0) {
                                premiumCount++;
                            } else {
                                freeCount++;
                            }
                        });
                        // Assertions to confirm both premium and free wallpapers
                        expect(premiumCount, 'At least one premium wallpaper should exist').to.be.greaterThan(0);
                        expect(freeCount, 'At least one free wallpaper should exist').to.be.greaterThan(0);

                        cy.log(`Premium wallpapers: ${premiumCount}`);
                        cy.log(`Free wallpapers: ${freeCount}`);
                    });
            })

            it('downloading free wallpaper', () => {
                cy.get(testObjectIDs.WALLPAPER_LIST)
                    .find('a')
                    .each(($el) => {
                        if (!Cypress.$($el).find(testObjectIDs.WALLPAPER_PREMIUM_BADGE).length) {
                            cy.wrap($el).click();
                            return false;
                        }
                    });


                cy.get(objectIDs.WALLPAPER_DOWNLOAD_BTTN,{timeout:3000})
                    .click();
                cy.get(objectIDs.WALLPAPER_CNTDWN),{timeout:15000}.should('exist');
                cy.get(objectIDs.WALLPAPER_CNTDWN).should('not.exist');
                // Verify that the file exists
                cy.readFile(`${downloadsFolder}/flowers.jpg`).should('exist');
            });

        })


