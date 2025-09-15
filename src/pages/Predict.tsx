import { useState } from "react";
import data from "@/data/cropData.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";

const Predict = () => {
  const { t } = useLanguage();

  const [soilType, setSoilType] = useState("");
  const [month, setMonth] = useState<number | null>(null);
  const [results, setResults] = useState<any[]>([]);

  const handleSubmit = () => {
    if (!soilType || !month) return;

    // Filter crops by soil type and growing month
    const filtered = data.filter(
      (c) =>
        c.soil.toLowerCase().includes(soilType.toLowerCase()) &&
        c.months.includes(month)
    );

    // Calculate profitability = yield × price
    const ranked = filtered
      .map((c) => {
        const profit = c.avg_yield * c.price;
        return { ...c, profit };
      })
      .sort((a, b) => b.profit - a.profit);

    setResults(ranked);
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
            <option value={1}>January</option>
            <option value={2}>February</option>
            <option value={3}>March</option>
            <option value={4}>April</option>
            <option value={5}>May</option>
            <option value={6}>June</option>
            <option value={7}>July</option>
            <option value={8}>August</option>
            <option value={9}>September</option>
            <option value={10}>October</option>
            <option value={11}>November</option>
            <option value={12}>December</option>
          </select>

          {/* Button */}
          <Button onClick={handleSubmit} className="w-full">
            {t.predict.button}
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
                    {t.predict.profitLabel}: ₹{r.profit.toFixed(0)}
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
