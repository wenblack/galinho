import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import BrandBar from "@/components/BrandBar";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategorySection from "@/components/CategorySection";
import PromoBanners from "@/components/PromoBanners";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroBanner />
        <BrandBar />
        <FeaturedProducts />
        <CategorySection />
        <PromoBanners />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
