export const login = (username, password) => {
  cy.visit('/');
  usernameField()
    .click()
    .type(username);
  passwordField()
    .click()
    .type(password);
  cy.get("[data-test='login-submit']").click();
};

export const getName = () => cy.get('.css-0');
export const passwordField = () => cy.get('#field-2');
export const usernameField = () => cy.get('#field-1');
export const signOutButton = () => cy.get('button');
export const dashboardTable = () => cy.get('.css-3alikt');
export const dashboardHeading = () => cy.get('.css-1uiq6v0');
export const captionMessage = () => cy.get('.css-v0xjx2');
export const tableCellData = () => cy.get('td');
export const welcomeMessage = () => cy.get('.chakra-ui-light');

export const invalidEmails = [
  'Abc.example.com',
  'A@b@c@example.com',
  'a"b(c)d,e:f;g<h>i[jk]l@example.com',
  'just"not"right@example.com',
  'this is"notallowed@example.com',
  'his still"not\\allowed@example.com',
  'Abc@examplecom',
  'Abc@',
  '@example.com',
];

export const invalidPassword = ['pass', '12234', 'a"b(c)d,e:f;g<h>i[jk]l', 'password1', 'PasswordAnna'];
