import { useParams, Link } from "react-router-dom";
import { Phone, MessageCircle, Sparkles, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useCatalog } from "@/context/CatalogContext";
import { Accordion } from "@/components/Accordion";
import { scrollToTop } from "@/lib/utils";

export default function CategoryPage() {
  const { categories: categoriesData, products: productsData } = useCatalog();
  const { categorySlug } = useParams<{ categorySlug: string }>();
  
  const category = categoriesData.find(c => c.slug === categorySlug);
  
  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FEFCF8]">
        <h1 className="font-serif text-4xl">Category not found.</h1>
      </div>
    );
  }

  const categoryProducts = productsData.filter(p => p.categoryId === category.id);

  const accordionItems = [
    {
      title: "Collection Details",
      content: (
        <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-600 font-light">
          <li>Saree Type: {category.name}</li>
          <li>Occasion: Wedding, Festive, Reception, Premium Wear</li>
          <li>Length: 5.5 meters (with matching blouse piece)</li>
          <li>Craftsmanship: Handwoven by master artisans</li>
        </ul>
      )
    },
    {
      title: "Fabric Information",
      content: <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">Crafted from the finest pure yarns, this {category.name} collection embodies the highest quality of Indian handlooms. The material is luxurious yet holds an elegant, timeless drape.</p>
    },
    {
      title: "Care Instructions",
      content: <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">Dry clean only. Do not bleach. Store in a cool, dry place wrapped in a soft muslin cloth to preserve the intricate zari work and fabric integrity.</p>
    },
    {
      title: "Shipping & Delivery",
      content: <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">Since our pieces are handcrafted and exclusive, please allow 10-15 business days for delivery. For expedited shipping requests or immediate availability, please contact our stylist.</p>
    },
    {
      title: "Disclaimer",
      content: <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">Due to the authentic handwoven nature of this garment, slight variations in color or motif may occur. This is the hallmark of genuine handloom artistry.</p>
    }
  ];

  return (
    <div className="pt-28 lg:pt-36 pb-24 bg-[#FEFCF8] min-h-screen flex flex-col relative overflow-hidden">
      {/* Subtle Premium Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#9A845A 1px, transparent 1px)', backgroundSize: '48px 48px' }}></div>
      
      <Helmet>
        <title>{category.name} | KanchiKala Sarees</title>
        <meta name="description" content={category.description} />
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex-1 relative z-10">
        
        {/* Sleek Category Header Banner */}
        <div className="max-w-4xl mx-auto text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#9A845A]/10 border border-[#9A845A]/20 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#9A845A]" />
            <span className="text-[#9A845A] text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-medium">Authentic Handloom</span>
          </div>
          
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl uppercase tracking-widest text-[#1A1A1A] mb-6 leading-tight font-normal">
            {category.name}
          </h1>
          
          <div className="w-20 h-[1px] bg-[#9A845A]/60 mx-auto mb-6"></div>
          
          <p className="text-gray-600 font-light text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            {category.description}
          </p>

          {/* Quick Stylist Contact bar */}
          <div className="inline-flex flex-wrap items-center justify-center gap-4 bg-[#F8F6F0] px-6 py-3 rounded-full border border-[#ECE9E2] text-xs uppercase tracking-widest text-gray-700 shadow-sm">
            <span className="text-gray-500">Need Custom Consultation?</span>
            <a href="https://wa.me/919175954455" target="_blank" rel="noopener noreferrer" className="text-[#25D366] font-semibold inline-flex items-center gap-1.5 hover:underline">
              <MessageCircle className="w-4 h-4 fill-[#25D366] text-[#25D366]" /> WhatsApp Stylist
            </a>
            <span className="text-gray-300">|</span>
            <a href="tel:+919623446066" className="text-[#1A1A1A] font-semibold inline-flex items-center gap-1.5 hover:underline">
              <Phone className="w-3.5 h-3.5" /> Call Us
            </a>
          </div>
        </div>

        {/* 2-Column Luxury Grid Layout exactly as requested */}
        <div className="max-w-6xl mx-auto mb-24">
          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:gap-12">
              {categoryProducts.map((product) => {
                return (
                  <div 
                    key={product.id}
                    className="group flex flex-col bg-[#FFFFFF] rounded-xl overflow-hidden border border-[#ECE9E2] hover:border-[#9A845A]/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] transition-all duration-700 transform hover:-translate-y-1"
                  >
                    {/* Card Image navigating to Product Page - Completely clean and unobstructed */}
                    <Link to={`/product/${product.slug}`} onClick={scrollToTop} className="relative aspect-[3/4] w-full overflow-hidden bg-[#F8F6F0] block">
                      <img
                        src={product.images?.[0] || category.coverImage}
                        alt={product.name}
                        className="w-full h-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-105"
                      />
                    </Link>

                    {/* Premium Card Info */}
                    <div className="p-4 sm:p-6 lg:p-8 flex flex-col flex-1 justify-between bg-white">
                      <div className="mb-6">
                        <Link to={`/product/${product.slug}`} onClick={scrollToTop}>
                          <h3 className="font-serif text-lg sm:text-2xl lg:text-3xl text-[#1A1A1A] group-hover:text-[#9A845A] transition-colors duration-500 font-normal leading-snug tracking-wide">
                            {product.name}
                          </h3>
                        </Link>
                        {product.price && <p className="font-semibold text-sm sm:text-base text-[#9A845A] mt-2">{product.price}</p>}
                      </div>

                      {/* Sophisticated Action Bar */}
                      <div className="pt-4 sm:pt-5 border-t border-[#ECE9E2]">
                        <Link
                          to={`/product/${product.slug}`}
                          onClick={scrollToTop}
                          className="group/btn inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-medium text-[#1A1A1A] hover:text-[#9A845A] tracking-[0.15em] uppercase transition-colors"
                        >
                          <span>Explore Saree</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-[#F8F6F0] rounded-xl border border-[#ECE9E2] p-8 max-w-2xl mx-auto">
              <h3 className="font-serif text-2xl mb-4 font-normal text-[#1A1A1A]">New Weaves Arriving Soon</h3>
              <p className="text-gray-600 font-light mb-8">
                Our master artisans are currently weaving fresh designs for this category. Connect directly with our stylist for exclusive preview access.
              </p>
              <a href="https://wa.me/919175954455" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-3.5 uppercase tracking-widest text-xs font-semibold hover:bg-[#20bd5a] transition-colors rounded-full shadow-sm">
                <MessageCircle className="w-4 h-4" /> Request Preview on WhatsApp
              </a>
            </div>
          )}
        </div>

        {/* Collection Specifications & FAQ Accordion */}
        <div className="max-w-4xl mx-auto bg-[#F8F6F0]/60 p-6 sm:p-10 rounded-xl border border-[#ECE9E2]">
          <h2 className="font-serif text-2xl sm:text-3xl text-center uppercase tracking-widest text-[#1A1A1A] mb-8 font-normal">
            About The Collection
          </h2>
          <Accordion items={accordionItems} />
        </div>

      </div>
    </div>
  );
}
