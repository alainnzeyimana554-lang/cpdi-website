"use client";
import { useState, useEffect } from "react";
import Image                   from "next/image";
import Link                    from "next/link";
import { Menu, X }             from "lucide-react";
import { useLang, type Lang }  from "@/lib/i18n/context";

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: t.nav.home,     href: "/"              },
    { label: t.nav.about,    href: "/about"          },
    { label: t.nav.programs, href: "/programmes"     },
    { label: t.nav.news,     href: "/actualites"     },
    { label: t.nav.gallery,  href: "/galerie"        },
    { label: t.nav.contact,  href: "/contact"        },
  ];

  const otherLang: Lang = lang === "fr" ? "en" : "fr";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-white shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            {!logoError ? (
              <div className="relative w-10 h-10 shrink-0">
                <Image
                  src="/images/logo-cpdi.png"
                  alt="Logo C.P.D.I."
                  fill
                  className="object-contain"
                  onError={() => setLogoError(true)}
                  priority
                />
              </div>
            ) : (
              /* Fallback text badge if logo file not yet placed */
              <div className="w-10 h-10 rounded-lg bg-[#1565C0] flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-xs tracking-tight">CP</span>
              </div>
            )}
            <div className="leading-tight">
              <span className="block font-bold text-[#0D3B6F] text-base tracking-tight">C.P.D.I.</span>
              <span className="block text-[10px] text-[#1B7A3D] font-medium tracking-wide hidden sm:block">
                Burundi
              </span>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <nav
            className="hidden md:flex items-center gap-6 lg:gap-8"
            aria-label="Navigation principale"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[15px] font-medium text-[#2C2C2A] hover:text-[#1565C0] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Right cluster: lang toggle + CTA + hamburger ── */}
          <div className="flex items-center gap-2 md:gap-3">

            {/* FR | EN toggle */}
            <button
              onClick={() => setLang(otherLang)}
              aria-label={`Passer en ${otherLang.toUpperCase()}`}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded border border-gray-200 text-[13px] font-semibold text-[#0D3B6F] hover:border-[#1565C0] hover:text-[#1565C0] transition-colors duration-200 select-none"
            >
              <span className={lang === "fr" ? "text-[#1565C0]" : "text-gray-400"}>FR</span>
              <span className="text-gray-300">|</span>
              <span className={lang === "en" ? "text-[#1565C0]" : "text-gray-400"}>EN</span>
            </button>

            {/* Desktop CTA */}
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center px-5 py-2.5 rounded-lg bg-[#1565C0] text-white text-sm font-semibold hover:bg-[#0D3B6F] transition-colors duration-200"
            >
              {t.nav.cta}
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              className="md:hidden p-2 rounded-md text-[#0D3B6F] hover:bg-[#E8F0FE] transition-colors"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-[15px] font-medium text-[#2C2C2A] hover:bg-[#E8F0FE] hover:text-[#1565C0] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {/* Mobile lang toggle */}
            <button
              onClick={() => { setLang(otherLang); setMenuOpen(false); }}
              className="mt-1 px-4 py-3 rounded-lg flex items-center gap-2 text-[15px] font-medium text-[#2C2C2A] hover:bg-[#E8F0FE] transition-colors"
            >
              <span className={lang === "fr" ? "text-[#1565C0] font-bold" : "text-gray-400"}>FR</span>
              <span className="text-gray-300">|</span>
              <span className={lang === "en" ? "text-[#1565C0] font-bold" : "text-gray-400"}>EN</span>
            </button>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 px-4 py-3 rounded-lg bg-[#1565C0] text-white text-[15px] font-semibold text-center hover:bg-[#0D3B6F] transition-colors"
            >
              {t.nav.cta}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
