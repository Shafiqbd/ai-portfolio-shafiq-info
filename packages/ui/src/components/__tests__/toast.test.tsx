import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastProvider, useToast } from "../toast";
import { Button } from "../button";

function TriggerButton() {
  const { showToast } = useToast();
  return (
    <Button
      onClick={() =>
        showToast({ title: "Saved", description: "Your changes were saved.", variant: "success" })
      }
    >
      Save
    </Button>
  );
}

describe("Toast", () => {
  it("shows a toast after the trigger is invoked", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <TriggerButton />
      </ToastProvider>,
    );

    expect(screen.queryByText("Saved")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(await screen.findByText("Saved")).toBeInTheDocument();
    expect(screen.getByText("Your changes were saved.")).toBeInTheDocument();
  });
});
