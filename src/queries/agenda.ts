import { useQuery } from "@tanstack/react-query";
import { fetchAgendaSessions, type AgendaSession } from "../lib/agenda-client";

export const useGetAgenda = () => {
  return useQuery<AgendaSession[]>({
    queryKey: ["fetch-agenda"],
    queryFn: fetchAgendaSessions,
  });
};
