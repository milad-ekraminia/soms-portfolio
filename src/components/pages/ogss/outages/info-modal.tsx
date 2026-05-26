import { AlertSvg } from "@/assets/icons/alert-svg";
import { Button } from "@/components/ui/button/button";
import Modal from "@/components/ui/modal-wrapper/modal-wrapper";
import {
  fifthColumns,
  firstColumns,
  fourthColumns,
  secondColumns,
  thirdColumns,
} from "@/helpers/data/ogss-info-modal-table";

export const InfoModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="modal-info-container">
        <div className="modal-info-container__header">
          <div className="icon">
            <AlertSvg stroke="#079455" />
          </div>
          <span className="title">Hücre Gösterim Bilgileri</span>
        </div>
        <div className="modal-info-container__body">
          <div className="modal-info-container__body-table">
            <div className="column">
              <div className="header">
                <span className="header-title">{firstColumns.header}</span>
              </div>
              <div className="body">
                {firstColumns.items.map((item) => (
                  <div className="item" key={item.title}>
                    {item?.Icon ? (
                      <div className="icon" style={{ background: item.bg }}>
                        <item.Icon
                          width="14"
                          height="14"
                          stroke={item.stroke}
                        />
                      </div>
                    ) : (
                      <div className="icon" style={{ background: item.bg }}>
                        {item?.text}
                      </div>
                    )}
                    <span className="title">{item.title}</span>
                  </div>
                ))}
                <div className="item">
                  <div className="icon"></div>
                  <div className="title"></div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="header">
                <span className="header-title">{secondColumns.header}</span>
              </div>
              <div className="body">
                {secondColumns.items.map((item) => (
                  <div className="item" key={item.title}>
                    <div className="icon" style={{ background: item.bg }}>
                      {item?.text}
                    </div>

                    <span className="title">{item.title}</span>
                  </div>
                ))}
                <div className="item">
                  <div className="icon"></div>
                  <div className="title"></div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="header">
                <span className="header-title">{thirdColumns.header}</span>
              </div>
              <div className="body">
                {thirdColumns.items.map((item) => (
                  <div className="item" key={item.title}>
                    <div
                      className="icon"
                      style={{
                        background: item.bg,
                        width: "22px",
                        height: "22px",
                        borderRadius: "100%",
                        border: "1px solid #344054",
                      }}
                    >
                      {item?.text}
                    </div>
                    <span className="title">{item.title}</span>
                  </div>
                ))}
                <div className="item">
                  <div className="icon"></div>
                  <div className="title"></div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="header">
                <span className="header-title">{fourthColumns.header}</span>
              </div>
              <div className="body">
                {fourthColumns.items.map((item) => (
                  <div className="item" key={item.title}>
                    <div className="icon" style={{ background: item.bg }}>
                      {item?.text}
                    </div>

                    <span className="title">{item.title}</span>
                  </div>
                ))}
                <div className="item">
                  <div className="icon"></div>
                  <div className="title"></div>
                </div>
              </div>
            </div>

            <div className="column">
              <div className="header">
                <span className="header-title">{fifthColumns.header}</span>
              </div>
              <div className="body">
                {fifthColumns.items.map((item) => (
                  <div
                    className="item"
                    key={item.title}
                    style={{
                      background: item.bg,
                      color: item.color,
                      padding: "8px 12px",
                      borderRadius: "4px",
                    }}
                  >
                    <span className="title">{item.title}</span>
                  </div>
                ))}
                <div className="item">
                  <div className="icon"></div>
                  <div className="title"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-info-container__footer">
          <Button variant="primary" onClick={() => setIsOpen(false)}>
            Kapat
          </Button>
        </div>
      </div>
    </Modal>
  );
};
