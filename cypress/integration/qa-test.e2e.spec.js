import {
  captionMessage,
  dashboardHeading,
  dashboardTable,
  getName,
  invalidEmails,
  invalidPassword,
  login,
  passwordField,
  signOutButton,
  tableCellData,
  welcomeMessage,
} from './qa-test-selectors';

describe('Test users logs', () => {

  // log in page tests
  it('User can\t sign in with wrong email', () => {
    invalidEmails.forEach((email) => {
      login(email, 'password');
      cy.url().should('not.eq', '/dashboard');
    });
  });

  it('User can\t sign in with wrong password', () => {
    invalidPassword.forEach((password) => {
      login('john@example.com', password);
      cy.url().should('not.eq', '/dashboard');
    });
  });

  it('Password placeholder has 7 asterisks', () => {
    cy.visit('/');
    passwordField()
      .invoke('attr', 'placeholder')
      .should('contain', '*******');
  });

  //dashboard
  it('Welcome message is displayed', () => {
    login('john@example.com', 'password');
    
    welcomeMessage().should('contain', 'Welcome John Doe!');
  });

  it('User can sign out ', () => {
    login('anna@example.com', 'password');
   
    signOutButton().click();
    cy.url().should('eq', '/');
  });

  it('Dashboard has a caption ', () => {
    login('john@example.com', 'password');
    captionMessage().should('have.text', 'Live tail of log events');
  });

  // logs test
  it('John sees all logs', () => {
    login('john@example.com', 'password');
    getName().should('contain', 'Maria');
    getName().should('contain', 'John');
  });

  it('Maria sees her logs', () => {
    login('maria@example.com', 'password');
    getName().should('contain', 'Maria');
    getName().should('not.contain', 'John');
  });

  it('Anna doesn\t see logs', () => {
    login('anna@example.com', 'password');
    getName().should('not.contain', 'Maria');
    getName().should('not.contain', 'John');
    getName().should('not.contain', 'John');
  });

  it('Dashboard message if a user doesn\t have any logs', () => {
    login('anna@example.com', 'password');
    dashboardTable().should('have.text', "This user doesn't have any data yet");
  });

  // dashboard data
  it('Dashboard heading', () => {
    login('john@example.com', 'password');
    dashboardHeading()
      .eq(0)
      .should('contain', 'ID');
    dashboardHeading()
      .eq(1)
      .should('contain', 'User');
    dashboardHeading()
      .eq(2)
      .should('contain', 'Detail');
    dashboardHeading()
      .eq(3)
      .should('contain', 'Status');
    dashboardHeading()
      .eq(4)
      .should('contain', 'Label');

    it('First record is pending', () => {
      login('john@example.com', 'password');
      tableCellData()
        .eq(3)
        .should('contain', 'pending');
    });

    it('Second record is done', () => {
      login('john@example.com', 'password');
      tableCellData()
        .eq(8)
        .should('contain', 'done');
    });

    it('Third record is in progress', () => {
      login('john@example.com', 'password');
      tableCellData()
        .eq(13)
        .should('contain', 'in progress');
    });

    it('Forth record is done', () => {
      login('john@example.com', 'password');
      tableCellData()
        .eq(18)
        .should('contain', 'done');
    });

    it('Fifth record is pending', () => {
      login('john@example.com', 'password');
      tableCellData()
        .eq(23)
        .should('contain', 'pending');
    });

    it('Dashboard has 25 fields', () => {
      login('john@example.com', 'password');
      dashboardTable()
        .find('td')
        .its('length')
        .should('eq', 25);
    });
  });
});
