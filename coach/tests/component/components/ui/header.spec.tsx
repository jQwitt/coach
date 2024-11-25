import { mount } from "cypress/react18";

import Header, { HeaderLevel } from "@/components/ui/header";

describe("Header component", () => {
  it("renders page-level header", () => {
    mount(<Header title="Page Title" level={HeaderLevel.PAGE} />);

    cy.get("h2").should("contain", "Page Title");
    cy.get("h2").should("have.class", "text-6xl");
  });

  it("renders section-level header", () => {
    mount(<Header title="Section Title" level={HeaderLevel.SECTION} />);

    cy.get("h3").should("contain", "Section Title");
    cy.get("h3").should("have.class", "text-3xl");
  });

  it("renders sub-section-level header", () => {
    mount(<Header title="Sub-section Title" level={HeaderLevel.SUB_SECTION} />);

    cy.get("h6").should("contain", "Sub-section Title");
    cy.get("h6").should("have.class", "text-xl");
  });

  it("renders custom class", () => {
    mount(<Header title="Custom Title" className="custom-class" />);

    cy.get("h2").should("have.class", "custom-class");
  });
});
