interface TimeRangeProps {
  activeRange: string;
  handleRangeToggle: (range: keyof typeof timeRangesValues) => void;
}

const timeRangesValues = {
  short: 0,
  medium: 1,
  long: 2,
};

const TimeRange = (props: TimeRangeProps) => {
  return (
    <details className="dropdown">
      <summary> Set time range</summary>
      <ul className="shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-36 ">
        <li>
          <a onClick={() => props.handleRangeToggle("long")}>All Time</a>
        </li>
        <li>
          <a onClick={() => props.handleRangeToggle("medium")}>Last 6 Months</a>
        </li>
        <li>
          <a onClick={() => props.handleRangeToggle("short")}>Last 4 Weeks</a>
        </li>
      </ul>
    </details>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export { TimeRange, timeRangesValues };
