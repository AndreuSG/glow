"use client";

import Link from "next/link";
import Image from "next/image"; // Agregar esta importación
import { siteConfig } from "@/config/site";
import { prefixPath } from "@/lib/prefixPath";
import { Playfair_Display } from "next/font/google";
import { Menu, X } from "lucide-react"; // Quitar Sparkles de aquí
import { RiInstagramLine, RiFacebookCircleLine, RiWhatsappLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const playfair = Playfair_Display({ subsets: ["latin"] });

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  const normalizedBasePath =
    basePath && basePath.endsWith('/') && basePath !== '/' ? basePath.slice(0, -1) : basePath;
  const normalizedPathname =
    normalizedBasePath && pathname.startsWith(normalizedBasePath)
      ? pathname
      : `${normalizedBasePath}${pathname}`;
  const logoSrc = prefixPath("/img/logo-horizontal.png");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href={prefixPath("/")}
            className={`${playfair.className} text-2xl flex items-center gap-2 hover:text-[#C79F7D] transition-colors`}
          >
            <Image
              src={logoSrc}
              alt="Logo"
              width={150}
              height={1}
            />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {siteConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link text-sm font-medium ${
                  normalizedPathname === item.href ? 'active' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            {[
              { Icon: RiInstagramLine, url: "https://www.instagram.com/glowesteticaavanzada/", name: "Instagram" },
              { Icon: RiFacebookCircleLine, url: "https://www.facebook.com/glowesteticaavanzada", name: "Facebook" },
              { Icon: RiWhatsappLine, url: "https://wa.me/34601995234", name: "WhatsApp" }
            ].map(({ Icon, url, name }) => (
              <Link
                key={name}
                href={url}
                className="text-foreground/80 hover:text-[#C79F7D] transition-colors"
                aria-label={name}
                target="_blank"
              >
                <Icon className="w-6 h-6" />
              </Link>
            ))}
            <Button
              variant="outline"
              className="ml-4 hidden md:flex hover:text-[#C79F7D] transition-colors"
              onClick={() => router.push("/contacto")}
            >
              Reservar Cita
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4">
            <div className="flex flex-col space-y-4 px-4">
              {siteConfig.mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-lg font-medium ${
                    normalizedPathname === item.href ? 'text-[#C79F7D]' : 'text-[#4A3F35]'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center gap-4 pt-4">
                {[
                  { Icon: RiInstagramLine, url: "#", name: "Instagram" },
                  { Icon: RiFacebookCircleLine, url: "#", name: "Facebook" },
                  { Icon: RiWhatsappLine, url: "#", name: "WhatsApp" }
                ].map(({ Icon, url, name }) => (
                  <Link
                    key={name}
                    href={url}
                    className="text-[#4A3F35]/80 hover:text-[#C79F7D] transition-colors"
                    aria-label={name}
                    target="_blank"
                  >
                    <Icon className="w-6 h-6" />
                  </Link>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4 hover:text-[#C79F7D] transition-colors"
              >
                Reservar Cita
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}