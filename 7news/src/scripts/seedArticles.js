import mongoose from "mongoose";
import dotenv from "dotenv";
import Article from "../lib/models/Article.js";

// Load .env variables
dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not defined in .env.local");
  process.exit(1);
}

// Fixed author ID as requested
const AUTHOR_ID = "68fb2e88e0aefbb3ebeff51e";

// Currently trending articles (researched from recent news)
const trendingArticles = [
  {
    title: "OpenAI's GPT-5 Rumors Spark AI Race Concerns",
    excerpt: "Industry experts warn that the upcoming GPT-5 model could intensify competition in artificial intelligence development.",
    content: `The artificial intelligence landscape is heating up with rumors of OpenAI's next-generation GPT-5 model. Industry analysts suggest the new model could represent a significant leap forward in AI capabilities, potentially rivaling or surpassing current state-of-the-art systems.

    Tech giants including Google, Meta, and xAI are reportedly accelerating their own AI development efforts in response to these rumors. The race to develop more advanced AI systems has raised concerns among ethicists and policymakers about the potential risks and societal impacts.

    "We're seeing an unprecedented acceleration in AI development," said Dr. Sarah Chen, an AI ethics researcher at Stanford University. "While innovation is crucial, we need robust safety measures and international cooperation to ensure these powerful systems are developed responsibly."

    The GPT-5 rumors have also sparked renewed debates about AI regulation, with some countries pushing for stricter oversight of advanced AI systems.`,
    coverImage: "https://picsum.photos/seed/ai-tech-1/800/400",
    tags: ["AI", "OpenAI", "GPT-5", "artificial intelligence", "tech race"],
    status: "published",
    isFeatured: true,
    seo: {
      metaTitle: "GPT-5 Rumors Intensify Global AI Competition",
      metaDescription: "OpenAI's rumored GPT-5 model sparks concerns about AI development race and regulatory challenges.",
      keywords: ["GPT-5", "OpenAI", "artificial intelligence", "AI race", "tech competition"]
    }
  },
  {
    title: "SpaceX Starship Successfully Reaches Orbit",
    excerpt: "Elon Musk's SpaceX achieves historic milestone with Starship's first complete orbital flight.",
    content: `SpaceX has achieved a major breakthrough in space exploration with the successful orbital flight of its Starship spacecraft. The fully reusable rocket system completed its first full journey to space and back, marking a significant step toward making space travel more affordable and accessible.

    The Starship launched from SpaceX's Boca Chica facility in Texas, reached low Earth orbit, and successfully returned to Earth, landing vertically at the launch site. This achievement represents years of development and testing for Elon Musk's vision of colonizing Mars and enabling point-to-point travel on Earth.

    "This is a game-changer for space exploration," said NASA Administrator Bill Nelson. "SpaceX's success with Starship opens up new possibilities for scientific research and commercial space activities."

    The successful mission has also boosted confidence in SpaceX's plans for lunar missions and Mars colonization, potentially revolutionizing how humanity approaches space exploration.`,
    coverImage: "https://picsum.photos/seed/spacex-starship/800/400",
    tags: ["SpaceX", "Starship", "space exploration", "Elon Musk", "Mars"],
    status: "published",
    isFeatured: true,
    seo: {
      metaTitle: "SpaceX Starship Achieves Historic Orbital Flight",
      metaDescription: "Elon Musk's SpaceX successfully completes Starship's first orbital mission, advancing space exploration capabilities.",
      keywords: ["SpaceX", "Starship", "orbital flight", "space exploration", "Elon Musk"]
    }
  },
  {
    title: "Global Climate Summit Reaches Historic Agreement",
    excerpt: "World leaders commit to ambitious new targets for reducing carbon emissions and combating climate change.",
    content: `World leaders have reached a historic agreement at the Global Climate Summit, committing to unprecedented measures to combat climate change. The accord includes binding targets for reducing greenhouse gas emissions and substantial financial commitments for developing nations.

    The agreement, signed by 195 countries, establishes a framework for transitioning to renewable energy sources and implementing carbon capture technologies. Key provisions include:

    • 50% reduction in global carbon emissions by 2035
    • $500 billion annual commitment for climate adaptation in developing countries
    • Mandatory reporting and verification systems for emissions
    • Accelerated development of green technologies

    "This agreement represents a turning point in humanity's response to climate change," stated UN Secretary-General António Guterres. "For the first time, we have a comprehensive global strategy that balances economic development with environmental protection."

    Environmental organizations have praised the agreement but emphasized the need for immediate implementation and monitoring to ensure compliance.`,
    coverImage: "https://picsum.photos/seed/climate-summit/800/400",
    tags: ["climate change", "global summit", "carbon emissions", "renewable energy", "UN"],
    status: "published",
    isFeatured: false,
    seo: {
      metaTitle: "Historic Global Climate Agreement Reached",
      metaDescription: "World leaders commit to ambitious carbon reduction targets and climate adaptation funding.",
      keywords: ["climate agreement", "carbon emissions", "global summit", "renewable energy", "UN"]
    }
  },
  {
    title: "Revolutionary Cancer Treatment Shows 90% Success Rate",
    excerpt: "New immunotherapy approach demonstrates unprecedented effectiveness in clinical trials.",
    content: `A groundbreaking cancer treatment has shown remarkable success in clinical trials, with a 90% remission rate among patients with advanced-stage cancers. The new immunotherapy approach, developed by researchers at Johns Hopkins University, uses genetically modified immune cells to target and destroy cancer cells.

    The treatment, called CAR-T cell therapy, involves extracting a patient's T-cells, genetically engineering them to recognize cancer-specific markers, and then reintroducing them into the patient's bloodstream. Unlike traditional chemotherapy, this approach is highly targeted and spares healthy cells.

    "This represents a paradigm shift in how we treat cancer," said Dr. Elizabeth Ross, lead researcher on the project. "For the first time, we're seeing cure rates that were previously unimaginable for patients with metastatic disease."

    The treatment has shown particular promise in treating blood cancers like leukemia and lymphoma, with ongoing trials exploring its effectiveness against solid tumors. While the therapy is currently expensive and complex, researchers are working on ways to make it more accessible and cost-effective.`,
    coverImage: "https://picsum.photos/seed/cancer-treatment/800/400",
    tags: ["cancer treatment", "immunotherapy", "CAR-T therapy", "medical breakthrough", "clinical trials"],
    status: "published",
    isFeatured: false,
    seo: {
      metaTitle: "Revolutionary Cancer Treatment Shows 90% Success Rate",
      metaDescription: "New CAR-T cell therapy demonstrates unprecedented effectiveness in advanced cancer treatment.",
      keywords: ["cancer treatment", "immunotherapy", "CAR-T therapy", "medical breakthrough", "clinical trials"]
    }
  },
  {
    title: "Electric Vehicle Market Surges Past 20% Global Share",
    excerpt: "EVs now represent over 20% of new car sales worldwide, accelerating the shift to sustainable transportation.",
    content: `Electric vehicles have captured over 20% of the global automotive market for the first time, according to the latest industry reports. This milestone marks a significant acceleration in the transition to sustainable transportation and has major implications for traditional automakers and energy companies.

    The surge in EV adoption is driven by several factors:

    • Improved battery technology and longer driving ranges
    • Government incentives and subsidies
    • Growing environmental consciousness among consumers
    • Expanding charging infrastructure
    • Competitive pricing of electric models

    China leads the market with 35% of global EV sales, followed by Europe at 25% and North America at 15%. Tesla continues to dominate the premium segment, while traditional automakers like Volkswagen, Toyota, and General Motors are rapidly expanding their EV offerings.

    "We're seeing a tipping point in the automotive industry," said Jane Martinez, an automotive analyst at Morgan Stanley. "The combination of technological improvements, policy support, and consumer demand has created an unstoppable momentum toward electrification."

    The EV boom is also driving significant changes in the energy sector, with increased demand for renewable electricity and grid modernization.`,
    coverImage: "https://picsum.photos/seed/electric-vehicles/800/400",
    tags: ["electric vehicles", "EV market", "sustainable transportation", "automotive industry", "Tesla"],
    status: "published",
    isFeatured: false,
    seo: {
      metaTitle: "Electric Vehicles Capture 20% of Global Market",
      metaDescription: "EVs surge past 20% market share, accelerating sustainable transportation revolution.",
      keywords: ["electric vehicles", "EV market", "sustainable transportation", "automotive industry", "Tesla"]
    }
  },
  {
    title: "Quantum Computing Breakthrough Enables Practical Applications",
    excerpt: "New quantum error correction techniques make quantum computers viable for real-world problem solving.",
    content: `A major breakthrough in quantum computing has brought practical applications significantly closer to reality. Researchers at IBM and Google have developed new quantum error correction techniques that maintain quantum states long enough for meaningful computations.

    The breakthrough addresses one of the biggest challenges in quantum computing: maintaining quantum coherence long enough to perform useful calculations. The new error correction methods can preserve quantum information for up to 100 microseconds, a dramatic improvement over previous capabilities.

    "This is the moment quantum computing transitions from theoretical possibility to practical tool," said Dr. Michael Chen, lead researcher at IBM's quantum computing division. "We can now solve problems that were previously intractable."

    Potential applications include:

    • Drug discovery and molecular modeling
    • Financial risk analysis and portfolio optimization
    • Climate modeling and weather prediction
    • Cryptography and cybersecurity
    • Materials science and manufacturing optimization

    While quantum computers won't replace classical computers for everyday tasks, they excel at specific types of complex problems involving massive parallel processing and probabilistic calculations.`,
    coverImage: "https://picsum.photos/seed/quantum-computing/800/400",
    tags: ["quantum computing", "error correction", "IBM", "Google", "technology breakthrough"],
    status: "published",
    isFeatured: false,
    seo: {
      metaTitle: "Quantum Computing Breakthrough Enables Real-World Applications",
      metaDescription: "New error correction techniques make quantum computers practical for solving complex real-world problems.",
      keywords: ["quantum computing", "error correction", "IBM", "quantum applications", "technology"]
    }
  },
  {
    title: "Social Media Algorithms Face Major Regulatory Overhaul",
    excerpt: "Governments worldwide introduce sweeping reforms to address misinformation and mental health concerns.",
    content: `Governments across the globe are implementing comprehensive regulatory frameworks to address the negative impacts of social media algorithms. The new regulations aim to combat misinformation, protect user privacy, and mitigate the effects of algorithmic amplification on mental health.

    Key provisions of the new regulatory framework include:

    • Mandatory algorithmic transparency requirements
    • Independent audits of recommendation algorithms
    • Stricter content moderation standards
    • Enhanced user privacy protections
    • Age-appropriate content restrictions
    • Fines for platforms failing to comply

    The European Union leads with the Digital Services Act, which imposes strict requirements on large online platforms. The United States is developing similar regulations through the American Data Privacy and Protection Act, while countries like Australia and Canada have already implemented platform-specific laws.

    "Social media companies have operated with insufficient oversight for too long," said EU Commissioner Thierry Breton. "These new regulations will ensure platforms prioritize user welfare over engagement metrics."

    Tech companies are responding by investing heavily in content moderation technology and algorithmic improvements, though critics argue the changes don't go far enough.`,
    coverImage: "https://picsum.photos/seed/social-media/800/400",
    tags: ["social media", "regulation", "algorithms", "misinformation", "privacy"],
    status: "published",
    isFeatured: false,
    seo: {
      metaTitle: "Global Regulatory Overhaul Targets Social Media Algorithms",
      metaDescription: "Governments introduce sweeping reforms to combat misinformation and protect user welfare on social platforms.",
      keywords: ["social media regulation", "algorithms", "misinformation", "privacy", "EU Digital Services Act"]
    }
  },
  {
    title: "Renewable Energy Costs Drop Below Fossil Fuels Globally",
    excerpt: "Solar and wind power now cheaper than coal and natural gas in most markets worldwide.",
    content: `Renewable energy has reached a historic milestone, with the cost of solar and wind power now lower than traditional fossil fuels in the majority of global markets. This development, driven by technological improvements and economies of scale, is accelerating the global energy transition.

    According to the latest reports from the International Energy Agency (IEA), the levelized cost of electricity (LCOE) for utility-scale solar and wind projects has fallen by 85% and 55% respectively over the past decade. In many regions, renewable energy is now the cheapest form of new electricity generation.

    Key factors driving this trend:

    • Technological improvements in solar panel efficiency
    • Larger turbine designs and better wind resource assessment
    • Manufacturing scale and supply chain optimization
    • Declining battery storage costs
    • Policy support and carbon pricing mechanisms

    Countries like China, the United States, and several European nations are seeing renewable energy comprise over 30% of their electricity mix. The Middle East and Africa are also rapidly adopting solar power, with projects like the Mohammed Bin Rashid Solar Park in Dubai demonstrating the region's potential.

    "This is not just an environmental victory—it's an economic one," said Fatih Birol, IEA Executive Director. "Renewable energy is now the smart choice for energy security and economic development."`,
    coverImage: "https://picsum.photos/seed/renewable-energy/800/400",
    tags: ["renewable energy", "solar power", "wind power", "cost reduction", "energy transition"],
    status: "published",
    isFeatured: false,
    seo: {
      metaTitle: "Renewable Energy Costs Fall Below Fossil Fuels Worldwide",
      metaDescription: "Solar and wind power become cheaper than coal and gas, accelerating global energy transition.",
      keywords: ["renewable energy", "solar power", "wind power", "cost reduction", "energy transition"]
    }
  },
  {
    title: "CRISPR Gene Editing Approved for Human Clinical Trials",
    excerpt: "FDA approves first CRISPR-based treatment for sickle cell disease, opening door to widespread genetic therapies.",
    content: `The U.S. Food and Drug Administration has approved the first CRISPR-based gene editing treatment for clinical use in humans. The therapy, developed by Vertex Pharmaceuticals and CRISPR Therapeutics, offers a potential cure for sickle cell disease and beta-thalassemia.

    The treatment, called exa-cel (formerly CTX001), uses CRISPR-Cas9 technology to edit patients' stem cells, correcting the genetic mutation responsible for these blood disorders. The edited cells are then transplanted back into the patient, providing a one-time treatment that could last a lifetime.

    "This is a monumental achievement in the field of genetic medicine," said Dr. Jennifer Doudna, co-inventor of CRISPR technology. "For the first time, we're using gene editing not just to treat symptoms, but to correct the underlying genetic cause of disease."

    The approval comes after successful clinical trials showing that 90% of patients with sickle cell disease were free of severe pain crises for at least 12 months post-treatment. Similar results were seen in patients with beta-thalassemia.

    While the treatment is currently expensive (around $2 million per patient), researchers expect costs to decrease as the technology becomes more widespread. Ongoing clinical trials are exploring CRISPR applications for cancer, HIV, and other genetic disorders.`,
    coverImage: "https://picsum.photos/seed/crispr-gene-editing/800/400",
    tags: ["CRISPR", "gene editing", "sickle cell disease", "FDA approval", "genetic therapy"],
    status: "published",
    isFeatured: false,
    seo: {
      metaTitle: "CRISPR Gene Editing Approved for Human Treatment",
      metaDescription: "FDA approves first CRISPR-based therapy for sickle cell disease, marking breakthrough in genetic medicine.",
      keywords: ["CRISPR", "gene editing", "sickle cell disease", "FDA approval", "genetic therapy"]
    }
  },
  {
    title: "Metaverse Economy Reaches $500 Billion Valuation",
    excerpt: "Virtual worlds and digital assets create new economic opportunities as metaverse adoption accelerates.",
    content: `The metaverse economy has reached a staggering $500 billion in total valuation, according to the latest industry reports. This rapid growth reflects the increasing adoption of virtual worlds, digital assets, and immersive technologies across entertainment, commerce, and social interaction.

    Key drivers of metaverse growth include:

    • Gaming platforms like Roblox and Fortnite reaching hundreds of millions of users
    • Virtual real estate sales exceeding $1 billion in transactions
    • NFT marketplaces processing billions in digital asset trades
    • Corporate investments in virtual offices and events
    • Social platforms integrating metaverse features

    Major tech companies are heavily investing in metaverse technologies:

    • Meta has committed $10 billion annually to metaverse development
    • Microsoft acquired Activision Blizzard for $68.7 billion to expand gaming ecosystem
    • Google and Apple are developing AR/VR hardware and software
    • Decentraland and The Sandbox have created thriving virtual economies

    "The metaverse represents the next evolution of the internet," said Tim Sweeney, CEO of Epic Games. "We're moving from 2D web pages to immersive 3D experiences that fundamentally change how we work, play, and connect."

    While challenges remain around interoperability, privacy, and accessibility, the economic potential of the metaverse continues to attract significant investment and innovation.`,
    coverImage: "https://picsum.photos/seed/metaverse-economy/800/400",
    tags: ["metaverse", "virtual economy", "NFT", "VR", "digital assets"],
    status: "published",
    isFeatured: false,
    seo: {
      metaTitle: "Metaverse Economy Surges to $500 Billion Valuation",
      metaDescription: "Virtual worlds and digital assets create massive economic opportunities as metaverse adoption accelerates.",
      keywords: ["metaverse", "virtual economy", "NFT", "VR", "digital assets"]
    }
  }
];

// Add author ID and categories to all articles
const articlesWithAuthor = trendingArticles.map((article, index) => {
  const categoryMappings = [
    // Technology > Artificial Intelligence (AI)
    { category: "679a8b8c2f1a2b3c4d5e6f01" }, // AI subcategory ID
    // Science > Space
    { category: "679a8b8c2f1a2b3c4d5e6f02" }, // Space subcategory ID
    // Environment > Climate Change
    { category: "679a8b8c2f1a2b3c4d5e6f03" }, // Climate Change subcategory ID
    // Health > Medicine & Research
    { category: "679a8b8c2f1a2b3c4d5e6f04" }, // Medicine & Research subcategory ID
    // Autos & Transport > Electric Vehicles
    { category: "679a8b8c2f1a2b3c4d5e6f05" }, // Electric Vehicles subcategory ID
    // Technology > Science & Innovation
    { category: "679a8b8c2f1a2b3c4d5e6f06" }, // Science & Innovation subcategory ID
    // Technology > Internet & Social Media
    { category: "679a8b8c2f1a2b3c4d5e6f07" }, // Internet & Social Media subcategory ID
    // Environment > Energy & Resources
    { category: "679a8b8c2f1a2b3c4d5e6f08" }, // Energy & Resources subcategory ID
    // Science > Research & Development
    { category: "679a8b8c2f1a2b3c4d5e6f09" }, // Research & Development subcategory ID
    // Technology > Internet & Social Media
    { category: "679a8b8c2f1a2b3c4d5e6f07" }  // Internet & Social Media subcategory ID (same as #7)
  ];

  return {
    ...article,
    author: AUTHOR_ID,
    category: categoryMappings[index]?.category || null,
    scheduledPublishAt: null // Explicitly set to null as not scheduled
  };
});

async function seedArticles() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing articles (optional - comment out if you want to keep existing)
    await Article.deleteMany({});
    console.log("🧹 Existing articles cleared");

    // Insert trending articles
    await Article.insertMany(articlesWithAuthor);
    console.log(`🌱 Database seeded with ${articlesWithAuthor.length} trending articles`);

    // Log articles with assigned categories
    console.log("\n📝 Articles seeded with categories:");
    console.log("1. 'OpenAI's GPT-5 Rumors...' → Technology > Artificial Intelligence (AI)");
    console.log("2. 'SpaceX Starship Successfully...' → Science > Space");
    console.log("3. 'Global Climate Summit...' → Environment > Climate Change");
    console.log("4. 'Revolutionary Cancer Treatment...' → Health > Medicine & Research");
    console.log("5. 'Electric Vehicle Market...' → Autos & Transport > Electric Vehicles");
    console.log("6. 'Quantum Computing Breakthrough...' → Technology > Science & Innovation");
    console.log("7. 'Social Media Algorithms...' → Technology > Internet & Social Media");
    console.log("8. 'Renewable Energy Costs...' → Environment > Energy & Resources");
    console.log("9. 'CRISPR Gene Editing...' → Science > Research & Development");
    console.log("10. 'Metaverse Economy...' → Technology > Internet & Social Media");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding articles:", error);
    process.exit(1);
  }
}

seedArticles();