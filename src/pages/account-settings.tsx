import React from "react";
import { Card, CardBody, CardHeader, Input, Button, Switch, Tabs, Tab, Select, SelectItem, Divider } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useAuth } from "../context/auth-context";
import { CATEGORY_IMAGES } from "../constants/categoryImages";
import { useLanguage } from "../context/language-context";

export const AccountSettingsPage: React.FC = () => {
  const { user, updateUserSettings, isAuthenticated } = useAuth();
  const { language: currentLang, setLanguage: setAppLanguage, t } = useLanguage();
  const [activeTab, setActiveTab] = React.useState("profile");
  const [name, setName] = React.useState(user?.name || "");
  const [email, setEmail] = React.useState(user?.email || "");
  const [language, setLanguage] = React.useState<"en" | "es">(user?.settings?.language || currentLang);
  const [notifications, setNotifications] = React.useState(user?.settings?.notifications || false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");

  React.useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setLanguage(user.settings.language);
      setNotifications(user.settings.notifications);
    }
  }, [user, setAppLanguage]);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // In a real app, this would update the user profile
      setIsLoading(false);
      setSuccessMessage(t("profileUpdated"));

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }, 1000);
  };

  const handleSettingsUpdate = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      updateUserSettings({
        language,
        notifications,
      });
      setAppLanguage(language);
      setIsLoading(false);
      setSuccessMessage(t("settingsUpdated"));

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }, 1000);
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Icon icon="lucide:alert-circle" className="text-danger text-5xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
        <p className="text-default-500 mb-6">You need to be logged in to access account settings.</p>
        <Button
          color="primary"
          href="/login"
          as="a"
        >
          Login
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">{t("accountSettingsTitle")}</h1>
        <p className="text-default-500">{t("accountSettingsDescription")}</p>
      </div>

      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="bg-success-100 border border-success-200 text-success-700 p-4 rounded-md mb-6"
        >
          <div className="flex items-center">
            <Icon icon="lucide:check-circle" className="mr-2" />
            {successMessage}
          </div>
        </motion.div>
      )}

      <Card>
        <CardBody className="p-0">
          <Tabs
            aria-label="Account settings tabs"
            selectedKey={activeTab}
            onSelectionChange={(key) => setActiveTab(key as string)}
            color="primary"
            variant="underlined"
            classNames={{
              tabList: "gap-6 w-full px-6 border-b border-divider",
              cursor: "w-full",
              tab: "max-w-fit px-0 h-12",
            }}
          >
            <Tab
              key="profile"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:user" />
                  <span>{t("profile")}</span>
                </div>
              }
            >
              <div className="p-6">
                <form onSubmit={handleProfileUpdate}>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3 flex flex-col items-center">
                      <div className="relative mb-4">
                        <img
                          src={CATEGORY_IMAGES["perfil"]}
                          alt="Profile"
                          className="w-32 h-32 rounded-full object-cover"
                        />
                        <Button
                          isIconOnly
                          size="sm"
                          color="primary"
                          className="absolute bottom-0 right-0 rounded-full"
                        >
                          <Icon icon="lucide:camera" width={16} height={16} />
                        </Button>
                      </div>
                      <p className="text-center text-default-500 text-sm">
                        {t("clickUploadPhoto")}
                      </p>
                    </div>

                    <div className="md:w-2/3 space-y-4">
                      <Input
                        label={t("fullName")}
                        placeholder={t("enterFullName")}
                        value={name}
                        onValueChange={setName}
                      />

                      <Input
                        label={t("email")}
                        placeholder={t("enterEmail")}
                        type="email"
                        value={email}
                        onValueChange={setEmail}
                      />

                      <Input
                        label={t("role")}
                        value={user?.role === "seller" ? t("seller") : t("buyer")}
                        isReadOnly
                      />

                      <Divider className="my-4" />

                      <div className="flex justify-end">
                        <Button
                          color="primary"
                          type="submit"
                          isLoading={isLoading}
                        >
                          {t("saveChanges")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </Tab>

            <Tab
              key="settings"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:settings" />
                  <span>{t("settings")}</span>
                </div>
              }
            >
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">{t("preferences")}</h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm mb-2">{t("language")}</label>
                        <Select
                          placeholder={t("language")}
                          selectedKeys={[language]}
                          onChange={(e) => {
                            const value = e.target.value as "en" | "es";
                            setLanguage(value);
                            setAppLanguage(value);
                          }}
                          className="max-w-xs"
                        >
                          <SelectItem key="English">{t("languageEnglish")}</SelectItem>
                          <SelectItem key="Spanish">{t("languageSpanish")}</SelectItem>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Divider />

                  <div>
                    <h3 className="text-lg font-semibold mb-4">{t("notifications")}</h3>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{t("emailNotifications")}</p>
                          <p className="text-default-500 text-sm">{t("emailNotificationsDesc")}</p>
                        </div>
                        <Switch
                          isSelected={notifications}
                          onValueChange={setNotifications}
                        />
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{t("orderUpdates")}</p>
                          <p className="text-default-500 text-sm">{t("orderUpdatesDesc")}</p>
                        </div>
                        <Switch defaultSelected />
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{t("marketingEmails")}</p>
                          <p className="text-default-500 text-sm">{t("marketingEmailsDesc")}</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <Divider />

                  <div className="flex justify-end">
                    <Button
                      color="primary"
                      onPress={handleSettingsUpdate}
                      isLoading={isLoading}
                    >
                      {t("saveSettings")}
                    </Button>
                  </div>
                </div>
              </div>
            </Tab>

            <Tab
              key="security"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:shield" />
                  <span>{t("securityTab")}</span>
                </div>
              }
            >
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">{t("changePassword")}</h3>

                    <div className="space-y-4 max-w-md">
                      <Input
                        label={t("currentPassword")}
                        placeholder={t("currentPassword")}
                        type="password"
                      />

                      <Input
                        label={t("newPassword")}
                        placeholder={t("newPassword")}
                        type="password"
                      />

                      <Input
                        label={t("confirmNewPassword")}
                        placeholder={t("confirmNewPassword")}
                        type="password"
                      />

                      <div className="flex justify-end">
                        <Button color="primary">
                          {t("updatePassword")}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Divider />

                  <div>
                    <h3 className="text-lg font-semibold mb-4">{t("twoFactorAuth")}</h3>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{t("enable2FA")}</p>
                        <p className="text-default-500 text-sm">{t("extraSecurityHint")}</p>
                      </div>
                      <Switch />
                    </div>
                  </div>

                  <Divider />

                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-danger">{t("dangerZone")}</h3>

                    <Card className="border border-danger-200 bg-danger-50">
                      <CardBody className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{t("deleteAccount")}</p>
                            <p className="text-default-500 text-sm">{t("deleteAccountDesc")}</p>
                          </div>
                          <Button color="danger" variant="flat">
                            {t("deleteAccount")}
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};