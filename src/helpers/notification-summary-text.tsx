
interface Props {
  selectedRows: number[];
  chosenValue?: number;
  onIdClick: (type: string, id: number) => void;
  isAssignable: boolean;
}

export const NotificationSummaryText = ({
  selectedRows,
  chosenValue,
  onIdClick,
  isAssignable,
}: Props) => {
  const listItems = selectedRows.map((item, i) => (
    <span key={item} className="interuptions-notification__title-items">
      <button
        className="item-id"
        onClick={() => onIdClick("notification", item)}
      >
        {item}
      </button>
      {i < selectedRows.length - 1 && <span>, </span>}
    </span>
  ));

  if (isAssignable) {
    return (
      <span className="interuptions-notification__title">
        <span>Seçtiğiniz</span>
        {listItems}
        <span>numaralı bildirim</span>
        <button
          className="item-id"
          onClick={() => onIdClick("outage", chosenValue!)}
        >
          {chosenValue}
        </button>
        <span> numaralı kesintiye bağlanacaktır. Onaylıyor musunuz?</span>
      </span>
    );
  }

  return (
    <span className="interuptions-notification__title">
      <span>Seçtiğiniz</span>
      {listItems}
      <span>numaralı bildirim</span>
      <button
        className="item-id"
        onClick={() => onIdClick("outage", chosenValue!)}
      >
        {chosenValue}
      </button>
      <span>
        {" "}
        numaralı kesinti aynı hiyerarşide değildir. Bu bildirim bu kesintiye
        bağlanamaz.
      </span>
    </span>
  );
};
