import { TreeLinkDatum } from "react-d3-tree";

export const transformTreeData = (data: any) => {
  const map = new Map(
    data?.map((item: any) => [item?.id, { ...item, children: [] }])
  );

  const visited = new Set();

  data?.forEach((item: any) => {
    if (
      item?.parentId &&
      item?.id !== item?.parentId &&
      !visited.has(`${item?.parentId}->${item?.id}`)
    ) {
      const parent: any = map.get(item?.parentId);
      const child = map.get(item?.id);
      if (parent && child) {
        parent?.children.push(child);
        visited?.add(`${item?.parentId}->${item?.id}`);
      }
    }
  });

  const result = Array.from(map?.values()).filter(
    (item: any) => !data?.some((child: any) => child?.id === item?.parentId)
  );
  return result;
};

export function stationTypeColors(props: string) {
  if (props == "Trafo Merkezi") {
    return "#002953";
  } else if (props == "Dağıtım Merkezi") {
    return "#003366";
  } else if (props == "İndirici Merkezi") {
    return "#004080";
  } else if (props == "KÖK") {
    return "#004A8C";
  } else if (props == "IDM") {
    return "#0052FF";
  } else if (props == "Trafo Binası") {
    return "#0056A8";
  } else if (props == "DÜT") {
    return "#478CCF";
  } else if (props == "SDK") {
    return "#00A0F0";
  } else if (props == "Kofre") {
    return "#36C2CE";
  } else if (props == "Tesisat") {
    return "#77E4C8";
  } else {
    return "#DAE4E2";
  }
}

export function energyColors(energyDataDatum: { mainOrSubOutage: number }) {
  let energyState = "";

  // 0 ise Enerji var
  // 1 Ana Kesinti
  // 2 Alt Kesinti
  // 3 Etkilenen Nokta
  if (energyDataDatum?.mainOrSubOutage == 0) {
    energyState = "Enerji Var";
  } else if (energyDataDatum?.mainOrSubOutage == 1) {
    energyState = "Ana Kesinti";
  } else if (energyDataDatum?.mainOrSubOutage == 2) {
    energyState = "Alt Kesinti";
  } else {
    energyState = "Etkilenen Nokta";
  }
  return energyState;
}

export function PowerIconCreator(energyState: string) {
  if (energyState == "Alt Kesinti") {
    return "var(--color-tree-warning)";
  } else if (energyState === "Ana Kesinti") {
    return "var(--color-tree-error)";
  } else if (energyState === "Etkilenen Nokta") {
    return "var(--color-tree-error-light_2)";
  } else if (energyState === "Enerji Var") {
    return "var(--color-tree-success)";
  }
}
export function lightenColor(varName: string, percent: number) {
  if (!varName.startsWith("--")) {
    return varName;
  }

  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
  if (!value?.startsWith("#")) {
    return value;
  }

  const num = parseInt(value?.replace("#", ""), 16);
  const r = Math.min(255, ((num >> 16) & 255) + 255 * percent);
  const g = Math.min(255, ((num >> 8) & 255) + 255 * percent);
  const b = Math.min(255, (num & 255) + 255 * percent);

  return (
    "#" +
    ((1 << 24) + (Math?.round(r) << 16) + (Math?.round(g) << 8) + Math?.round(b))
      .toString(16)
      .slice(1)
  );
}

export const getDynamicPathClass = (link: TreeLinkDatum) => {
  const targetNode = link?.target;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((targetNode?.data as any)?.feedingTypeString === "AG") {
    return "link__ag";
  } else {
    return "link__og";
  }
};
