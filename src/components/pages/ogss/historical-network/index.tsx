import { useSimulatiorTreeNodes } from "@/hooks/ogss/simulation/use-get-simulation-data";
import { HistoricalNetworkForm } from "./form";
import { HistoricalNetworkTreeWrapper } from "./historical-network-tree-wrapper";
import { useEffect, useState } from "react";
import { ActionRows } from "../simulation/action-rows";
import { InfoModal } from "../outages/info-modal";
import { searchNodeInTree } from "@/helpers/get-matching-node-names";
import {
  clearCheckedSystems,
  clearHighlightedNodes,
  setCheckedSystems,
  setHighlightedNodes,
} from "@/store/app/highlighted-nodes-slice";
import { useDispatch, useSelector } from "react-redux";
import type { HighlightType } from "@/store/app/highlighted-nodes-slice";
import { OutageTreeDetails } from "../outages/outage-tree-detail";
import { closeDrawer } from "@/store/app/drawer-slice";
import { setFullscreen } from "@/store/app/ogss-layout-slice";
import { transformTreeData } from "@/helpers/tree-utils";
import { applyCheckedSystems } from "@/helpers/ogss-apply-checked-systems";

export const HistoricalNetwork = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<any>([]);
  const [renderKey, setRenderKey] = useState(0);
  const [param, setParam] = useState("");
  const [showFull, setShowFull] = useState(false);
  const [goUp, setGoUp] = useState(false);
  const [rotate, setRotate] = useState<"horizontal" | "vertical">("vertical");
  const [showUnWatched, setShowUnWatched] = useState(true);
  const [showInformation, setShowInformation] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const checkedSystems = useSelector(
    (state: any) => state.highlightedNodes.checkedSystems
  );

  const onClickHandler = (params: string) => {
    setParam(params);
  };
  const { data: treeData, isLoading } = useSimulatiorTreeNodes(param);
  const onSearch = () => {
    const upperCaseSearchValue = searchValue.toUpperCase();
    const matchedNodeNames = searchNodeInTree(data, upperCaseSearchValue);
    if (matchedNodeNames.length > 0) {
      dispatch(
        setHighlightedNodes({
          type: "treeSearch",
          nodeNames: matchedNodeNames,
        })
      );
    }
  };
  const onClearSearch = () => {
    setSearchValue("");
    dispatch(clearHighlightedNodes("treeSearch"));
    dispatch(setHighlightedNodes({ type: "monitoringSystems", nodeNames: [] }));
    dispatch(setHighlightedNodes({ type: "unMarkedDevice", nodeNames: [] }));
    dispatch(clearHighlightedNodes("markedNotification"));
    dispatch(clearHighlightedNodes("markedOutage"));
    dispatch(clearHighlightedNodes("markedDevice"));
    dispatch(clearCheckedSystems());
  };
  const toggleCheckbox = (system: string, isChecked: boolean) => {
    const newChecked = isChecked
      ? [...checkedSystems, system]
      : checkedSystems.filter((s: any) => s !== system);

    dispatch(setCheckedSystems(newChecked));
    applyCheckedSystems(newChecked, data, dispatch);
  };
  useEffect(() => {
    if (data && checkedSystems.length > 0) {
      applyCheckedSystems(checkedSystems, data, dispatch);
    }
  }, [data, checkedSystems, dispatch]);
  useEffect(() => {
    return () => {
      // This runs when component unmounts (page is changed)
      const highlightTypes: HighlightType[] = [
        "treeSearch",
        "monitoringSystems",
        "markedNotification",
        "markedOutage",
        "markedDevice",
      ];

      highlightTypes.forEach((type) => dispatch(clearHighlightedNodes(type)));
      dispatch(clearCheckedSystems());
    };
  }, []);
  const { isOpen, type, id, rowData } = useSelector(
    (state: any) => state.drawer
  );
  useEffect(() => {
    dispatch(setFullscreen(showFull));
    return () => {
      dispatch(setFullscreen(false));
    };
  }, [showFull, dispatch]);
  useEffect(() => {
    if (treeData) {
      const transformed = transformTreeData(treeData);
      setData(transformed);
      setRenderKey((prev) => prev + 1);
    } else {
      setData([]);
    }
  }, [treeData]);
  return (
    <>
      <div className="simulation history">
        <div className="simulation__header">
          <HistoricalNetworkForm onClickHandler={onClickHandler} />
          {data ? (
            <ActionRows
              showFull={showFull}
              setShhowFull={setShowFull}
              setGoUp={setGoUp}
              goUp={goUp}
              setRotate={setRotate}
              showUnWatched={showUnWatched}
              setShowUnWatched={setShowUnWatched}
              rotate={rotate}
              setShowInformation={setShowInformation}
            />
          ) : null}
        </div>
        <HistoricalNetworkTreeWrapper
          data={data}
          isLoading={isLoading}
          showUnWatched={showUnWatched}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onSearch={onSearch}
          handleMonitoringChange={toggleCheckbox}
          checkedSystems={checkedSystems}
          onClearSearch={onClearSearch}
          rotate={rotate}
          goUp={goUp}
          renderKey={renderKey}
          setData={setData}
          setShowUnWatched={setShowUnWatched}
        />
      </div>
      {showInformation && (
        <InfoModal setIsOpen={setShowInformation} isOpen={showInformation} />
      )}

      {type == "outageTreeDetail" ? (
        <OutageTreeDetails
          selectedRows={[id as number]}
          isDrawerOpen={isOpen}
          closeDrawer={() => {
            dispatch(closeDrawer());
          }}
          clickedNode={true}
          treeData={data}
          isLoading={isLoading}
          parentItemData={rowData}
          nodeType="historical"
        />
      ) : null}
    </>
  );
};
