import React from "react";

export type Language = "en" | "es";

const translations: Record<Language, Record<string, string>> = {
    en: {
        home: "Home",
        explore: "Explore",
        sellerDashboard: "Seller Dashboard",
        accountSettings: "Account Settings",
        login: "Login",
        logout: "Log Out",
        language: "Language",
        preferences: "Preferences",
        notifications: "Notifications",
        emailNotifications: "Email Notifications",
        emailNotificationsDesc: "Receive emails about your account activity",
        orderUpdates: "Order Updates",
        orderUpdatesDesc: "Receive updates about your orders",
        marketingEmails: "Marketing Emails",
        marketingEmailsDesc: "Receive emails about promotions and deals",
        saveSettings: "Save Settings",
        saveChanges: "Save Changes",
        accountSettingsTitle: "Account Settings",
        accountSettingsDescription: "Manage your account preferences and settings",
        profile: "Profile",
        settingsTab: "Settings",
        securityTab: "Security",
        fullName: "Full Name",
        email: "Email",
        role: "Role",
        buyer: "Buyer",
        seller: "Seller",
        clickUploadPhoto: "Click the camera icon to upload a new photo",
        languageEnglish: "English",
        languageSpanish: "Spanish",
        discoverProducts: "Discover Amazing Products",
        findBestPrices: "Find everything you need at the best prices with our curated selection of top-quality products.",
        exploreNow: "Explore Now",
        joinUs: "Join Us",
        shopByCategory: "Shop by Category",
        browseByCategory: "Browse our wide selection of products by category",
        featuredProducts: "Featured Products",
        viewAll: "View All",
        whatCustomersSay: "What Our Customers Say",
        dontJustTakeWord: "Don't just take our word for it",
        readyToShop: "Ready to Start Shopping?",
        joinThousands: "Join thousands of satisfied customers today.",
        exploreProducts: "Explore Products",
        createAccount: "Create Account",
        changePassword: "Change Password",
        currentPassword: "Current Password",
        newPassword: "New Password",
        confirmNewPassword: "Confirm New Password",
        updatePassword: "Update Password",
        twoFactorAuth: "Two-Factor Authentication",
        enable2FA: "Enable 2FA",
        dangerZone: "Danger Zone",
        deleteAccount: "Delete Account",
        deleteAccountDesc: "Permanently delete your account and all data",
    },
    es: {
        home: "Inicio",
        explore: "Explorar",
        sellerDashboard: "Panel de Vendedor",
        accountSettings: "Configuración de Cuenta",
        login: "Iniciar sesión",
        logout: "Cerrar sesión",
        language: "Idioma",
        preferences: "Preferencias",
        notifications: "Notificaciones",
        emailNotifications: "Notificaciones por correo",
        emailNotificationsDesc: "Recibe correos sobre la actividad de tu cuenta",
        orderUpdates: "Actualizaciones de pedidos",
        orderUpdatesDesc: "Recibe actualizaciones de tus pedidos",
        marketingEmails: "Correos de marketing",
        marketingEmailsDesc: "Recibe correos sobre promociones y ofertas",
        saveSettings: "Guardar Ajustes",
        saveChanges: "Guardar Cambios",
        accountSettingsTitle: "Configuración de Cuenta",
        accountSettingsDescription: "Administra las preferencias y configuraciones de tu cuenta",
        profile: "Perfil",
        settingsTab: "Ajustes",
        securityTab: "Seguridad",
        fullName: "Nombre completo",
        email: "Correo electrónico",
        role: "Rol",
        buyer: "Comprador",
        seller: "Vendedor",
        clickUploadPhoto: "Haz clic en la cámara para subir una nueva foto",
        languageEnglish: "Inglés",
        languageSpanish: "Español",
        discoverProducts: "Descubre productos increíbles",
        findBestPrices: "Encuentra todo lo que necesitas al mejor precio con nuestra selección de productos de alta calidad.",
        exploreNow: "Explorar ahora",
        joinUs: "Únete",
        shopByCategory: "Compra por categoría",
        browseByCategory: "Explora nuestra amplia selección de productos por categoría",
        featuredProducts: "Productos destacados",
        viewAll: "Ver todos",
        whatCustomersSay: "Lo que dicen nuestros clientes",
        dontJustTakeWord: "No solo confíes en nuestra palabra",
        readyToShop: "¿Listo para comenzar a comprar?",
        joinThousands: "Únete a miles de clientes satisfechos hoy.",
        exploreProducts: "Explorar productos",
        createAccount: "Crear cuenta",
        changePassword: "Cambiar contraseña",
        currentPassword: "Contraseña actual",
        newPassword: "Nueva contraseña",
        confirmNewPassword: "Confirmar nueva contraseña",
        updatePassword: "Actualizar contraseña",
        twoFactorAuth: "Autenticación de dos factores",
        enable2FA: "Activar 2FA",
        dangerZone: "Zona de peligro",
        deleteAccount: "Eliminar cuenta",
        deleteAccountDesc: "Eliminar permanentemente tu cuenta y todos los datos",
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
    const [language, setLanguageState] = React.useState<Language>("en");

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