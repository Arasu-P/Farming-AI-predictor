import { useState, useEffect } from 'react';
import { Search, Droplets, Bug, Calendar, TrendingUp, Bookmark, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import tomatoRetro from '@/assets/tomato-retro.jpg';
import carrotRetro from '@/assets/carrot-retro.jpg';
import cornRetro from '@/assets/corn-retro.jpg';
import chiliRetro from '@/assets/chili-retro.jpg';

interface Crop {
  id: string;
  name: string;
  image: string;
  category: string;
  season: string;
  sowingTime: string;
  harvestTime: string;
  avgYield: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  advisory: {
    sowing: string[];
    irrigation: string[];
    pests: string[];
    yield: string;
  };
}

const Crops = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [crops, setCrops] = useState<Crop[]>([]);

  useEffect(() => {
    // Get search query from URL if present
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }

    // Simulated crop data
    const cropData: Crop[] = [
      {
        id: '1',
        name: 'Tomato',
        image: tomatoRetro,
        category: 'Vegetable',
        season: 'Rabi/Summer',
        sowingTime: 'Oct-Dec, Jan-Mar',
        harvestTime: '90-120 days',
        avgYield: '25-35 tonnes/ha',
        difficulty: 'Medium',
        advisory: {
          sowing: [
            'Use certified hybrid seeds for better disease resistance',
            'Treat seeds with fungicide before sowing',
            'Prepare raised beds with good drainage',
            'Maintain row spacing of 75cm and plant spacing of 45cm'
          ],
          irrigation: [
            'Provide light irrigation immediately after transplanting',
            'Water every 3-4 days during initial growth',
            'Reduce watering during fruit ripening to prevent cracking',
            'Use drip irrigation for water efficiency'
          ],
          pests: [
            'Early blight: Apply copper-based fungicide',
            'Whitefly: Use yellow sticky traps',
            'Fruit borer: Install pheromone traps',
            'Bacterial wilt: Ensure proper crop rotation'
          ],
          yield: 'Expected yield: 25-35 tonnes per hectare with good management practices'
        }
      },
      {
        id: '2',
        name: 'Chili',
        image: chiliRetro,
        category: 'Spice',
        season: 'Kharif/Rabi',
        sowingTime: 'Jun-Jul, Nov-Dec',
        harvestTime: '120-150 days',
        avgYield: '12-15 tonnes/ha',
        difficulty: 'Easy',
        advisory: {
          sowing: [
            'Select varieties suitable for Karnataka climate',
            'Prepare nursery beds with well-decomposed FYM',
            'Transplant seedlings at 45-60 days after sowing',
            'Maintain spacing of 60cm x 45cm'
          ],
          irrigation: [
            'Avoid waterlogging in rainy season',
            'Provide irrigation at flowering and fruit development',
            'Use mulching to conserve moisture',
            'Critical water requirement during flowering'
          ],
          pests: [
            'Thrips: Use blue sticky traps',
            'Aphids: Spray neem oil solution',
            'Fruit rot: Ensure good air circulation',
            'Anthracnose: Apply recommended fungicide'
          ],
          yield: 'Expected yield: 12-15 tonnes per hectare of green chili'
        }
      },
      {
        id: '3',
        name: 'Maize',
        image: cornRetro,
        category: 'Cereal',
        season: 'Kharif/Rabi',
        sowingTime: 'Jun-Jul, Nov-Dec',
        harvestTime: '100-120 days',
        avgYield: '6-8 tonnes/ha',
        difficulty: 'Easy',
        advisory: {
          sowing: [
            'Choose appropriate hybrid varieties for your region',
            'Ensure soil pH between 6.0-7.5',
            'Apply basal fertilizers before sowing',
            'Maintain row spacing of 60cm and plant to plant 20cm'
          ],
          irrigation: [
            'Critical stages: knee-high, tasseling, and grain filling',
            'Avoid water stress during silking period',
            'Provide life-saving irrigation if needed',
            'Good drainage is essential during monsoon'
          ],
          pests: [
            'Fall armyworm: Early detection and management',
            'Stem borer: Use pheromone traps',
            'Aphids: Monitor and spray if needed',
            'Turcicum leaf blight: Resistant varieties preferred'
          ],
          yield: 'Expected yield: 6-8 tonnes per hectare with improved varieties'
        }
      },
      {
        id: '4',
        name: 'Onion',
        image: carrotRetro,
        category: 'Vegetable',
        season: 'Rabi',
        sowingTime: 'Oct-Nov',
        harvestTime: '120-150 days',
        avgYield: '20-25 tonnes/ha',
        difficulty: 'Medium',
        advisory: {
          sowing: [
            'Select short-day varieties for Karnataka',
            'Prepare well-drained, fertile beds',
            'Transplant seedlings at 6-7 weeks',
            'Maintain proper spacing for bulb development'
          ],
          irrigation: [
            'Regular light irrigation during growth',
            'Stop irrigation 2-3 weeks before harvest',
            'Avoid waterlogging which causes bulb rot',
            'Critical water requirement during bulb formation'
          ],
          pests: [
            'Purple blotch: Apply protective fungicides',
            'Thrips: Use recommended insecticides',
            'Onion fly: Monitor and treat early',
            'Stemphylium blight: Ensure good air circulation'
          ],
          yield: 'Expected yield: 20-25 tonnes per hectare with proper care'
        }
      },
    ];
    setCrops(cropData);
  }, []);

  const categories = ['all', 'Vegetable', 'Cereal', 'Spice', 'Pulse'];

  const filteredCrops = crops.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || crop.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-up">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Crop Advisory System
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get comprehensive farming guidance for crops grown in Karnataka
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Crop List */}
          <div className="lg:col-span-1">
            {/* Search and Filters */}
            <div className="space-y-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search crops..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="capitalize"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Crop Cards */}
            <div className="space-y-4">
              {filteredCrops.map((crop, index) => (
                <Card 
                  key={crop.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg animate-fade-up ${
                    selectedCrop?.id === crop.id ? 'ring-2 ring-primary' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedCrop(crop)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={crop.image} 
                        alt={crop.name}
                        className="w-16 h-16 rounded-lg object-cover shadow-sm"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-lg">{crop.name}</h3>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{crop.category}</p>
                        <div className="flex items-center space-x-2">
                          <Badge className={getDifficultyColor(crop.difficulty)}>
                            {crop.difficulty}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{crop.season}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Crop Details */}
          <div className="lg:col-span-2">
            {selectedCrop ? (
              <Card className="card-soft animate-fade-up">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <img 
                      src={selectedCrop.image} 
                      alt={selectedCrop.name}
                      className="w-20 h-20 rounded-xl object-cover shadow-md"
                    />
                    <div>
                      <CardTitle className="text-2xl">{selectedCrop.name}</CardTitle>
                      <CardDescription className="text-lg">{selectedCrop.category}</CardDescription>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge className={getDifficultyColor(selectedCrop.difficulty)}>
                          {selectedCrop.difficulty}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{selectedCrop.season}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Quick Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-muted/50 rounded-lg p-4 text-center">
                      <Calendar className="h-5 w-5 mx-auto mb-2 text-primary" />
                      <p className="text-sm font-medium">Sowing Time</p>
                      <p className="text-xs text-muted-foreground">{selectedCrop.sowingTime}</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4 text-center">
                      <TrendingUp className="h-5 w-5 mx-auto mb-2 text-primary" />
                      <p className="text-sm font-medium">Harvest Time</p>
                      <p className="text-xs text-muted-foreground">{selectedCrop.harvestTime}</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4 text-center">
                      <TrendingUp className="h-5 w-5 mx-auto mb-2 text-primary" />
                      <p className="text-sm font-medium">Average Yield</p>
                      <p className="text-xs text-muted-foreground">{selectedCrop.avgYield}</p>
                    </div>
                  </div>

                  {/* Detailed Advisory */}
                  <Tabs defaultValue="sowing" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="sowing">Sowing</TabsTrigger>
                      <TabsTrigger value="irrigation">Irrigation</TabsTrigger>
                      <TabsTrigger value="pests">Pests & Diseases</TabsTrigger>
                      <TabsTrigger value="yield">Yield</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="sowing" className="mt-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-primary" />
                          Sowing Instructions
                        </h4>
                        <ul className="space-y-2">
                          {selectedCrop.advisory.sowing.map((instruction, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{instruction}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="irrigation" className="mt-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold flex items-center">
                          <Droplets className="h-4 w-4 mr-2 text-primary" />
                          Irrigation Guidance
                        </h4>
                        <ul className="space-y-2">
                          {selectedCrop.advisory.irrigation.map((instruction, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{instruction}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="pests" className="mt-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold flex items-center">
                          <Bug className="h-4 w-4 mr-2 text-primary" />
                          Pest & Disease Management
                        </h4>
                        <ul className="space-y-2">
                          {selectedCrop.advisory.pests.map((instruction, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{instruction}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="yield" className="mt-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold flex items-center">
                          <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                          Yield Forecast
                        </h4>
                        <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-4">
                          {selectedCrop.advisory.yield}
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>

                  {/* Save Button */}
                  <div className="mt-6 pt-6 border-t">
                    <Button className="w-full">
                      <Bookmark className="h-4 w-4 mr-2" />
                      Save to My Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="card-soft h-96 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a crop to view detailed advisory information</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crops;