interface TimeRangeProps {
  activeRange : string,
  handleRangeToggle : (range :keyof typeof timeRangesValues) => void,
}

const timeRangesValues = {
  short: 0,
  medium: 1,
  long: 2,
};

const TimeRange = (props : TimeRangeProps) => {
   return (
    <div className="flex gap-5">
      <button
        className={
          props.activeRange === "long"
            ? "underline text-white underline-offset-4"
            : "text-gray"
        }
        onClick={() => props.handleRangeToggle("long")}>
        All Time
      </button>
      <button
        className={
          props.activeRange === "medium"
            ? "underline text-white underline-offset-4"
            : "text-gray"
        }
        onClick={() => props.handleRangeToggle("medium")}>
        Last 6 Months
      </button>
      <button
        className={
          props.activeRange === "short"
            ? "underline text-white underline-offset-4"
            : "text-gray"
        }
        onClick={() => props.handleRangeToggle("short")}>
        Last 4 Weeks
      </button>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export {TimeRange , timeRangesValues };
