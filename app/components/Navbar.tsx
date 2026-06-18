"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { NAV_ITEMS, PHONE, PHONE_DISPLAY } from "@/lib/site";

function ChevronDown({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => {
    setIsOpen(false);
    setToolsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        menuRef.current?.contains(target) ||
        toggleRef.current?.contains(target)
      ) {
        return;
      }
      closeMenu();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  return (
    <header
      role="banner"
      className="sticky top-0 z-40 glass-light border-b border-gray-200/80 shadow-sm"
    >
      <nav
        aria-label="ניווט ראשי"
        className="max-w-6xl mx-auto px-4 sm:px-6"
      >
        <div className="flex items-center justify-between min-h-16 py-2">
          <Link
            href="/"
            className="flex items-center gap-2.5 min-w-0 group rounded-lg"
            aria-label="ח.י שירותי חשמל — יש על מי לסמוך"
          >
            <Image
              src="/images/yatza-tzadik-logo.webp"
              alt=""
              width={96}
              height={101}
              sizes="48px"
              className="object-contain shrink-0 w-12 h-12"
              aria-hidden="true"
            />
            <span className="flex flex-col items-start leading-tight min-w-0">
              <span className="text-slate-900 font-extrabold text-[15px] tracking-tight whitespace-nowrap">
                ח.י שירותי חשמל
              </span>
              <span className="brand-tagline text-shine text-[13px] leading-tight mt-0.5">
                יש על מי לסמוך
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1 list-none" role="list">
            {NAV_ITEMS.map((item) =>
              item.type === "link" ? (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="px-3.5 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ) : (
                <li key={item.label} className="relative group">
                  <button
                    type="button"
                    className="flex items-center gap-1 px-3.5 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {item.label}
                    <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
                  </button>
                  <ul
                    role="menu"
                    aria-label={item.label}
                    className="absolute top-full right-0 mt-1 min-w-[13rem] py-1.5 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-200 list-none"
                  >
                    {item.children.map(({ href, label }) => (
                      <li key={href} role="none">
                        <Link
                          href={href}
                          role="menuitem"
                          className="block px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              )
            )}
          </ul>

          <a
            href={`tel:${PHONE}`}
            data-analytics-location="navbar-call"
            className="hidden md:inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-4 py-2.5 rounded-xl transition-colors shadow-sm"
            aria-label={`התקשר עכשיו: ${PHONE_DISPLAY}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            {PHONE_DISPLAY}
          </a>

          <button
            ref={toggleRef}
            type="button"
            aria-label={isOpen ? "סגור תפריט ניווט" : "פתח תפריט ניווט"}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsOpen((v) => !v)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              {isOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </nav>

      {isOpen && (
        <div
          ref={menuRef}
          id="mobile-nav"
          className="md:hidden bg-white border-t border-gray-100 shadow-lg"
          role="dialog"
          aria-modal="false"
          aria-label="תפריט ניווט"
        >
          <ul className="flex flex-col py-2 list-none" role="list">
            {NAV_ITEMS.map((item) =>
              item.type === "link" ? (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="flex items-center px-6 py-4 text-sm font-medium text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition-colors border-b border-gray-50"
                  >
                    {item.label}
                  </Link>
                </li>
              ) : (
                <li key={item.label} className="border-b border-gray-50">
                  <button
                    type="button"
                    onClick={() => setToolsOpen((v) => !v)}
                    aria-expanded={toolsOpen}
                    className="flex w-full items-center justify-between px-6 py-4 text-sm font-medium text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 opacity-60 transition-transform duration-200${toolsOpen ? " rotate-180" : ""}`}
                    />
                  </button>
                  {toolsOpen && (
                    <ul className="bg-slate-50 list-none" role="list">
                      {item.children.map(({ href, label }) => (
                        <li key={href}>
                          <Link
                            href={href}
                            onClick={closeMenu}
                            className="flex items-center pr-10 pl-6 py-3.5 text-sm font-medium text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/80 transition-colors border-b border-gray-100 last:border-0"
                          >
                            {label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            )}
            <li className="p-4">
              <a
                href={`tel:${PHONE}`}
                data-analytics-location="navbar-mobile-call"
                className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl text-sm transition-colors shadow-sm"
                aria-label={`חייג: ${PHONE_DISPLAY}`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                {PHONE_DISPLAY}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
