import { useQuery } from "@tanstack/react-query";

export interface Pricing {
  data: Record<string, number>;
  talk: Record<string, number>;
  text: Record<string, number>;
}

export const usePricing = () => {
  return useQuery<Pricing>({
    queryKey: ["pricing"],
    queryFn: async () => {
      const res = await fetch("/mock/pricing.json");
      if (!res.ok) {
        throw new Error("Error loading pricing data");
      }
      return res.json();
    },
  });
};
