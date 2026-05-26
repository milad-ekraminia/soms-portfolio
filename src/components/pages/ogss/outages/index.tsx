import { useEffect, useState } from "react";
import { ActionRows } from "./action-rows";
import "./ogss-outages.scss";
import { ListSideBar } from "./list-sidebar";
import { ControllableTabs } from "@/components/ui/controllable-tabs";
import { TreeFilter } from "./tree-filter";
import OutageTreeChart from "./outage-tree";
import { InfoModal } from "./info-modal";
import { useDispatch, useSelector } from "react-redux";
import { useOutageTreeNodes } from "@/hooks/ogss/outage/use-outage-tree-nodes";
import {
  clearCheckedSystems,
  clearHighlightedNodes,
  setCheckedSystems,
  setHighlightedNodes,
} from "@/store/app/highlighted-nodes-slice";
import { searchNodeInTree } from "@/helpers/get-matching-node-names";
import type { HighlightType } from "@/store/app/highlighted-nodes-slice";
import { clearAllOutageTabs } from "@/store/app/outage-tabs-slice";
import { OutageTreeDetails } from "./outage-tree-detail";
import { closeDrawer } from "@/store/app/drawer-slice";
import { setFullscreen } from "@/store/app/ogss-layout-slice";
import { transformTreeData } from "@/helpers/tree-utils";
import { applyCheckedSystems } from "@/helpers/ogss-apply-checked-systems";
import { getClassNames } from "@/helpers/get-class-names";
export const TreeOutagesWrapper = () => {
  const dispatch = useDispatch();
  const fullscreen = useSelector((state: any) => state.ogssLayout.fullscreen);
  const checkedSystems = useSelector(
    (state: any) => state.highlightedNodes.checkedSystems
  );
  const [showFull, setShowFull] = useState(false);
  const [goUp, setGoUp] = useState(false);
  const [rotate, setRotate] = useState<"horizontal" | "vertical">("vertical");
  const [showUnWatched, setShowUnWatched] = useState(true);
  const [showInformation, setShowInformation] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [data, setData] = useState<any>([]);
  const [renderKey, setRenderKey] = useState(0);

  const tabs = useSelector((state: any) => state.outageTabs);
  const activeTab: any = Object.values(tabs).find((tab: any) => tab.isActive);
  const {
    data: treeData,
    isLoading,
    refetch,
  } = useOutageTreeNodes({
    ompId: activeTab?.ompId,
    outageId: activeTab?.outageId,
    requestReason: activeTab?.requestReason,
  });
  const handleRefetch = () => {
    refetch();
  };
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
    return () => {
      // This runs when component unmounts (page is changed)
      const highlightTypes: HighlightType[] = [
        "treeSearch",
        "monitoringSystems",
        "markedNotification",
        "markedOutage",
        "markedDevice",
      ];

      highlightTypes.forEach((type) => {
        dispatch(clearHighlightedNodes(type));
      });
      dispatch(clearAllOutageTabs());
      dispatch(clearCheckedSystems());
    };
  }, []);
  const { isOpen, type, id, clickedNode, rowData } = useSelector(
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
  useEffect(() => {
    if (data && checkedSystems.length > 0) {
      applyCheckedSystems(checkedSystems, data, dispatch);
    }
  }, [data, checkedSystems, dispatch]);
  return (
    <>
      <div
        className={getClassNames("tree-outages", [
          [!!fullscreen, "expanded"],
        ])}
      >
        <ActionRows
          showFull={showFull}
          setShhowFull={setShowFull}
          setGoUp={setGoUp}
          goUp={goUp}
          setRotate={setRotate}
          showUnWatched={showUnWatched}
          setShowUnWatched={setShowUnWatched}
          setShowInformation={setShowInformation}
          rotate={rotate}
        />
        <div
          className={getClassNames("tree-outages__content", [
            [!!fullscreen, "expanded"],
          ])}
        >
          {!fullscreen ? <ListSideBar /> : null}
          <div className="outage-tree-wrapper">
            <ControllableTabs refreshHandler={handleRefetch} />
            <div className="tree-content">
              <TreeFilter
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onSearch={onSearch}
                handleMonitoringChange={toggleCheckbox}
                checkedSystems={checkedSystems}
                onClearSearch={onClearSearch}
              />
              <OutageTreeChart
                rotate={rotate}
                goUp={goUp}
                isLoading={isLoading}
                showUnWatched={showUnWatched}
                data={data}
                setData={setData}
                renderKey={renderKey}
                setShowUnWatched={setShowUnWatched}
              />
            </div>
          </div>
        </div>
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
          clickedNode={clickedNode}
          treeData={treeData}
          isLoading={isLoading}
          parentItemData={rowData}
        />
      ) : null}
    </>
  );
};
