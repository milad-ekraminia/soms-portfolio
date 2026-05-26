import Tabs from "@/components/ui/tabs/tabs";

import { openDrawer } from "@/store/app/drawer-slice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { outageTreeDetailsTabs } from "@/helpers/data/outage-tree-detail";
import { DetailInterruptions } from "./details/details-interruptions";
import DataDetails from "./details/data-details";
import { DetailTreeNotifications } from "./details/details-notification";
import { DetailTreeDevices } from "./details/details-device";
import { DetailControlls } from "./details/detail-controlls";
import { searchNodeInTree } from "@/helpers/get-matching-node-names";
import {
  HighlightType,
  setHighlightedNodes,
} from "@/store/app/highlighted-nodes-slice";
import {
  setOutageDataForTab,
  setActiveTab as tabHandler,
} from "@/store/app/outage-tabs-slice";

interface DetailsDrawerProps {
  onClose: () => void;
  selectedRows: any;
  detailData?: any;
  isDetailLoading?: boolean;
  treeData: any;
  parentItemData: any;
  clickedNode?: boolean;
  activeOutageId: any;
  nodeType?: "simulation" | "historical" | "outage";
}
const OutageTreeDetailsDrawer = ({
  onClose,
  selectedRows: chosenRows,
  detailData,
  isDetailLoading,
  clickedNode,
  treeData,
  parentItemData,
  activeOutageId,
  nodeType = "outage",
}: DetailsDrawerProps) => {
  const [activeTab, setActiveTab] = useState("data");

  const dispatch = useDispatch();
  const tabs = useSelector((state: any) => state.outageTabs);

  const handleIdClick = (id: any, rowData: any, type: string) => {
    setActiveTab("data");
    onClose();
    dispatch(openDrawer({ title: "TBC524", type, id, rowData }));
  };
  const effectiveTabs = !clickedNode
    ? [
        ...outageTreeDetailsTabs,
        {
          title: "PERİYODİK KONTROLLER",
          value: "controlls",
          id: 5,
        },
      ]
    : outageTreeDetailsTabs;

  const NodeElementHandler = (rowData: any, type: HighlightType) => {
    if (clickedNode) {
      const matchedNodeNames = searchNodeInTree(treeData, rowData?.ompName);
      if (matchedNodeNames.length > 0) {
        dispatch(
          setHighlightedNodes({
            type,
            nodeNames: matchedNodeNames,
          })
        );
      }
      onClose();
    } else {
      dispatch(
        setHighlightedNodes({
          type,
          nodeNames: rowData?.ompName,
        })
      );
      if (tabs[parentItemData?.id]) {
        dispatch(tabHandler(parentItemData?.id));
      } else {
        dispatch(
          setOutageDataForTab({
            tabId: parentItemData?.id,
            data: {
              outageId: parentItemData?.id,
              ompId: parentItemData?.ompId,
              requestReason: 1,
              ompName: parentItemData?.ompName,
            },
          })
        );
      }
      onClose();
    }
  };
  return (
    <div className="ogss-outage-details-drawer">
      <Tabs
        tabs={effectiveTabs}
        activeTab={activeTab}
        onTabClick={(val: any) => {
          if (nodeType == "outage") setActiveTab(val);
        }}
      />

      {activeTab == "data" ? (
        <DataDetails data={detailData} isDetailLoading={isDetailLoading} />
      ) : null}
      {activeTab == "interruptions" ? (
        <DetailInterruptions
          chosenRows={chosenRows[0]}
          handleRowClick={handleIdClick}
          NodeElementHandler={NodeElementHandler}
          clickedNode={clickedNode}
          activeOutageId={activeOutageId}
        />
      ) : null}
      {activeTab == "notifications" ? (
        <DetailTreeNotifications
          chosenRows={chosenRows[0]}
          handleRowClick={handleIdClick}
          NodeElementHandler={NodeElementHandler}
          clickedNode={clickedNode}
          activeOutageId={activeOutageId}
        />
      ) : null}
      {activeTab == "devices" ? (
        <DetailTreeDevices
          chosenRows={chosenRows[0]}
          NodeElementHandler={NodeElementHandler}
          clickedNode={clickedNode}
          activeOutageId={activeOutageId}
        />
      ) : null}
      {activeTab == "controlls" ? (
        <DetailControlls
          handleRowClick={handleIdClick}
          NodeElementHandler={NodeElementHandler}
        />
      ) : null}
    </div>
  );
};

export default OutageTreeDetailsDrawer;
