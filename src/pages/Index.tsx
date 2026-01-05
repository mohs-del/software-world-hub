import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import FeaturedSoftware from "@/components/FeaturedSoftware";
import Footer from "@/components/Footer";
import QuickDownloadSidebar from "@/components/QuickDownloadSidebar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            <div className="flex-1 min-w-0">
              <CategorySection />
              <FeaturedSoftware />
            </div>
            <QuickDownloadSidebar />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
