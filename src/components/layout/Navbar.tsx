"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { siteConfig, navigation } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-surface-dark/95 backdrop-blur-md shadow-hard border-b border-border-dark"
          : "bg-transparent"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container-main flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 focus-ring rounded"
          aria-label={`${siteConfig.name} Home`}
        >
          {/* TODO: Replace with actual SVG logo from client */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-accent-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-heading font-bold text-sm">FJS</span>
            </div>
            <span className="font-heading font-bold text-lg tracking-tight text-text-inverse">
              FJS{" "}
              <span className="text-accent-400">Holding</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-body-sm font-medium transition-colors focus-ring",
                    isActive
                      ? "text-accent-400"
                      : "text-text-inverse-secondary hover:text-text-inverse"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li className="ml-3">
            <Link
              href="/contact"
              className="inline-flex items-center px-5 py-2.5 bg-accent-500 hover:bg-accent-600 text-white text-body-sm font-semibold rounded-lg transition-colors focus-ring"
            >
              Get a Quote
            </Link>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-text-inverse hover:text-accent-400 transition-colors focus-ring rounded"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 top-[72px] bg-surface-dark/98 backdrop-blur-lg transition-all duration-300",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <ul className="container-main flex flex-col gap-2 pt-8">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "block px-4 py-3 rounded-lg text-lg font-medium transition-colors",
                    isActive
                      ? "text-accent-400 bg-accent-500/10"
                      : "text-text-inverse-secondary hover:text-text-inverse hover:bg-white/5"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li className="mt-4">
            <Link
              href="/contact"
              className="block text-center px-5 py-3 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-lg transition-colors"
            >
              Get a Quote
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
