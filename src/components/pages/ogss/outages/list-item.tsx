import { Button } from "@/components/ui/button/button";
import { dateFormater } from "@/helpers/format-data";
import { getClassNames } from "@/helpers/get-class-names";
import { openDrawer } from "@/store/app/drawer-slice";
import {
  replaceAllTabsWith,
  setActiveTab,
  setOutageDataForTab,
} from "@/store/app/outage-tabs-slice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const ListItem = ({ data }: { data: any }) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const tabId = data?.id;
  const menuRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const tabs = useSelector((state: any) => state.outageTabs);

  const handleLeftClick = () => {
    dispatch(
      replaceAllTabsWith({
        tabId,
        data: {
          outageId: data?.id,
          ompId: data?.ompId,
          requestReason: 1,
          ompName: data?.ompName,
        },
      })
    );
  };

  const handleRightClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenuPosition({ x: event.pageX, y: event.pageY });
    setShowContextMenu(true);
  };
  const createAdditionalTab = () => {
    if (tabs[tabId]) {
      dispatch(setActiveTab(tabId));
    } else {
      dispatch(
        setOutageDataForTab({
          tabId,
          data: {
            outageId: data?.id,
            ompId: data?.ompId,
            requestReason: 1,
            ompName: data?.ompName,
          },
        })
      );
    }
    setShowContextMenu(false);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowContextMenu(false);
      }
    };
    if (showContextMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showContextMenu]);
  const showDetailHandler = () => {
    dispatch(
      openDrawer({
        title: "TBC524",
        type: "outageTreeDetail",
        id: data?.id,
        rowData: data,
        clickedNode:false
      })
    );
  };
  return (
    <>
      <div
        className={getClassNames("list-sidebar__list-item", [
          [!!tabs[tabId]?.isActive, "active"],
        ])}
        key={data.id}
      >
        <span className="title">{data?.ompName}</span>
        <div className="content">
          <div className="content__item">
            <span className="content__item-title">Kesinti ID</span>
            <span className="content__item-value">{data?.id}</span>
          </div>

          <div className="content__item">
            <span className="content__item-title">Omp ID</span>
            <span className="content__item-value">{data?.ompId}</span>
          </div>
          <div className="content__item">
            <span className="content__item-title">Gls ID</span>
            <span className="content__item-value">{data?.gisId}</span>
          </div>
          <div className="content__item">
            <span className="content__item-title">Versiyonlar ID</span>
            <span className="content__item-value">{data?.versionId}</span>
          </div>
          <div className="content__item">
            <span className="content__item-title">K. Başlangıç</span>
            <span className="content__item-value">
              {dateFormater(data?.startDateTime)}
            </span>
          </div>
        </div>
        <div className="actions">
          <Button variant="primary" onClick={showDetailHandler}>
            Detayı Göster
          </Button>
          <Button
            variant="secondary"
            onClick={handleLeftClick}
            onContextMenu={handleRightClick}
          >
            Ağacı Göster
          </Button>
        </div>
      </div>

      {showContextMenu && (
        <div
          ref={menuRef}
          style={{
            position: "absolute",
            top: contextMenuPosition.y,
            left: contextMenuPosition.x,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            zIndex: 1000,
            padding: "6px 12px",
            cursor: "pointer",
            userSelect: "none",
            borderRadius: "8px",
          }}
          onClick={createAdditionalTab}
        >
          Yeni Sekmede Aç
        </div>
      )}
    </>
  );
};
