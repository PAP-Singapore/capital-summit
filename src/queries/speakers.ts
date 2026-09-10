import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SponsorsResponse } from "../types/sponsor";
import { API_BASE, apiHeaders } from "../lib/api-config";
import { fetchSpeakers, type SpeakerUI } from "../lib/speakers-client";

//sponsors

const fetchSponsors = async () => {
  const res = await axios.get(`${API_BASE}/sponsors`, {
    headers: apiHeaders,
  });
  return res.data;
};

export const useGetSponsors = () => {
  return useQuery<SponsorsResponse>({
    queryKey: ["sponsors"],
    queryFn: fetchSponsors,
  });
};

//speakers

export const useGetSpeakers = () => {
  return useQuery<SpeakerUI[]>({
    queryKey: ["speakers"],
    queryFn: fetchSpeakers,
  });
};
