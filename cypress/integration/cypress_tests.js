/// <reference types="Cypress" />

//url for homepage
describe("The Home Page", () => {
  it("successfully loads", () => {
    cy.visit("http://localhost:3000");
    cy.wait(500);
  });
});

// url for stand page
describe("Standup pages url should be correct and loads successfully", () => {
  it("url is correct", () => {
    cy.visit("http://localhost:3000/rituals/standup");
    cy.url().should("include", "/rituals/standup");
    cy.url().should("eq", Cypress.config().baseUrl + "/rituals/standup");
    cy.url().should("contain", "/standup");
  });
});

// url for retros page
describe("Retro page url should be correct and loads successfully", () => {
  it("url is correct", () => {
    cy.visit("http://localhost:3000/rituals/retro");
    cy.url().should("include", "/rituals/retro");
    cy.url().should("eq", Cypress.config().baseUrl + "/rituals/retro");
    cy.url().should("contain", "/retro");
  });
});

// retro page button and cards
describe("Retro Test Facilitator", () => {
  it('finds the content of "Retro page ensuring all functionality is working"', () => {
    cy.visit("http://localhost:3000/");
    cy.contains("Retro").click();
    cy.url().should("include", "/rituals/retro");

    // get started button
    cy.get(".MuiButton-label").click();

    // facilitator button
    cy.get(":nth-child(3) > :nth-child(3)").click();

    // name input
    cy.get(":nth-child(3) > :nth-child(3)").type("stefan");

    // descroption input
    cy.get(":nth-child(3) > :nth-child(5)").type("description");

    // pick retro
    cy.get(".MuiSelect-root").click();

    // starfish small
    cy.get('[data-value="1"]').click();

    // pick retro
    cy.get(".MuiSelect-root").click();

    // starfish large
    cy.get('[data-value="2"]').click();

    // pick retro
    cy.get(".MuiSelect-root").click();

    // start, stop, continue
    cy.get('[data-value="3"]').click();

    // pick retro
    cy.get(".MuiSelect-root").click();

    // mad, sad, glad
    cy.get('[data-value="4"]').click();

    // pick retro
    cy.get(".MuiSelect-root").click();

    // one word retro
    cy.get('[data-value="5"]').click();

    // pick retro
    cy.get(".MuiSelect-root").click();

    // Kalm retro
    cy.get('[data-value="6"]').click();

    // copy link
    cy.get(
      ":nth-child(11) > .MuiInputBase-root > .MuiInputAdornment-root > .MuiIconButton-root > .MuiIconButton-label > .MuiButtonBase-root > .MuiButton-label > .MuiSvgIcon-root"
    ).click();

    // room id
    cy.get(
      ":nth-child(13) > .MuiInputBase-root > .MuiInputAdornment-root > .MuiIconButton-root > .MuiIconButton-label > .MuiButtonBase-root > .MuiButton-label"
    ).click();

    // start session
    cy.get(":nth-child(3) > :nth-child(19)").click();

    // add card to first column and add text
    cy.get(
      ":nth-child(1) > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiPaper-root > .MuiButtonBase-root > .MuiButton-label"
    ).click();
    cy.get('[rows="4"]').type("Sprint planning for the next sprint");

    // add card to second column and add text
    cy.get(
      ":nth-child(2) > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiPaper-root > .MuiButtonBase-root > .MuiButton-label"
    ).click();
    cy.get(
      ':nth-child(2) > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .columnWrapper > .MuiPaper-root > [rows="4"]'
    ).type("Seek help with blockers from the team");

    // add card to third column and add text
    cy.get(
      ":nth-child(3) > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiPaper-root > .MuiButtonBase-root > .MuiButton-label"
    ).click();
    cy.get(
      ':nth-child(3) > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .columnWrapper > .MuiPaper-root > [rows="4"]'
    ).type("Energisers");

    // dislike button
    cy.get(
      ":nth-child(1) > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .columnWrapper > .MuiPaper-root > .MuiButtonGroup-root > :nth-child(2) > .MuiButton-label"
    ).click();

    // like button
    cy.get(
      ":nth-child(2) > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .columnWrapper > .MuiPaper-root > .MuiButtonGroup-root > :nth-child(3) > .MuiButton-label"
    ).click();

    // like button
    cy.get(
      ":nth-child(3) > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .columnWrapper > .MuiPaper-root > .MuiButtonGroup-root > :nth-child(3) > .MuiButton-label"
    ).click();

    // delete button
    cy.get(
      ":nth-child(1) > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .columnWrapper > .MuiPaper-root > .deleteIconContainer > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root"
    ).click();

    // delete button
    cy.get(
      ":nth-child(2) > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .columnWrapper > .MuiPaper-root > .deleteIconContainer > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root"
    ).click();

    // delete button
    cy.get(
      ".deleteIconContainer > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root"
    ).click();
  });
});

// retro page button and cards
// describe("Retro Test - Participant", () => {
//   it('finds the content of "Retro page ensuring all functionality is working"', () => {
//     cy.visit("http://localhost:3000/");
//     cy.contains("Retro").click();
//     cy.url().should("include", "/rituals/retro");

//     // get started button
//     cy.get(".MuiButton-label").click();

//     // participant 🔲
//     cy.get(":nth-child(3) > :nth-child(5)").click();

//     // partipant 📛
//     cy.get("main > :nth-child(1) > :nth-child(3) > :nth-child(2)").type(
//       "Tommy"
//     );
//     cy.get('[value=""]').type("FtjgOrPEDLprDcWNHs9Tz");

//     cy.get(":nth-child(3) > :nth-child(8)").click();
//   });
// });

describe("Standup Test", () => {
  it('finds the content "Stand Up page and ensure all functionalty is working"', () => {
    cy.visit("http://localhost:3000");
    //select stand up button by content and click
    cy.contains("Stand Up").click();
    //check url is correct for redirect
    cy.url().should("include", "/rituals/standup");
    cy.get(".MuiButton-label").click();
    //click get started button
    // cy.get(".getStartedPage > .MuiButtonBase-root").click();
    // select time per speaker and clears default time text warning displays for time limits
    cy.get(":nth-child(2) > .MuiInputBase-root > .MuiInputBase-input").clear();
    cy.wait(500);
    //select time per speaker and resets to 1 minute
    cy.get(":nth-child(2) > .MuiInputBase-root > .MuiInputBase-input").type(1);
    //select time between speakers and clears default text warning displays for time recommendation
    cy.get(":nth-child(3) > .MuiInputBase-root > .MuiInputBase-input").clear();
    //select time between speakers and set to 5 secs
    cy.get(":nth-child(3) > .MuiInputBase-root > .MuiInputBase-input").type(5);
    //select add participant text field and add "Jon"
    cy.get(
      ".participantCardsList > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input"
    ).type("Jon");
    cy.wait(200);
    // click add participant button
    cy.get(".participantCardsList > .MuiButtonBase-root").click();
    //select add participant text field and add "Kawalpreet"
    cy.get(
      ".participantCardsList > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input"
    ).type("Kawalpreet");
    cy.wait(200);
    // click add participant button
    cy.get(".participantCardsList > .MuiButtonBase-root").click();

    // click add participant button
    cy.get(".participantCardsList > .MuiButtonBase-root").click();

    // click add participant button
    cy.get(".participantCardsList > .MuiButtonBase-root").click();
    //select start stand up button and click
    cy.get("center > .MuiButton-contained").click();
    cy.wait(9000);
    //pause stand up
    cy.get(".MuiFab-root").click();
    cy.wait(2000);
    //resume standup
    cy.get(".MuiFab-root").click();
    cy.wait(2000);

    //click next participant button
    cy.get(".MuiButton-root").click();
    cy.wait(9000);

    //click end stand up button
    cy.get(".MuiButton-root").click();
  });
});

// describe("user page Test", () => {
//   it("finds the content of the user page", () => {
//     cy.visit("http://localhost:3000/");

//     cy.get(".btn").click();
//     cy.login();
//   });
// });

// end of test
