import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import CTASection from "./components/CTASection";
import CollectionsSection from "./components/CollectionsSection";

const LandingPage = () => {
	return (
		<main className="flex-1">
			<HeroSection />
			<FeaturesSection />
			<CollectionsSection />
			{/* <CTASection /> */}
		</main>
	);
};

export default LandingPage;
