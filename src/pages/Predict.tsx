import { useState } from "react";
import data from "@/data/cropData.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { motion, AnimatePresence } from "framer-motion";

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
      <Card className="shadow-lg rounded-2xl border border-green-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-700 text-center">
            🌱 {t.predict.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Soil Input */}
          <motion.div whileFocus={{ scale: 1.02 }}>
            <Input
              placeholder={t.predict.soilPlaceholder}
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              className="rounded-xl border-green-300 focus:ring-2 focus:ring-green-500"
            />
          </motion.div>

          {/* Month Dropdown */}
          <motion.select
            value={month ?? ""}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="w-full border p-2 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500"
            whileTap={{ scale: 0.98 }}
          >
            <option value="">{t.predict.monthPlaceholder}</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </motion.select>

          {/* Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleSubmit}
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 text-lg"
              disabled={loading}
            >
              {loading ? "🌾 " + t.predict.loading : "🌿 " + t.predict.button}
            </Button>
          </motion.div>

          {/* Results */}
          <AnimatePresence>
            {results.length > 0 ? (
              <motion.div
                className="mt-6 space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {results.map((r, i) => (
                  <motion.div
                    key={r.crop}
                    className="p-4 rounded-xl bg-green-50 border border-green-200 shadow-sm flex flex-col sm:flex-row justify-between hover:shadow-md transition"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="font-medium text-green-800">
                      {i + 1}. {r.crop} ({r.season})
                    </span>
                    <span className="font-semibold text-gray-700">
                      🌾 Yield: {r.avg_yield}t/ha | 💰 Price: ₹{r.price}/quintal |{" "}
                      {t.predict.profitLabel}: ₹{r.profit?.toFixed(0)}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <p className="text-muted-foreground text-center">
                {t.predict.noResults}
              </p>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
};

export default Predict;
