import { useParams } from "react-router-dom";
import { Phone, MessageCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";
import categoriesData from "@/data/categories.json";
import { Accordion } from "@/components/Accordion";

export default function CategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  
  const category = categoriesData.find(c => c.slug === categorySlug);
  
  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FEFCF8]">
        <h1 className="font-serif text-4xl">Category not found.</h1>
      </div>
    );
  }

  const accordionItems = [
    {
      title: "Collection Details",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Saree Type: {category.name}</li>
          <li>Occasion: Wedding, Festive, Reception, Premium Wear</li>
          <li>Length: 5.5 meters (with matching blouse piece)</li>
          <li>Craftsmanship: Handwoven by master artisans</li>
        </ul>
      )
    },
    {
      title: "Fabric Information",
      content: <p>Crafted from the finest pure yarns, this {category.name} piece embodies the highest quality of Indian handlooms. The material is luxurious yet holds an elegant, timeless drape.</p>
    },
    {
      title: "Care Instructions",
      content: <p>Dry clean only. Do not bleach. Store in a cool, dry place wrapped in a soft muslin cloth to preserve the intricate zari work and fabric integrity.</p>
    },
    {
      title: "Shipping & Delivery",
      content: <p>Since our pieces are handcrafted and exclusive, please allow 10-15 business days for delivery. For expedited shipping requests or immediate availability, please contact our stylist.</p>
    },
    {
      title: "Disclaimer",
      content: <p>Due to the authentic handwoven nature of this garment, slight variations in color or motif may occur. This is the hallmark of genuine handloom artistry.</p>
    }
  ];

  return (
    <div className="pt-32 lg:pt-48 pb-24 bg-[#FEFCF8] min-h-screen flex flex-col relative overflow-hidden">
      {/* Subtle Premium Background Pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <Helmet>
        <title>{category.name} | KanchiKala Sarees</title>
        <meta name="description" content={category.description} />
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Image Gallery (Horizontal swipe on mobile, stacked on desktop) */}
          <div className="w-full lg:w-3/5 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory lg:snap-none no-scrollbar gap-4">
            {category.images && category.images.map((image, index) => (
              <div key={index} className="relative aspect-[2/3] w-full shrink-0 snap-center lg:snap-align-none overflow-hidden bg-gray-100 shadow-sm">
                <img
                  src={image}
                  alt={`${category.name} View ${index + 1}`}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Category Info (Natural document flow) */}
          <div className="w-full lg:w-2/5">
            <div className="pt-4 lg:pt-0">
              <span className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-medium mb-4 block">Exclusive Collection</span>
              <h1 className="font-serif text-4xl md:text-5xl uppercase tracking-widest mb-6 leading-tight">{category.name}</h1>
              
              <div className="mb-10 text-gray-600 font-light leading-relaxed">
                <p>{category.description}</p>
              </div>

              {/* Contact Stylist Block */}
              <div className="bg-[#F5F5F0] p-8 mb-12 flex flex-col gap-6 relative overflow-hidden">
                {/* Subtle Arch Pattern */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2A2A2A 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                
                <h3 className="font-serif text-xl tracking-widest uppercase relative z-10">Contact Our Stylist</h3>
                <p className="text-sm font-light text-gray-600 relative z-10">
                  Connect with our team for exclusive color options, video previews, and purchase assistance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                  <a href="https://wa.me/919175954455" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 uppercase tracking-widest text-xs transition-colors">
                    <MessageCircle className="w-4 h-4" /> WhatsApp Us
                  </a>
                  <a href="tel:+919623446066" className="flex-1 flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white py-3 uppercase tracking-widest text-xs transition-colors">
                    <Phone className="w-4 h-4" /> Call Now
                  </a>
                </div>
              </div>

              {/* Accordions */}
              <Accordion items={accordionItems} />
              
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
