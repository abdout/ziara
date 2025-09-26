"use client";

import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import ShoppingCartIcon from "./ShoppingCartIcon";
import ProfileButton from "./ProfileButton";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Locale } from "@/components/local/config";
import { getShopDictionary } from "@/components/local/shop-dictionary";
import { Menu, X, User, Shield } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@clerk/nextjs";

interface NavbarProps {
  locale: Locale;
}

export default function NavbarWithI18n({ locale }: NavbarProps) {
  const dict = getShopDictionary(locale);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { isSignedIn, userId } = useAuth();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [mobileMenuOpen]);

  // Check if user is admin (you might need to adjust this based on your admin check logic)
  const isAdmin = userId === 'admin' || false; // Adjust this based on your actual admin check

  return (
    <>
      <nav className="flex items-center justify-between my-4" dir="auto">
      {/* Logo Section */}
      <div className="flex items-center gap-6">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Link href={`/${locale}`} className="flex items-center gap-2">
          <Image src="/client/logo.png" alt="Logo" width={32} height={32} />
          <span className="text-xl font-semibold">{dict.common.shop}</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href={`/${locale}`}
            className="hover:text-primary transition-colors"
          >
            {dict.navigation.home}
          </Link>
          <Link
            href={`/${locale}/products`}
            className="hover:text-primary transition-colors"
          >
            {dict.navigation.products}
          </Link>
          <Link
            href={`/${locale}/categories`}
            className="hover:text-primary transition-colors"
          >
            {dict.navigation.categories}
          </Link>
        </div>
      </div>

      {/* Search Bar - Center */}
      <div className="hidden lg:block flex-1 max-w-md mx-8">
        <SearchBar />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-4">
        <LanguageSwitcher />
        <ShoppingCartIcon />
        <ProfileButton />
      </div>

    </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          ref={menuRef}
          className="md:hidden fixed top-20 left-0 right-0 bg-white shadow-lg z-50 border-t"
        >
          <div className="flex flex-col p-4 space-y-4">
            <Link
              href={`/${locale}`}
              className="py-2 px-4 hover:bg-gray-100 rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {dict.navigation.home}
            </Link>
            <Link
              href={`/${locale}/products`}
              className="py-2 px-4 hover:bg-gray-100 rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {dict.navigation.products}
            </Link>
            <Link
              href={`/${locale}/categories`}
              className="py-2 px-4 hover:bg-gray-100 rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {dict.navigation.categories}
            </Link>

            <hr className="my-2" />

            {!isSignedIn ? (
              <Link
                href="/sign-in"
                className="py-2 px-4 hover:bg-gray-100 rounded transition-colors flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User size={18} />
                Login
              </Link>
            ) : (
              <>
                <Link
                  href={`/${locale}/orders`}
                  className="py-2 px-4 hover:bg-gray-100 rounded transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {dict.navigation.orders}
                </Link>
                {isAdmin && (
                  <Link
                    href={`/${locale}/admin/dashboard`}
                    className="py-2 px-4 hover:bg-gray-100 rounded transition-colors flex items-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Shield size={18} />
                    Admin Dashboard
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}