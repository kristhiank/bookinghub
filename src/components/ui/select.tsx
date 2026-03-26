"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  children: React.ReactNode;
  className?: string;
}

export function Select({ value, onValueChange, placeholder, children, className }: SelectProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const items = React.Children.toArray(children) as React.ReactElement<SelectItemProps>[];
  const selectedItem = items.find((item) => item.props.value === value);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "w-full flex items-center justify-between rounded-md border border-input px-3 py-2 text-sm",
          "bg-background hover:bg-secondary transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        )}
      >
        <span className={cn(!selectedItem && "text-muted-foreground")}>
          {selectedItem?.props.children || placeholder || "Seleccionar..."}
        </span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-background shadow-lg">
          {items.map((item) => (
            <button
              key={item.props.value}
              type="button"
              onClick={() => {
                onValueChange(item.props.value);
                setOpen(false);
              }}
              className={cn(
                "w-full px-3 py-2 text-sm text-left hover:bg-secondary transition-colors",
                value === item.props.value && "bg-secondary font-medium"
              )}
            >
              {item.props.children}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
}

export function SelectItem({ value, children }: SelectItemProps) {
  return null; // Rendered by Select parent
}
