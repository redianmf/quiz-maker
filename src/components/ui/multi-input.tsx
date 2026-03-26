"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

type MultiInputProps = {
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
};

export const MultiInput = ({
  value = [],
  onChange,
  placeholder = "Type and press Enter...",
  disabled,
}: MultiInputProps) => {
  const [input, setInput] = React.useState("");

  const addItem = (item: string) => {
    const trimmed = item.trim();
    if (!trimmed) return;

    if (value.includes(trimmed)) return;

    onChange?.([...value, trimmed]);
    setInput("");
  };

  const removeItem = (item: string) =>
    onChange?.(value.filter((v) => v !== item));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem(input);
    }

    if (e.key === "Backspace" && !input && value.length > 0) {
      removeItem(value[value.length - 1]);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-ring">
      {value.map((item) => (
        <Badge
          key={item}
          variant="secondary"
          className="flex items-center gap-1"
        >
          {item}
          <button
            type="button"
            onClick={() => removeItem(item)}
            className="ml-1 hover:text-destructive"
          >
            <X className="w-3 h-3" />
          </button>
        </Badge>
      ))}

      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="border-0 shadow-none focus-visible:ring-0 flex-1 min-w-30"
      />
    </div>
  );
};
