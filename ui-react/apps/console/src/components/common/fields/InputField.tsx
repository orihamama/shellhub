import { ReactNode } from "react";

type DataAttrs = Record<
  `data-${string}`,
  string | number | boolean | undefined
>;

export default function InputField({
  id,
  label,
  labelAdornment,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  errorRole,
  hint,
  placeholder,
  autoComplete,
  autoFocus,
  disabled,
  required,
  maxLength,
  appendIcon,
  inputAttrs,
  variant = "default",
  hideLabel = false,
}: {
  id: string;
  label: ReactNode;
  /** Ignored when `hideLabel` is true. */
  labelAdornment?: ReactNode;
  /** Visually hide the label (kept for screen readers via `sr-only`). */
  hideLabel?: boolean;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
  errorRole?: "alert" | "status";
  hint?: string;
  placeholder?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  required?: boolean;
  maxLength?: number;
  appendIcon?: ReactNode;
  inputAttrs?: DataAttrs;
  variant?: "default" | "mono";
}) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = error ? errorId : hint ? hintId : undefined;
  const inputClassNames = `w-full px-3.5 py-2.5 bg-card border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed 
  ${error ? "border-accent-red/50" : "border-border"} ${variant === "mono" ? "text-xs font-mono" : "text-sm"} ${appendIcon ? "pr-10" : ""}`;

  const labelEl = (
    <label
      htmlFor={id}
      className={
        hideLabel
          ? "sr-only"
          : "block text-2xs font-mono font-semibold uppercase tracking-label text-text-muted mb-2"
      }
    >
      {label}
    </label>
  );

  return (
    <div>
      {labelAdornment && !hideLabel ? (
        <div className="flex items-center gap-2 mb-2">
          {labelEl}
          {labelAdornment}
        </div>
      ) : (
        labelEl
      )}
      <div className={appendIcon ? "relative" : undefined}>
        <input
          {...inputAttrs}
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          aria-required={required ? true : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={inputClassNames}
          placeholder={placeholder}
        />
        {appendIcon && (
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
            {appendIcon}
          </div>
        )}
      </div>
      {(error || hint) && (
        <p
          id={error ? errorId : hintId}
          role={error ? errorRole : undefined}
          className={`text-2xs mt-1.5 ${error ? "text-accent-red" : "text-text-muted"}`}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
}
