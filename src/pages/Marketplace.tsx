import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Crop {
  crop: string;
  quantity: number;
  price: number;
  location: string;
}

interface Demand {
  crop: string;
  qtyNeeded: number;
  priceOffered: number;
  deadline: string;
}

const Marketplace = () => {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [demands, setDemands] = useState<Demand[]>([]);

  const [cropInput, setCropInput] = useState<Crop>({
    crop: "",
    quantity: 0,
    price: 0,
    location: "",
  });

  const [demandInput, setDemandInput] = useState<Demand>({
    crop: "",
    qtyNeeded: 0,
    priceOffered: 0,
    deadline: "",
  });

  const addCrop = () => {
    if (!cropInput.crop || !cropInput.quantity || !cropInput.price) return;
    setCrops([...crops, cropInput]);
    setCropInput({ crop: "", quantity: 0, price: 0, location: "" });
  };

  const addDemand = () => {
    if (!demandInput.crop || !demandInput.qtyNeeded || !demandInput.priceOffered) return;
    setDemands([...demands, demandInput]);
    setDemandInput({ crop: "", qtyNeeded: 0, priceOffered: 0, deadline: "" });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      <h1 className="text-2xl font-bold mb-6">🌾 Digital Marketplace</h1>

      {/* Crops for Sale Section */}
      <Card>
        <CardHeader>
          <CardTitle>Sell Your Crops</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="Crop name (e.g. Tomato)"
            value={cropInput.crop}
            onChange={(e) => setCropInput({ ...cropInput, crop: e.target.value })}
          />
          <Input
            placeholder="Quantity (kg/ton)"
            type="number"
            value={cropInput.quantity || ""}
            onChange={(e) => setCropInput({ ...cropInput, quantity: Number(e.target.value) })}
          />
          <Input
            placeholder="Price per unit (₹)"
            type="number"
            value={cropInput.price || ""}
            onChange={(e) => setCropInput({ ...cropInput, price: Number(e.target.value) })}
          />
          <Input
            placeholder="Location (e.g. Bengaluru)"
            value={cropInput.location}
            onChange={(e) => setCropInput({ ...cropInput, location: e.target.value })}
          />
          <Button onClick={addCrop} className="w-full">Add Crop</Button>
        </CardContent>
      </Card>

      {/* List of Crops */}
      <div className="space-y-3">
        {crops.map((c, i) => (
          <div key={i} className="p-3 bg-muted rounded-lg flex justify-between">
            <span>{c.crop} - {c.quantity} units @ ₹{c.price} ({c.location})</span>
          </div>
        ))}
      </div>

      {/* Buyer Demands Section */}
      <Card>
        <CardHeader>
          <CardTitle>Post Buyer Demand</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="Crop needed (e.g. Onion)"
            value={demandInput.crop}
            onChange={(e) => setDemandInput({ ...demandInput, crop: e.target.value })}
          />
          <Input
            placeholder="Quantity needed"
            type="number"
            value={demandInput.qtyNeeded || ""}
            onChange={(e) => setDemandInput({ ...demandInput, qtyNeeded: Number(e.target.value) })}
          />
          <Input
            placeholder="Price offered (₹)"
            type="number"
            value={demandInput.priceOffered || ""}
            onChange={(e) => setDemandInput({ ...demandInput, priceOffered: Number(e.target.value) })}
          />
          <Input
            type="date"
            value={demandInput.deadline}
            onChange={(e) => setDemandInput({ ...demandInput, deadline: e.target.value })}
          />
          <Button onClick={addDemand} className="w-full">Add Demand</Button>
        </CardContent>
      </Card>

      {/* List of Demands */}
      <div className="space-y-3">
        {demands.map((d, i) => (
          <div key={i} className="p-3 bg-muted rounded-lg flex justify-between">
            <span>{d.crop} - {d.qtyNeeded} units needed @ ₹{d.priceOffered} (by {d.deadline})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
