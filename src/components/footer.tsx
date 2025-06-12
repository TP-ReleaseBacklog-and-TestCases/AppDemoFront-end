import React from "react";
import { Link } from "@heroui/react";
import { Icon } from "@iconify/react";

export const Footer = () => {
  return (
    <footer className="bg-content1 py-8 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">MarketPlace</h3>
            <p className="text-default-500 text-sm">
              Your one-stop shop for all your needs. Find the best products at the best prices.
            </p>
            <div className="flex mt-4 space-x-4">
              <Link href="#" aria-label="Facebook">
                <Icon icon="lucide:facebook" className="text-default-500 text-xl" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Icon icon="lucide:twitter" className="text-default-500 text-xl" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Icon icon="lucide:instagram" className="text-default-500 text-xl" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/explore" className="text-default-500 text-sm hover:text-primary">All Products</Link></li>
              <li><Link href="/explore?category=Electronics" className="text-default-500 text-sm hover:text-primary">Electronics</Link></li>
              <li><Link href="/explore?category=Books" className="text-default-500 text-sm hover:text-primary">Books</Link></li>
              <li><Link href="/explore?category=Clothing" className="text-default-500 text-sm hover:text-primary">Clothing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Account</h3>
            <ul className="space-y-2">
              <li><Link href="/login" className="text-default-500 text-sm hover:text-primary">Login</Link></li>
              <li><Link href="/register" className="text-default-500 text-sm hover:text-primary">Register</Link></li>
              <li><Link href="/account/settings" className="text-default-500 text-sm hover:text-primary">Account Settings</Link></li>
              <li><Link href="/seller/dashboard" className="text-default-500 text-sm hover:text-primary">Seller Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Help</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-default-500 text-sm hover:text-primary">FAQs</Link></li>
              <li><Link href="#" className="text-default-500 text-sm hover:text-primary">Shipping</Link></li>
              <li><Link href="#" className="text-default-500 text-sm hover:text-primary">Returns</Link></li>
              <li><Link href="#" className="text-default-500 text-sm hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-divider mt-8 pt-6 text-center text-default-500 text-sm">
          <p>&copy; {new Date().getFullYear()} MarketPlace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};