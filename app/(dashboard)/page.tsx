//import Image from "next/image";
//import Header from "../components/Header";
import CategoriesNavbar from "@/components/CategoriesNavbar";
import HeroBanner from "@/components/HeroBanner";
//import ProductCategories from "@/components/ProductCategories";
import NewArrivals from "@/components/NewArrivalsProducts";
import FeaturedProductsBanner from "@/components/FeaturedProductsBanner";
import TrendingProducts from "@/components/TrendingProducts";
import BestSellerProducts from "@/components/BestSellerProducts";
import BrandsSection from "@/components/BrandsSection";
//import Footer from "@/components/Footer";
//import FetchProducts from '@/components/FetchProducts';

export default function Home() {
  return (
    <div>
      {/* <Header /> */}
      <CategoriesNavbar />
      <HeroBanner />
      <NewArrivals />
      <FeaturedProductsBanner />
      <TrendingProducts />
      <BestSellerProducts /> 
      <BrandsSection />
      {/* <FetchProducts/> */}
      {/* <Footer /> */}
    </div>
  );
}
