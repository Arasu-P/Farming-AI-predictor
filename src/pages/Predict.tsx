import { useState } from "react";
import data from "@/data/cropData.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";

interface Crop {
  crop: string;
  soil: string;
  season: string;
  months: number[];
  avg_yield: number;
  price: number;
  profit?: number;
}

const Predict = () => {
  const { t } = useLanguage();

  const [soilType, setSoilType] = useState("");
  const [month, setMonth] = useState<number | null>(null);
  const [results, setResults] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!soilType || !month) return;

    setLoading(true);

    const filtered = (data as Crop[]).filter(
      (c) =>
        c.soil.toLowerCase().includes(soilType.toLowerCase()) &&
        c.months.includes(month)
    );

    const ranked = filtered
      .map((c) => ({ ...c, profit: c.avg_yield * c.price }))
      .sort((a, b) => (b.profit ?? 0) - (a.profit ?? 0));

    setResults(ranked);
    setLoading(false);

    try {
      await addDoc(collection(db, "predictions"), {
        soilType,
        month,
        timestamp: new Date(),
        results: ranked.map((r) => ({
          crop: r.crop,
          season: r.season,
          profit: r.profit,
        })),
      });
      console.log("Prediction saved to Firestore ✅");
    } catch (e) {
      console.error("Error saving prediction:", e);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>{t.predict.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Soil Input */}
          <Input
            placeholder={t.predict.soilPlaceholder}
            value={soilType}
            onChange={(e) => setSoilType(e.target.value)}
          />

          {/* Month Dropdown */}
          <select
            value={month ?? ""}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="w-full border p-2 rounded-lg"
          >
            <option value="">{t.predict.monthPlaceholder}</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>

          {/* Button */}
          <Button onClick={handleSubmit} className="w-full" disabled={loading}>
            {loading ? t.predict.loading : t.predict.button}
          </Button>

          {/* Results */}
          {results.length > 0 ? (
            <div className="mt-6 space-y-3">
              {results.map((r, i) => (
                <div
                  key={r.crop}
                  className="p-3 rounded-lg bg-muted flex flex-col sm:flex-row justify-between"
                >
                  <span>
                    {i + 1}. {r.crop} ({r.season})
                  </span>
                  <span className="font-semibold">
                    Yield: {r.avg_yield}t/ha | Price: ₹{r.price}/quintal |{" "}
                    {t.predict.profitLabel}: ₹{r.profit?.toFixed(0)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">{t.predict.noResults}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Predict;
