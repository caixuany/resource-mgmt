describe('Resource Management Frontend', () => {
  let baseUrl;
  before(() => {
    cy.task('startServer').then((url) => {
      baseUrl = url; // Store the base URL
      cy.visit(baseUrl);
    });
  });
  after(() => {
    return cy.task('stopServer'); // Stop the server after the report is done
  });

  it('should add a new resource', () => {
    // Open the modal and fill in the form
    cy.get('button[data-target="#resourceModal"]').click();
    cy.get('#name').type('Test Resource', { force: true });
    cy.get('#location').type('Test Location', { force: true });
    cy.get('#description').type('Test Description', { force: true });
    cy.get('#owner').type('test@example.com', { force: true });

    // Click the add resource button
    cy.get('button.btn-primary').contains('Add New Resource').click();

    // Verify the resource is in the table
    cy.get('#tableContent').contains('Test Resource').should('exist');
  });
  it('should view all resources', () => {
    cy.visit(baseUrl);

    // Ensure that the resource we just added is visible in the table
    cy.get('#tableContent').contains('Test Resource').should('exist');
  });
  it('should update an existing resource', () => {
    cy.visit(baseUrl);

    // Click the edit button for the resource
    cy.get('button.btn-warning').filter(':contains("Edit")').last().click();

    // // Update resource details
    cy.get('#editName').clear().type('Updated Resource', { force: true });
    cy.get('#editLocation').clear().type('Updated Location', { force: true });
    cy.get('#editDescription').clear().type('Updated Description', { force: true });
    cy.get('#editOwner').clear().type('updated@example.com', { force: true });

    // Click the update resource button
    cy.get('#updateButton').click();

    // Verify the resource is updated in the table
    cy.get('#tableContent').contains('Updated Resource').should('exist');
    cy.get('#tableContent').contains('Test Resource').should('not.exist');
  });
  it('should delete a resource', () => {
    cy.visit(baseUrl);
    cy.get('button.btn-danger').filter(':contains("Delete")').last().click();

    // Verify that the resource has been deleted
    cy.get('#tableContent').contains('Updated Resource').should('not.exist');
  });
});