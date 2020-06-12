describe('The Login Page', () => {
  const currentUser = {
    username: Math.random().toString(36).slice(-8),
    name: 'zero_waste_e2e_test_user',
    email: 'test@gmail.com',
    password: Math.random().toString(36).slice(-8)
  };
  beforeEach(() => {
    cy.request('POST', '/users/register', currentUser);
  });

  it('sets auth cookie when logging in via form submission', function () {
    cy.visit('/login');

    cy.get('input[name=username]').type(currentUser.username);

    // {enter} causes the form to submit
    cy.get('input[name=password]').type(`${currentUser.password}{enter}`);

    // we should be redirected to /dashboard
    cy.url().should('include', '/profile');

    // UI should reflect this user being logged in
    cy.get('.user-profile-data > h5').should('contain', currentUser.name);
    cy.get('.user-profile-data > h6').first().should('contain', currentUser.username);
    cy.get('.user-profile-data > h6').last().should('contain', currentUser.email);
  })
});
