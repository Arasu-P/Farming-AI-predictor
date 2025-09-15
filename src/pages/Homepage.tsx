import { useState } from "react";
import {
  Search,
  TrendingUp,
  Cloud,
  BarChart3,
  Users,
  Bot,
  MapPin,
  Calendar,
  Sprout
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import heroFarmer from "@/assets/hero-farmer.jpg";
import tomatoRetro from "@/assets/tomato-retro.jpg";
import carrotRetro from "@/assets/carrot-retro.jpg";
import cornRetro from "@/assets/corn-retro.jpg";
import chiliRetro from "@/assets/chili-retro.jpg";
import { useLanguage } from "@/context/LanguageContext";

const Homepage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useLanguage();

  const quickLinks = [
    {
      title: t.homepage.marketPrices,
      description: t.homepage.marketPricesDescription,
      icon: TrendingUp,
      path: "/market",
      color: "bg-gradient-to-br from-secondary to-secondary-light",
      image: tomatoRetro
    },
    {
      title: t.homepage.cropAdvisory,
      description: t.homepage.cropAdvisoryDescription,
      icon: Bot,
      path: "/crops",
      color: "bg-gradient-to-br from-primary to-primary-light",
      image: cornRetro
    },
    {
      title: t.homepage.predictCrop,
      description: t.homepage.predictCropDescription,
      icon: Sprout,
      path: "/predict",
      color: "bg-gradient-to-br from-green-500 to-green-300",
      image: cornRetro
    },
    {
      title: t.homepage.weather,
      description: t.homepage.weatherDescription,
      icon: Cloud,
      path: "/weather",
      color: "bg-gradient-to-br from-accent to-accent-light",
      image: carrotRetro
    },
    {
      title: t.homepage.dashboard,
      description: t.homepage.dashboardDescription,
      icon: BarChart3,
      path: "/dashboard",
      color: "bg-gradient-to-br from-primary-light to-secondary",
      image: chiliRetro
    }
  ];

  const features = [
    {
      icon: Bot,
      title: "AI-Tailored Advice",
      description:
        "Get personalized crop recommendations based on your land, soil, and weather conditions."
    },
    {
      icon: MapPin,
      title: "Karnataka Focus",
      description:
        "Specialized insights for Karnataka's diverse agro-climatic zones and local farming practices."
    },
    {
      icon: TrendingUp,
      title: "Real-time Market Updates",
      description:
        "Stay informed with live market prices and trends across major Karnataka mandis."
    },
    {
      icon: Users,
      title: "Farmer Community",
      description:
        "Connect with fellow farmers, share experiences, and learn from local success stories."
    }
  ];

  const popularCrops = [
    "Tomato",
    "Onion",
    "Potato",
    "Chili",
    "Maize",
    "Paddy",
    "Sugarcane",
    "Cotton"
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/crops?search=${encodeURIComponent(
        searchQuery
      )}`;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-light to-secondary min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-primary-foreground animate-fade-up">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                {t.homepage.title}
              </h1>
              <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
                {t.homepage.subtitle}
              </p>

              {/* Search Bar */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">
                  {t.homepage.searchTitle}
                </h3>
                <div className="flex gap-2">
                  <Input
                    placeholder={t.homepage.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-white/90 border-white/20 text-gray-900 placeholder:text-gray-600"
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleSearch()
                    }
                  />
                  <Button
                    onClick={handleSearch}
                    className="bg-secondary hover:bg-secondary-dark text-secondary-foreground px-6"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="text-sm text-primary-foreground/80">
                    {t.homepage.popular}
                  </span>
                  {popularCrops.slice(0, 4).map((crop) => (
                    <button
                      key={crop}
                      onClick={() => setSearchQuery(crop)}
                      className="text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors"
                    >
                      {crop}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/crops">
                  <Button className="btn-secondary-hero w-full sm:w-auto">
                    {t.homepage.cta1}
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button
                    variant="outline"
                    className="bg-white/10 border-white/30 text-primary-foreground hover:bg-white/20 w-full sm:w-auto"
                  >
                    {t.homepage.cta2}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-bounce-in">
              <div className="relative rounded-3xl overflow-hidden shadow-hero">
                <img
                  src={heroFarmer}
                  alt="Modern farmer using technology in green fields"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-secondary text-secondary-foreground p-4 rounded-xl shadow-lg animate-pulse-soft">
                <Calendar className="h-6 w-6 mb-2" />
                <p className="text-sm font-semibold">Weather Alert</p>
                <p className="text-xs">Rain expected tomorrow</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t.homepage.quickLinksTitle}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t.homepage.quickLinksSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {quickLinks.map((link) => (
              <Link key={link.title} to={link.path}>
                <Card className="card-feature group hover:scale-105 transition-all duration-300 h-full">
                  <CardHeader className="text-center pb-2">
                    <div className="relative mb-4">
                      <img
                        src={link.image}
                        alt={link.title}
                        className="w-20 h-20 mx-auto rounded-2xl object-cover shadow-md"
                      />
                      <div
                        className={`absolute -bottom-2 -right-2 p-2 rounded-lg ${link.color}`}
                      >
                        <link.icon className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <CardTitle className="text-lg">{link.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-sm">
                      {link.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t.homepage.featuresTitle}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t.homepage.featuresSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="flex items-start space-x-4 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-gradient-to-br from-primary to-primary-light p-3 rounded-xl shadow-soft">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-light">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            {t.homepage.ctaTitle}
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            {t.homepage.ctaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button className="btn-secondary-hero">
                {t.homepage.cta2}
              </Button>
            </Link>
            <Link to="/crops">
              <Button
                variant="outline"
                className="bg-white/10 border-white/30 text-primary-foreground hover:bg-white/20"
              >
                {t.homepage.cta1}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;