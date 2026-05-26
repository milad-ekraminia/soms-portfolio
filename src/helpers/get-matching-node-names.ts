export const searchNodeInTree = (
  nodes: any[],
  targetNodeName: string
): string[] => {
  let matchedNodes: string[] = [];

  for (const node of nodes) {
    const nodeName = String(node.nodeName).toUpperCase();
    const stationName = String(node.ompStationName).toUpperCase();
    const target = String(targetNodeName).toUpperCase();

       if (nodeName.includes(target) || stationName.includes(target)) {
         matchedNodes.push(node.nodeName); // or node.id, depending on what you need
       }

    if (node?.children?.length > 0) {
      matchedNodes = matchedNodes.concat(
        searchNodeInTree(node.children, target)
      );
    }
  }

  return matchedNodes;
};
