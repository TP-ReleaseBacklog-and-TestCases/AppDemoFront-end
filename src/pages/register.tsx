import React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { Card, CardBody, Input, Button, Link, RadioGroup, Radio, Divider } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useAuth } from "../context/auth-context";
import { useLanguage } from "../context/language-context";

const BACKEND_URL = "https://backendecommerce-production-fd6f.up.railway.app/users/register";

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const history = useHistory();
  const { t } = useLanguage();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [role, setRole] = React.useState("buyer");
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [lastname, setLastname] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [dni, setDni] = React.useState("");
  const [birthDate, setBirthDate] = React.useState(""); // formato: YYYY-MM-DD
  const [photo, setPhoto] = React.useState(""); // puedes dejarlo vacío o pedir URL
  const [userType, setUserType] = React.useState("CUSTOMER");

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = t("nameRequired");
    }

    if (!email.trim()) {
      newErrors.email = t("emailRequired");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t("emailInvalid");
    }

    if (!password) {
      newErrors.password = t("passwordRequired");
    } else if (password.length < 6) {
      newErrors.password = t("passwordLength");
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = t("passwordsMismatch");
    }

    if (!lastname.trim()) {
      newErrors.lastname = "Apellido es requerido";
    }

    if (!phone.trim()) {
      newErrors.phone = "Teléfono es requerido";
    }

    if (!dni.trim()) {
      newErrors.dni = "DNI es requerido";
    }

    if (!birthDate.trim()) {
      newErrors.birthDate = "Fecha de nacimiento es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Mapea el valor de role a userType
    const mappedUserType = role === "seller" ? "SELLER" : "CUSTOMER";

    try {
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          names: name,
          lastname,
          phone,
          dni,
          birthDate,
          photo,
          userType: mappedUserType,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      history.push("/login");
    } catch (err) {
      setErrors({
        form: t("registrationFailed")
      });
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
              <h1 className="text-2xl font-bold">{t("createAccountTitle")}</h1>
              <p className="text-default-500">{t("joinMarketplace")}</p>
            </div>

            {errors.form && (
              <div className="bg-danger-50 border border-danger-200 text-danger p-3 rounded-md mb-4 text-sm">
                {errors.form}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <Input
                label={t("nameLabel")}
                placeholder={t("namePlaceholder")}
                value={name}
                onValueChange={setName}
                startContent={<Icon icon="lucide:user" className="text-default-400" />}
                isInvalid={!!errors.name}
                errorMessage={errors.name}
                isRequired
              />

              <Input
                label={t("emailLabel")}
                placeholder={t("emailPlaceholder")}
                type="email"
                value={email}
                onValueChange={setEmail}
                startContent={<Icon icon="lucide:mail" className="text-default-400" />}
                isInvalid={!!errors.email}
                errorMessage={errors.email}
                isRequired
              />

              <Input
                label={t("passwordLabel")}
                placeholder={t("passwordPlaceholder")}
                type="password"
                value={password}
                onValueChange={setPassword}
                startContent={<Icon icon="lucide:lock" className="text-default-400" />}
                isInvalid={!!errors.password}
                errorMessage={errors.password}
                isRequired
              />

              <Input
                label={t("confirmPasswordLabel")}
                placeholder={t("confirmPasswordPlaceholder")}
                type="password"
                value={confirmPassword}
                onValueChange={setConfirmPassword}
                startContent={<Icon icon="lucide:lock" className="text-default-400" />}
                isInvalid={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword}
                isRequired
              />

              <Input
                label="Apellido"
                placeholder="Ingresa tu apellido"
                value={lastname}
                onValueChange={setLastname}
                isRequired
              />

              <Input
                label="Teléfono"
                placeholder="Ingresa tu teléfono"
                value={phone}
                onValueChange={setPhone}
                isRequired
              />

              <Input
                label="DNI"
                placeholder="Ingresa tu DNI"
                value={dni}
                onValueChange={setDni}
                isRequired
              />

              <Input
                label="Fecha de nacimiento"
                type="date"
                value={birthDate}
                onValueChange={setBirthDate}
                isRequired
              />

              <Input
                label="Foto (URL)"
                placeholder="URL de tu foto (opcional)"
                value={photo}
                onValueChange={setPhoto}
              />

              <div>
                <p className="text-sm mb-2">{t("registerAs")}</p>
                <RadioGroup
                  orientation="horizontal"
                  value={role}
                  onValueChange={setRole}
                >
                  <Radio value="buyer">{t("buyer")}</Radio>
                  <Radio value="seller">{t("seller")}</Radio>
                </RadioGroup>
              </div>

              <Button
                type="submit"
                color="primary"
                className="w-full"
                isLoading={isLoading}
              >
                {t("createAccount")}
              </Button>
            </form>

            <Divider className="my-6" />

            <div className="space-y-3">
              <Button
                variant="flat"
                className="w-full"
                startContent={<Icon icon="logos:google-icon" />}
              >
                {t("signUpWithGoogle")}
              </Button>

              <Button
                variant="flat"
                className="w-full"
                startContent={<Icon icon="logos:facebook" />}
              >
                {t("signUpWithFacebook")}
              </Button>
            </div>

            <div className="text-center mt-6">
              <p className="text-default-500">
                {t("alreadyHaveAccount")}{" "}
                <Link as={RouterLink} to="/login" color="primary">
                  {t("signIn")}
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
      </motion.div>
    </div>
  );
};