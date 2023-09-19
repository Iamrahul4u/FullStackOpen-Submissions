describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND_URL")}/testing/reset`);
    const user = {
      name: "Rahul Gupta",
      username: "rahul123",
      password: "rahul123",
    };

    cy.request("POST", `${Cypress.env("BACKEND_URL")}/users`, user);
    cy.visit("");
  });

  it("Login form is shown", function () {
    cy.contains("login");
  });
  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("rahul123");
      cy.get("#password").type("rahul123");
      cy.contains("login").click();
      cy.contains("blogs");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("wrongusername");
      cy.get("#password").type("wrongpassword");
      cy.contains("login").click();
      cy.get(".error").should("contain", "Invalid username and password");
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
      cy.get(".error").should("have.css", "border-style", "solid");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "rahul123", password: "rahul123" });
    });

    it("A blog can be created", function () {
      cy.contains("Open Form").click();
      cy.get("#title").type("test Blog1");
      cy.get("#author").type("Rahul gupta");
      cy.get("#url").type("test url");
      cy.contains("button", "Create").click();
    });

    describe("Like After Creating a Blog", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "test blog",
          author: "rahul gupta",
          url: "test url",
          likes: 10,
        });
      });
      it("A blog can be Likes", function () {
        cy.contains("view").click();
        cy.contains("like").click();
        cy.contains("likes:1");
      });
      it("can delete a post", function () {
        cy.contains("view").click();
        cy.contains("delete").click();
      });
    });
    describe("Like After Creating a Blog", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "test blog",
          author: "rahul gupta",
          url: "test url",
          likes: 10,
        });
        cy.createBlog({
          title: "test blog1",
          author: "rahul gupta",
          url: "test url",
          likes: 11,
        });
      });
      it("A blog can be ordered", function () {
        cy.get(".blogs").should("contain", "test blog1");
      });
    });
  });
});
