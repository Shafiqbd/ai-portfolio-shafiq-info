import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";

function Example() {
  return (
    <Tabs defaultValue="one">
      <TabsList>
        <TabsTrigger value="one">One</TabsTrigger>
        <TabsTrigger value="two">Two</TabsTrigger>
      </TabsList>
      <TabsContent value="one">Content one</TabsContent>
      <TabsContent value="two">Content two</TabsContent>
    </Tabs>
  );
}

describe("Tabs", () => {
  it("shows the default tab's content", () => {
    render(<Example />);
    expect(screen.getByText("Content one")).toBeVisible();
  });

  it("switches content on click", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("tab", { name: "Two" }));
    expect(screen.getByText("Content two")).toBeVisible();
  });

  it("switches tabs via arrow-key keyboard navigation", async () => {
    const user = userEvent.setup();
    render(<Example />);
    screen.getByRole("tab", { name: "One" }).focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Two" })).toHaveFocus();
  });
});
