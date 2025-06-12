import React from "react";
import { Card, CardBody, CardHeader, Input, Button, Switch, Tabs, Tab, Select, SelectItem, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useAuth } from "../context/auth-context";

export const AccountSettingsPage: React.FC = () => {
  const { user, updateUserSettings, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = React.useState("profile");
  const [name, setName] = React.useState(user?.name || "");
  const [email, setEmail] = React.useState(user?.email || "");
  const [language, setLanguage] = React.useState(user?.settings?.language || "English");
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
  }, [user]);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // In a real app, this would update the user profile
      setIsLoading(false);
      setSuccessMessage("Profile updated successfully");

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
      setIsLoading(false);
      setSuccessMessage("Settings updated successfully");

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
        <h1 className="text-2xl font-bold mb-1">Account Settings</h1>
        <p className="text-default-500">Manage your account preferences and settings</p>
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
                  <span>Profile</span>
                </div>
              }
            >
              <div className="p-6">
                <form onSubmit={handleProfileUpdate}>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3 flex flex-col items-center">
                      <div className="relative mb-4">
                        <img
                          src={`https://img.heroui.chat/image/avatar?w=150&h=150&u=${user?.id}`}
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
                        Click the camera icon to upload a new photo
                      </p>
                    </div>

                    <div className="md:w-2/3 space-y-4">
                      <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        value={name}
                        onValueChange={setName}
                      />

                      <Input
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        value={email}
                        onValueChange={setEmail}
                      />

                      <Input
                        label="Role"
                        value={user?.role === "seller" ? "Seller" : "Buyer"}
                        isReadOnly
                      />

                      <Divider className="my-4" />

                      <div className="flex justify-end">
                        <Button
                          color="primary"
                          type="submit"
                          isLoading={isLoading}
                        >
                          Save Changes
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
                  <span>Settings</span>
                </div>
              }
            >
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Preferences</h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm mb-2">Language</label>
                        <Select
                          placeholder="Select language"
                          selectedKeys={[language]}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="max-w-xs"
                        >
                          <SelectItem key="English">English</SelectItem>
                          <SelectItem key="Spanish">Spanish</SelectItem>
                          <SelectItem key="French">French</SelectItem>
                          <SelectItem key="German">German</SelectItem>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Divider />

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Notifications</h3>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-default-500 text-sm">Receive emails about your account activity</p>
                        </div>
                        <Switch
                          isSelected={notifications}
                          onValueChange={setNotifications}
                        />
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Order Updates</p>
                          <p className="text-default-500 text-sm">Receive updates about your orders</p>
                        </div>
                        <Switch defaultSelected />
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Marketing Emails</p>
                          <p className="text-default-500 text-sm">Receive emails about promotions and deals</p>
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
                      Save Settings
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
                  <span>Security</span>
                </div>
              }
            >
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Change Password</h3>

                    <div className="space-y-4 max-w-md">
                      <Input
                        label="Current Password"
                        placeholder="Enter your current password"
                        type="password"
                      />

                      <Input
                        label="New Password"
                        placeholder="Enter your new password"
                        type="password"
                      />

                      <Input
                        label="Confirm New Password"
                        placeholder="Confirm your new password"
                        type="password"
                      />

                      <div className="flex justify-end">
                        <Button color="primary">
                          Update Password
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Divider />

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Two-Factor Authentication</h3>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Enable 2FA</p>
                        <p className="text-default-500 text-sm">Add an extra layer of security to your account</p>
                      </div>
                      <Switch />
                    </div>
                  </div>

                  <Divider />

                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-danger">Danger Zone</h3>

                    <Card className="border border-danger-200 bg-danger-50">
                      <CardBody className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Delete Account</p>
                            <p className="text-default-500 text-sm">Permanently delete your account and all data</p>
                          </div>
                          <Button color="danger" variant="flat">
                            Delete Account
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