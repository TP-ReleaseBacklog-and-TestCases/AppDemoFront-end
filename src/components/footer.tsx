import React from "react";
import { Link } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../context/language-context";

export const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-content1 py-8 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">MarketPlace</h3>
            <p className="text-default-500 text-sm">
              {t("tagline")}
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
            <h3 className="text-lg font-semibold mb-4">{t("shop")}</h3>
            <ul className="space-y-2">
              <li><Link href="/explore" className="text-default-500 text-sm hover:text-primary">{t("allProducts")}</Link></li>
              <li><Link href="/explore?category=Electronics" className="text-default-500 text-sm hover:text-primary">{t("electronics")}</Link></li>
              <li><Link href="/explore?category=Books" className="text-default-500 text-sm hover:text-primary">{t("books")}</Link></li>
              <li><Link href="/explore?category=Clothing" className="text-default-500 text-sm hover:text-primary">{t("clothing")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t("account")}</h3>
            <ul className="space-y-2">
              <li><Link href="/login" className="text-default-500 text-sm hover:text-primary">{t("login")}</Link></li>
              <li><Link href="/register" className="text-default-500 text-sm hover:text-primary">{t("register")}</Link></li>
              <li><Link href="/account/settings" className="text-default-500 text-sm hover:text-primary">{t("accountSettings")}</Link></li>
              <li><Link href="/seller/dashboard" className="text-default-500 text-sm hover:text-primary">{t("sellerDashboard")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t("help")}</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-default-500 text-sm hover:text-primary">{t("faqs")}</Link></li>
              <li><Link href="#" className="text-default-500 text-sm hover:text-primary">{t("shipping")}</Link></li>
              <li><Link href="#" className="text-default-500 text-sm hover:text-primary">{t("returns")}</Link></li>
              <li><Link href="#" className="text-default-500 text-sm hover:text-primary">{t("contactUs")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-divider mt-8 pt-6 text-center text-default-500 text-sm">
          <p>&copy; {new Date().getFullYear()} MarketPlace. {t("rights")}</p>
        </div>
      </div>
    </footer>
  );
};