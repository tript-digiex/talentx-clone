type DateRangeSelectActionsProps = {
  onCancel: () => void;
  onApply: () => void;
  applyDisabled?: boolean;
};

const DateRangeSelectActions = ({
  onCancel,
  onApply,
  applyDisabled = false,
}: DateRangeSelectActionsProps) => {
  return (
    <div className="flex justify-end gap-4">
      <button
        type="button"
        className="cursor-pointer h-12 rounded-md border border-gray-400 bg-gray-200 px-6 text-base font-semibold text-gray-950 transition-colors hover:bg-gray-300 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-purple-300/50"
        onClick={onCancel}
      >
        Cancel
      </button>

      <button
        type="button"
        disabled={applyDisabled}
        className="cursor-pointer h-12 rounded-md bg-purple-600 px-6 text-base font-semibold text-white transition-colors hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-purple-300/50 disabled:pointer-events-none disabled:opacity-50"
        onClick={onApply}
      >
        Apply
      </button>
    </div>
  );
};

export default DateRangeSelectActions;
