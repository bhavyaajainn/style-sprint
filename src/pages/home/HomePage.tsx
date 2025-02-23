
import React, { useRef } from "react";
import AnimatedInfo from "../../components/animated-info/AnimatedInfo";
import Banner from "../../components/banner/Banner";
import ProductList from "../../components/product-list/ProductList";
import Navigation from "../../components/navigation/Navigation";
import SearchFilterComp from "../../components/search-and-filter/SearchFilterComp";
import Footer from "../../components/footer/Footer";

const HomePage = () => {

  const productListRef = useRef<HTMLDivElement | null>(null); // Explicitly set the type of the ref

  const handleScrollToProducts = () => {
    if (productListRef.current) {
      productListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <Navigation />
      <Banner onShopNowClick={handleScrollToProducts} />
      <AnimatedInfo />
      <div ref={productListRef}>
        <ProductList />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
