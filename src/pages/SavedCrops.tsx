import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp } from "lucide-react";

interface SavedCrop {
  id: string;
  name: string;
  image: string;
  category: string;
  season: string;
  sowingTime: string;
  harvestTime: string;
  avgYield: string;
  difficulty: string;
  savedAt: string;
  userId: string;
}

const SavedCrops = () => {
  const [savedCrops, setSavedCrops] = useState<SavedCrop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedCrops = async () => {
      try {
        // Replace with Firebase Auth userId when login is added
        const userId = "demoUser123";

        const q = query(
          collection(db, "savedCrops"),
          where("userId", "==", userId)
        );

        const querySnapshot = await getDocs(q);
        const cropList = querySnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as SavedCrop)
        );

        setSavedCrops(cropList);
      } catch (error) {
        console.error("Error fetching saved crops:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedCrops();
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 border-green-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Hard":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          My Saved Crops
        </h1>

        {loading ? (
          <p className="text-center text-muted-foreground">Loading crops...</p>
        ) : savedCrops.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No crops saved yet. Go to the Crop Advisory page to save crops.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedCrops.map((crop) => (
              <Card key={crop.id} className="hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <img
                      src={crop.image}
                      alt={crop.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <CardTitle className="text-xl">{crop.name}</CardTitle>
                      <Badge className={getDifficultyColor(crop.difficulty)}>
                        {crop.difficulty}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    Category: {crop.category} | Season: {crop.season}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-primary" />
                      {crop.sowingTime}
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                      {crop.harvestTime}
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Saved on: {new Date(crop.savedAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedCrops;
