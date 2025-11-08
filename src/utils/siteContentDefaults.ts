import { SiteContent } from '@/types/siteContent';

export const defaultSiteContent: SiteContent = {
  home: {
    hero: {
      title: "Adopt American Cocker Spaniels",
      subtitle: "Discover beautiful American Cocker Spaniels waiting for their forever homes. Known for their gentle temperament, expressive eyes, and silky coats, these loving companions are ready to bring joy to your family."
    },
    stats: [
      { number: "500+", label: "Cocker Spaniels Rehomed" },
      { number: "98%", label: "Success Rate" },
      { number: "15+", label: "Years Experience" },
      { number: "24/7", label: "Support Available" }
    ],
    features: [
      {
        title: "Breed Specialists",
        description: "Expert knowledge of American Cocker Spaniel temperament, health, and care requirements for perfect family matches."
      },
      {
        title: "Health Certified",
        description: "All Cocker Spaniels are vet-checked, vaccinated, and screened for breed-specific health conditions."
      },
      {
        title: "Temperament Tested",
        description: "Every dog is evaluated for personality traits to ensure compatibility with your lifestyle and family."
      },
      {
        title: "Lifetime Guidance",
        description: "Ongoing support for grooming, training, and health care specific to American Cocker Spaniels."
      }
    ],
    cta: {
      title: "Ready to Adopt an American Cocker Spaniel?",
      description: "Join hundreds of happy families who found their perfect Cocker Spaniel companion through Poppy Paws. These affectionate, intelligent dogs make wonderful family pets."
    }
  },
  about: {
    mission: {
      title: "Our Mission & Story",
      description: "At Poppy Paws, we specialize in American Cocker Spaniel rescue and adoption. Since 2015, we've been dedicated to matching these gentle, affectionate dogs with loving families who understand and appreciate this wonderful breed."
    },
    story: {
      title: "Our Story",
      paragraphs: [
        "Poppy Paws began with a focus on American Cocker Spaniels after our founder, Sarah Johnson, rescued Poppy, a beautiful buff-colored Cocker Spaniel who had been abandoned. Recognizing the breed's unique needs and wonderful qualities, we became specialists in Cocker Spaniel rescue.",
        "American Cocker Spaniels are known for their sweet disposition, expressive eyes, and silky coats. These medium-sized sporting dogs make excellent family companions and adapt well to various living situations when given proper care and attention.",
        "We're not just an adoption center—we're a community of American Cocker Spaniel enthusiasts, breed experts, veterinarians, and families who believe every Cocker deserves a loving home where their gentle nature and loyal companionship can flourish."
      ]
    },
    values: [
      {
        title: "Breed Expertise",
        description: "Specialized knowledge of American Cocker Spaniel health, temperament, grooming needs, and training requirements."
      },
      {
        title: "Perfect Matches",
        description: "We carefully assess each Cocker Spaniel's personality and match them with families who can meet their specific needs."
      },
      {
        title: "Health Priority",
        description: "All dogs receive comprehensive health screenings for breed-specific conditions like ear infections, eye issues, and hip dysplasia."
      },
      {
        title: "Lifelong Support",
        description: "Guidance on grooming, nutrition, exercise, and healthcare specific to American Cocker Spaniels."
      }
    ],
    team: [
      {
        name: "Sarah Johnson",
        role: "Founder & Director",
        description: "Sarah founded Poppy Paws in 2015 specializing in American Cocker Spaniel rescue after falling in love with the breed.",
        experience: "15+ years with Cockers"
      },
      {
        name: "Dr. Michael Chen",
        role: "Chief Veterinarian",
        description: "Specializes in Cocker Spaniel health issues including ear care, eye conditions, and genetic screening.",
        experience: "12+ years breed specialist"
      },
      {
        name: "Emma Rodriguez",
        role: "Adoption Specialist",
        description: "Expert in Cocker Spaniel behavior and temperament assessment to ensure perfect family matches.",
        experience: "8+ years with breed"
      },
      {
        name: "James Wilson",
        role: "Grooming & Care Coordinator",
        description: "Manages grooming protocols and educates adopters on proper Cocker Spaniel coat maintenance.",
        experience: "6+ years breed grooming"
      }
    ]
  },
  process: {
    header: {
      title: "American Cocker Spaniel Adoption Process",
      description: "Our specialized adoption process ensures the perfect match between American Cocker Spaniels and their forever families. Here's what to expect on your journey to finding your new Cocker companion."
    },
    steps: [
      {
        title: "Browse Available Cockers",
        description: "Explore our American Cocker Spaniels. Learn about each dog's personality, grooming needs, and activity level to find your perfect match.",
        duration: "15-30 minutes"
      },
      {
        title: "Submit Application",
        description: "Complete our Cocker Spaniel adoption application. We'll ask about your experience with the breed, grooming commitment, and lifestyle.",
        duration: "30-45 minutes"
      },
      {
        title: "Breed Education Call",
        description: "Discuss Cocker Spaniel care requirements including grooming, ear cleaning, exercise needs, and common health considerations.",
        duration: "30-45 minutes"
      },
      {
        title: "Home Assessment",
        description: "Ensure your home is suitable for a Cocker Spaniel, with secure fencing and space for their moderate activity needs.",
        duration: "1-2 hours"
      },
      {
        title: "Meet & Greet",
        description: "Spend quality time with your chosen Cocker Spaniel. See how they interact with your family and learn about their unique personality.",
        duration: "1-2 hours"
      },
      {
        title: "Finalize Adoption",
        description: "Complete paperwork, receive grooming guide, schedule first vet visit, and take your American Cocker Spaniel home!",
        duration: "30-60 minutes"
      }
    ],
    requirements: [
      {
        title: "Age Requirement",
        description: "Must be 21 years or older to adopt"
      },
      {
        title: "Grooming Commitment",
        description: "Understanding of Cocker Spaniel grooming needs (brushing, ear care, professional grooming)"
      },
      {
        title: "Housing",
        description: "Secure home environment with landlord permission if renting"
      },
      {
        title: "Family Agreement",
        description: "All household members must agree and understand breed-specific care needs"
      }
    ],
    fees: [
      {
        category: "Cocker Spaniel Puppies",
        fee: "$600",
        includes: "Spay/neuter, vaccinations, microchip, health screening, grooming starter kit"
      },
      {
        category: "Adult Cocker Spaniels",
        fee: "$400",
        includes: "Spay/neuter, vaccinations, microchip, health screening, grooming guide"
      },
      {
        category: "Senior Cocker Spaniels",
        fee: "$250",
        includes: "Spay/neuter, vaccinations, microchip, senior health screening"
      },
      {
        category: "Special Needs Cockers",
        fee: "$200",
        includes: "All medical care, ongoing support, specialized care instructions"
      }
    ]
  },
  contact: {
    phone: "(555) 123-PAWS",
    email: "hello@poppypaws.org",
    address: "123 Adoption Street",
    city: "San Francisco, CA 94102",
    hours: "Mon-Sat: 9AM-6PM, Sunday: 10AM-4PM"
  }
};
