import { HomePageContent } from "@/components/home";
import { portfolioQueryService } from "@/lib/content-application-foundation/services/composition-root";

export default async function HomePage() {
  const model = await portfolioQueryService.getHomePage();
  return <HomePageContent model={model} />;
}
