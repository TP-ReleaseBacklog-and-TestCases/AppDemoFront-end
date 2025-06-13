import enCommon from "../locales/en/common";
import enHome from "../locales/en/home";
import enAccount from "../locales/en/account-settings";
import enLogin from "../locales/en/login";
import enRegister from "../locales/en/register";
import enExploration from "../locales/en/exploration";
import enProductDetail from "../locales/en/product-detail";
import enSeller from "../locales/en/seller-dashboard";
import enFooter from "../locales/en/footer";

import esCommon from "../locales/es/common";
import esHome from "../locales/es/home";
import esAccount from "../locales/es/account-settings";
import esLogin from "../locales/es/login";
import esRegister from "../locales/es/register";
import esExploration from "../locales/es/exploration";
import esProductDetail from "../locales/es/product-detail";
import esSeller from "../locales/es/seller-dashboard";
import esFooter from "../locales/es/footer";
import React from "react";
export type Language = "en" | "es";

const translations: Record<Language, Record<string, string>> = {
    en: {
        ...enCommon,
        ...enHome,
        ...enAccount,
        ...enLogin,
        ...enRegister,
        ...enExploration,
        ...enProductDetail,
        ...enSeller,
        ...enFooter,
    },
    es: {
        ...esCommon,
        ...esHome,
        ...esAccount,
        ...esLogin,
        ...esRegister,
        ...esExploration,
        ...esProductDetail,
        ...esSeller,
        ...esFooter,
    },
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = React.createContext<LanguageContextType>({
    language: "en",
    setLanguage: () => { },
    t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = React.useState<Language>("es");

    React.useEffect(() => {
        const stored = localStorage.getItem("language") as Language | null;
        if (stored === "en" || stored === "es") {
            setLanguageState(stored);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("language", lang);
    };

    const t = React.useCallback(
        (key: string) => translations[language][key] || key,
        [language]
    );

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => React.useContext(LanguageContext);