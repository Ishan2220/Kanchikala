import { useParams } from "react-router-dom";
import { Phone, MessageCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";
import productsData from "@/data/products.json";
import { Accordion } from "@/components/Accordion";

export default function ProductPage() {
  const { productSlug } = useParams<{ productSlug: string }>();
  const product = productsData.find((p) => p.slug === productSlug);
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FEFCF8]">
        <h1 className="font-serif text-4xl">Product not found.</h1>
      </div>
    );
  }

  const accordionItems = [
    {
      title: "Product Details",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          {product.details.map((detail, idx) => (
            <li key={idx}>{detail}</li>
          ))}
        </ul>
      )
    },
    {
      title: "Fabric Information",
      content: <p>Crafted from {product.fabric}, this piece embodies the finest quality of Indian handlooms. The material is lightweight yet holds an elegant drape.</p>
    },
    {
      title: "Care Instructions",
      content: <p>Dry clean only. Do not bleach. Store in a cool, dry place wrapped in a soft muslin cloth to preserve the zari work.</p>
    },
    {
      title: "Shipping & Delivery",
      content: <p>Since our pieces are handcrafted, please allow 10-15 business days for delivery. For expedited shipping requests, please contact our stylist.</p>
    },
    {
      title: "Disclaimer",
      content: <p>Due to the handwoven nature of this garment, slight variations in color or motif may occur. This is the hallmark of authentic handloom artistry.</p>
    }
  ];

  return (
    <div className="pt-24 pb-32 bg-[#FEFCF8] min-h-screen">
      <Helmet>
        <title>{product.name} | KanchiKala Sarees</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Image Gallery (Scroll on Mobile/Desktop) */}
          <div className="w-full lg:w-3/5 flex flex-col gap-4">
            {product.images.map((image, index) => (
              <div key={index} className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                <img
                  src={image}
                  alt={`${product.name} View ${index + 1}`}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Product Info (Sticky on Desktop) */}
          <div className="w-full lg:w-2/5">
            <div className="sticky top-32">
              <span className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-medium mb-4 block">Handloom Collection</span>
              <h1 className="font-serif text-4xl md:text-5xl uppercase tracking-widest mb-6 leading-tight">{product.name}</h1>
              
              <div className="mb-10 text-gray-600 font-light leading-relaxed">
                <p>{product.description}</p>
              </div>

              {/* Contact Stylist Block */}
              <div className="bg-[#F5F5F0] p-8 mb-12 flex flex-col gap-6 relative overflow-hidden">
                {/* Subtle Arch Pattern */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2A2A2A 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                
                <h3 className="font-serif text-xl tracking-widest uppercase relative z-10">Contact Our Stylist</h3>
                <p className="text-sm font-light text-gray-600 relative z-10">
                  Connect with our team for customization, video previews, and fitting assistance.
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
