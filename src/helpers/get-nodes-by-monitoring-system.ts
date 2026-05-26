type MonitoringSystem = "OSOS" | "SCADA";

export const getNodesByMonitoringSystems = (
  tree: any[],
  systems: MonitoringSystem[], // Selected systems, OR empty if fetching untracked
  isUntracked = false
): string[] => {
  const result: string[] = [];

  const traverse = (nodes: any[]) => {
    for (const node of nodes) {
      const details =
        node?.monitoringSystemInfoList?.monitoringSystemInfoDetails || [];

      const systemNames = details.map(
        (d: any) => d.monitoringSystemName || d.monitoringSystemPrefix
      );

      const hasAllSelectedSystems = systems.every((system) =>
        systemNames.includes(system)
      );

      const isNodeUntracked = !systemNames.some((name: any) =>
        ["OSOS", "SCADA"].includes(name)
      );

      // Must satisfy all selected conditions
      const satisfiesAllConditions =
        (!systems.length || hasAllSelectedSystems) &&
        (!isUntracked || isNodeUntracked);

      if (satisfiesAllConditions) {
        result.push(node.name); // or node.nodeName
      }

      if (node.children?.length) {
        traverse(node.children);
      }
    }
  };

  traverse(tree);

  return result;
};
