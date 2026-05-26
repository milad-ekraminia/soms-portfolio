import { getFormDataPost } from "@/lib/api-method/api-method-functions";
import { OgssOutageResponse } from "@/types/components/pages/ogss/outage";

export async function PostOutageByFilter({
  isActive,
  appliedFilters,
  page,
  pageSize,
  sorting,
}: {
  isActive: boolean;
  appliedFilters: any;
  page: number;
  pageSize: number;
  sorting?: string;
}): Promise<OgssOutageResponse> {
  return await getFormDataPost<OgssOutageResponse>({
    endPoint: `outages-by-filter?isActive=${isActive}`,
    type: "post",
    formData: {
      filtersAndSorting: {
        filters: appliedFilters,
        pageNumber: page,
        pageSize: pageSize,
        sorting: sorting,
      },
    },
  });
}
