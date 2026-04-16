import axios from "axios";
import { ExternalDataEntity } from "./external.entity";

export interface SimpleExternalData {
  id: number;
  name: string;
  rate: number;
  amount: number;
  convertedAmount: number;
}

type FrankfurterRateItem = { rate?: number; quote?: string };

export class ExternalService {
  private readonly frankfurterBase: string;

  constructor() {
    this.frankfurterBase = process.env.FRANKFURTER_API_URL || "https://api.frankfurter.dev";
  }

  async getExternalData(
    base: string,
    target: string,
    amount: number
  ): Promise<ExternalDataEntity[]> {
    const response = await axios.get(`${this.frankfurterBase}/v2/rates`, {
      params: { base, quotes: target },
    });

    const payload = response.data as FrankfurterRateItem | FrankfurterRateItem[];
    const data = Array.isArray(payload) ? payload[0] : payload;
    if (!data || typeof data.rate !== "number" || !data.quote) {
      throw new Error("No exchange data returned by Frankfurter");
    }

    const rate = data.rate;
    const convertedAmount = amount * rate;

    return [
      {
        id: 1,
        name: `${base}-${target}`,
        rate,
        amount,
        convertedAmount,
      },
    ];
  }
}

