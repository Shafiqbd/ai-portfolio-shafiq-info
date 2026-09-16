import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { Modal } from "../modal";

function ControlledModal() {
  const [open, setOpen] = useState(true);
  return (
    <Modal open={open} onOpenChange={setOpen} title="Confirm action" description="Are you sure?">
      <p>Modal body content</p>
    </Modal>
  );
}

describe("Modal", () => {
  it("renders title, description, and children when open", () => {
    render(<ControlledModal />);
    expect(screen.getByText("Confirm action")).toBeInTheDocument();
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    expect(screen.getByText("Modal body content")).toBeInTheDocument();
  });

  it("does not render content when closed", () => {
    render(<Modal open={false} onOpenChange={vi.fn()} title="Hidden modal" />);
    expect(screen.queryByText("Hidden modal")).not.toBeInTheDocument();
  });

  it("closes on Escape (keyboard accessible)", async () => {
    const user = userEvent.setup();
    render(<ControlledModal />);
    expect(screen.getByText("Confirm action")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByText("Confirm action")).not.toBeInTheDocument();
  });

  it("closes via the close button", async () => {
    const user = userEvent.setup();
    render(<ControlledModal />);
    await user.click(screen.getByRole("button", { name: /close/i }));
    expect(screen.queryByText("Confirm action")).not.toBeInTheDocument();
  });
});
