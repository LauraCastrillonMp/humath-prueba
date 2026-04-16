import axios from "axios";

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

  async getExternalData(base = "EUR", target = "USD", amount = 100): Promise<SimpleExternalData[]> {
    const response = await axios.get(`${this.frankfurterBase}/v2/rates`, {
      params: { base, quotes: target },
    });

    const payload = response.data as FrankfurterRateItem | FrankfurterRateItem[];
    const data = Array.isArray(payload) ? payload[0] : payload;
    if (!data || typeof data.rate !== "number" || !data.quote) {
      throw new Error("No exchange data returned by Frankfurter");
    }

    return [
      {
        id: 1,
        name: `${base}-${data.quote}`,
        rate: data.rate,
        amount,
        convertedAmount: amount * data.rate,
      },
    ];
  }
}

