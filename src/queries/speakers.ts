import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SponsorsResponse } from "../types/sponsor";
import { PREVIEW_API_BASE, previewApiHeaders } from "../lib/api-config";

//sponsors

const fetchSponsors = async () => {
  const res = await axios.get(`${PREVIEW_API_BASE}/sponsors`, {
    headers: previewApiHeaders,
  });
  return res.data;
};

export const useGetSponsors = () => {
  return useQuery<SponsorsResponse>({
    queryKey: ["sponsors"],
    queryFn: fetchSponsors,
  });
};
