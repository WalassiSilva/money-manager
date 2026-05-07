import React from "react";

type Props = {
  open: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmDialog: React.FC<Props> = ({
  open,
  title = "Confirm",
  description = "Are you sure?",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />

      <div className="glass-panel-strong relative z-10 w-full max-w-md p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-slate-300 mb-4">{description}</p>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-md bg-gray-700 text-slate-100 hover:bg-gray-600"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 rounded-md text-white"
            style={{
              background:
                "linear-gradient(120deg,#ef4444, rgba(30,41,59,0.55))",
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
