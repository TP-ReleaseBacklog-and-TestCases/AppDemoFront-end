import React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { Card, CardBody, Input, Button, Link, Checkbox, Divider } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useAuth } from "../context/auth-context";
import { useLanguage } from "../context/language-context";

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const history = useHistory();
  const { t } = useLanguage();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError(t("emailRequired"));
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await login(email, password);
      history.push("/");
    } catch (err) {
      setError(t("invalidCredentials"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full">
          <CardBody className="p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">{t("welcomeBack")}</h1>
              <p className="text-default-500">{t("signInToAccount")}</p>
            </div>

            {error && (
              <div className="bg-danger-50 border border-danger-200 text-danger p-3 rounded-md mb-4 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                label={t("emailLabel")}
                placeholder={t("emailPlaceholder")}
                type="email"
                value={email}
                onValueChange={setEmail}
                startContent={<Icon icon="lucide:mail" className="text-default-400" />}
                isRequired
              />

              <Input
                label={t("passwordLabel")}
                placeholder={t("passwordPlaceholder")}
                type="password"
                value={password}
                onValueChange={setPassword}
                startContent={<Icon icon="lucide:lock" className="text-default-400" />}
                isRequired
              />

              <div className="flex items-center justify-between">
                <Checkbox isSelected={rememberMe} onValueChange={setRememberMe}>
                  {t("rememberMe")}
                </Checkbox>
                <Link href="#" size="sm">{t("forgotPassword")}</Link>
              </div>

              <Button
                type="submit"
                color="primary"
                className="w-full"
                isLoading={isLoading}
              >
                {t("signIn")}
              </Button>
            </form>

            <Divider className="my-6" />

            <div className="space-y-3">
              <Button
                variant="flat"
                className="w-full"
                startContent={<Icon icon="logos:google-icon" />}
              >
                {t("continueWithGoogle")}
              </Button>

              <Button
                variant="flat"
                className="w-full"
                startContent={<Icon icon="logos:facebook" />}
              >
                {t("continueWithFacebook")}
              </Button>
            </div>

            <div className="text-center mt-6">
              <p className="text-default-500">
                {t("dontHaveAccount")}{" "}
                <Link as={RouterLink} to="/register" color="primary">
                  {t("signUp")}
                </Link>
              </p>
            </div>

            <div className="text-center mt-4">
              <p className="text-xs text-default-400">
                {t("termsAgreement")}{" "}
                <Link href="#" size="sm">{t("termsOfService")}</Link>{" "}
                and{" "}
                <Link href="#" size="sm">{t("privacyPolicy")}</Link>
              </p>
            </div>
          </CardBody>
        </Card>

        {/* Demo credentials */}
        <div className="mt-4 p-4 bg-content1 rounded-lg border border-divider">
          <p className="text-sm font-medium mb-2">{t("demoCredentials")}</p>
          <div className="space-y-1 text-sm">
            <p>{t("demoBuyer")}</p>
            <p>{t("demoSeller")}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};