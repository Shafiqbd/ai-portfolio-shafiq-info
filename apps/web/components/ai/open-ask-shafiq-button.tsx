"use client";

import { Button, type ButtonProps } from "@shafiq-info/ui";
import { ASK_SHAFIQ_OPEN_EVENT } from "@/lib/ask-shafiq-event";

export function OpenAskShafiqButton(props: Omit<ButtonProps, "onClick" | "type">) {
  return (
    <Button
      type="button"
      onClick={() => window.dispatchEvent(new Event(ASK_SHAFIQ_OPEN_EVENT))}
      {...props}
    />
  );
}
