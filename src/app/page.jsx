import Hero from "@/components/home/Hero";
import CategoryStrip from "@/components/home/CategoryStrip";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CraftStory from "@/components/home/CraftStory";
export default function Home() {
    return (<main>
      <Hero />
      <CategoryStrip />
      <FeaturedProducts />
      <CraftStory />
    </main>);
}
