"use client";
import { useState } from "react";
import { Facebook, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { useLang } from "@/lib/i18n/context";

const socialLinks = [
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Linkedin, href: "#", label: "LinkedIn" },
  { Icon: Youtube,  href: "#", label: "YouTube"  },
];

export default function Footer() {
  const { t }         = useLang();
  const [email, setEmail] = useState("");

  const navLinks = [
    { label: t.nav.home,     href: "#accueil"    },
    { label: t.nav.about,    href: "#mission"     },
    { label: t.nav.programs, href: "#programmes"  },
    { label: t.nav.news,     href: "#actualites"  },
    { label: t.nav.gallery,  href: "#galerie"     },
    { label: t.nav.contact,  href: "#contact"     },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer id="contact" className="bg-[#0D3B6F] text-white">
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">

          {/* ── Col 1: Brand ── */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                <span className="text-white font-bold text-sm">CP</span>
              </div>
              <span className="font-bold text-lg tracking-tight">C.P.D.I.</span>
            </div>
            <p className="text-white/65 text-sm leading-relaxed">{t.footer.tagline}</p>
            <div className="flex gap-3 mt-6">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-[#8BB617] hover:border-[#8BB617] transition-colors duration-200"
                >
                  <Icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Col 2: Navigation ── */}
          <div>
            <h3 className="font-semibold text-sm tracking-widest uppercase text-white/40 mb-5">
              {t.footer.navTitle}
            </h3>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/70 text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Contact ── */}
          <div>
            <h3 className="font-semibold text-sm tracking-widest uppercase text-white/40 mb-5">
              {t.footer.contactTitle}
            </h3>
            <ul className="flex flex-col gap-4 text-sm text-white/70">
              <li className="flex gap-2.5">
                <MapPin size={15} className="text-[#8BB617] shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <span className="text-white/40 text-xs block mb-0.5">{t.footer.siege}</span>
                  Q. Musinzira, Av. de l&apos;Indépendance N°70<br />
                  Gitega, Burundi
                </div>
              </li>
              <li className="flex gap-2.5">
                <MapPin size={15} className="text-[#8BB617] shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <span className="text-white/40 text-xs block mb-0.5">{t.footer.liaison}</span>
                  Rohero II, Av. Bututsi N°25<br />
                  Bujumbura, Burundi
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#8BB617] shrink-0" strokeWidth={1.5} />
                <a href="mailto:Cpdi64454@gmail.com" className="hover:text-white transition-colors">
                  Cpdi64454@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#8BB617] shrink-0" strokeWidth={1.5} />
                <a href="tel:+25769255276" className="hover:text-white transition-colors">
                  +257 69 255 276
                </a>
              </li>
            </ul>
          </div>

          {/* ── Col 4: Newsletter ── */}
          <div>
            <h3 className="font-semibold text-sm tracking-widest uppercase text-white/40 mb-5">
              {t.footer.newsletterTitle}
            </h3>
            <p className="text-white/70 text-sm mb-5 leading-relaxed">
              {t.footer.newsletterDesc}
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <label htmlFor="newsletter-email" className="sr-only">
                {t.footer.newsletterPlaceholder}
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.footer.newsletterPlaceholder}
                required
                className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-[#8BB617] transition-colors"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-[#8BB617] text-white font-semibold text-sm hover:bg-[#7aa114] transition-colors duration-200 active:scale-[0.98]"
              >
                {t.footer.newsletterBtn}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs text-center sm:text-left">
            {t.footer.rights}
          </p>
          {/* Rumuri Digital credit — visible, clickable, tasteful */}
          <p className="text-white/40 text-xs flex items-center gap-1 shrink-0">
            {t.footer.creditPrefix}{" "}
            <a
              href="https://rumuri.digital/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 font-semibold hover:text-[#8BB617] hover:underline underline-offset-2 transition-colors duration-200 inline-flex items-center gap-0.5"
            >
              {t.footer.creditName}
              <span aria-hidden="true" className="text-[10px]">&nbsp;&rarr;</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
