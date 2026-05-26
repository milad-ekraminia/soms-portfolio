import "./status-stepper.scss";

type Step = { key: string; label: string };

export function StatusStepper({
  steps,
  activeKey,
}: {
  steps: Step[];
  activeKey: string;
}) {
  const activeIndex = Math.max(
    0,
    steps.findIndex((s) => s.key === activeKey)
  );

  return (
    <ul className="status-stepper" role="list">
      {steps.map((s, idx) => {
        const state =
         idx === activeIndex ? "active" : "todo";

        return (
          <li
            key={s.key}
            className={`status-stepper__step status-stepper__step--${state}`}
            role="listitem"
          >
            <span className="status-stepper__label">{s.label}</span>
          </li>
        );
      })}
    </ul>
  );
}
