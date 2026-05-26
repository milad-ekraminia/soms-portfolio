import { Spinner } from "@/components/ui/loader/spinner/spinner";
import { useOutageDetailLHoverData } from "@/hooks/outage/use-get-detail-drawer";

export const DetailHoverTable = ({ item, data }: { item: any; data: any }) => {
  const { data: detailHoverData, isLoading } = useOutageDetailLHoverData({
    outageId: data?.outageId,
  });

  const tableData = [
    {
      type: "Kentsel",
      rows: [
        { gerilim: "OG", sayi: detailHoverData?.data?.kentselOgCount ?? 0 },
        { gerilim: "AG", sayi: detailHoverData?.data?.kentselAgCount ?? 0 },
      ],
    },
    {
      type: "Kentaltı",
      rows: [
        { gerilim: "OG", sayi: detailHoverData?.data?.kentaltiOgCount ?? 0 },
        { gerilim: "AG", sayi: detailHoverData?.data?.kentaltiAgCount ?? 0 },
      ],
    },
    {
      type: "Kırsal",
      rows: [
        { gerilim: "OG", sayi: detailHoverData?.data?.kirsalOgCount ?? 0 },
        { gerilim: "AG", sayi: detailHoverData?.data?.kirsalAgCount ?? 0 },
      ],
    },
    {
      type: "Toplam",
      rows: [
        { gerilim: "OG", sayi: detailHoverData?.data?.toplamOgCount ?? 0 },
        { gerilim: "AG", sayi: detailHoverData?.data?.toplamAgCount ?? 0 },
      ],
      isTotal: true,
    },
  ];
  return (
    <div className="hover-table-wrapper">
      <span className="hover-trigger">{item?.Icon}</span>

      <div className="hover-table">
        {isLoading ? (
          <div className="hover-table__loader">
            <Spinner />
          </div>
        ) : (
          <table className="custom-table">
            <thead>
              <tr>
                <th>Tip</th>
                <th>Gerilim</th>
                <th>Sayı</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((group, groupIndex) =>
                group.rows.map((row, rowIndex) => (
                  <tr
                    key={`${group.type}-${row.gerilim}`}
                    className={`${group.isTotal ? "total-row" : ""} ${
                      groupIndex % 2 === 0 ? "group-even" : "group-odd"
                    }`}
                  >
                    {rowIndex === 0 && (
                      <td
                        rowSpan={group.rows.length}
                        className={
                          group?.rows?.length > 1
                            ? "merged-cell"
                            : "simple-cell"
                        }
                      >
                        {group.type}
                      </td>
                    )}
                    <td>{row.gerilim}</td>
                    <td>{row.sayi}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
