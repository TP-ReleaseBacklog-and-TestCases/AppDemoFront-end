import React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { Card, CardBody, Input, Button, Link, RadioGroup, Radio, Divider } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useAuth } from "../context/auth-context";

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const history = useHistory();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [role, setRole] = React.useState("buyer");
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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

    try {
      await register(name, email, password, role as "buyer" | "seller");
      history.push("/");
    } catch (err) {
      setErrors({
        form: "Registration failed. Please try again."
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
              <h1 className="text-2xl font-bold">Create an Account</h1>
              <p className="text-default-500">Join our marketplace today</p>
            </div>

            {errors.form && (
              <div className="bg-danger-50 border border-danger-200 text-danger p-3 rounded-md mb-4 text-sm">
                {errors.form}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                value={name}
                onValueChange={setName}
                startContent={<Icon icon="lucide:user" className="text-default-400" />}
                isInvalid={!!errors.name}
                errorMessage={errors.name}
                isRequired
              />

              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onValueChange={setEmail}
                startContent={<Icon icon="lucide:mail" className="text-default-400" />}
                isInvalid={!!errors.email}
                errorMessage={errors.email}
                isRequired
              />

              <Input
                label="Password"
                placeholder="Create a password"
                type="password"
                value={password}
                onValueChange={setPassword}
                startContent={<Icon icon="lucide:lock" className="text-default-400" />}
                isInvalid={!!errors.password}
                errorMessage={errors.password}
                isRequired
              />

              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                type="password"
                value={confirmPassword}
                onValueChange={setConfirmPassword}
                startContent={<Icon icon="lucide:lock" className="text-default-400" />}
                isInvalid={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword}
                isRequired
              />

              <div>
                <p className="text-sm mb-2">I want to register as:</p>
                <RadioGroup
                  orientation="horizontal"
                  value={role}
                  onValueChange={setRole}
                >
                  <Radio value="buyer">Buyer</Radio>
                  <Radio value="seller">Seller</Radio>
                </RadioGroup>
              </div>

              <Button
                type="submit"
                color="primary"
                className="w-full"
                isLoading={isLoading}
              >
                Create Account
              </Button>
            </form>

            <Divider className="my-6" />

            <div className="space-y-3">
              <Button
                variant="flat"
                className="w-full"
                startContent={<Icon icon="logos:google-icon" />}
              >
                Sign up with Google
              </Button>

              <Button
                variant="flat"
                className="w-full"
                startContent={<Icon icon="logos:facebook" />}
              >
                Sign up with Facebook
              </Button>
            </div>

            <div className="text-center mt-6">
              <p className="text-default-500">
                Already have an account?{" "}
                <Link as={RouterLink} to="/login" color="primary">
                  Sign in
                </Link>
              </p>
            </div>

            <div className="text-center mt-4">
              <p className="text-xs text-default-400">
                By signing up, you agree to our{" "}
                <Link href="#" size="sm">Terms of Service</Link>{" "}
                and{" "}
                <Link href="#" size="sm">Privacy Policy</Link>
              </p>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};