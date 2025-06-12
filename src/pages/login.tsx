import React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { Card, CardBody, Input, Button, Link, Checkbox, Divider } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useAuth } from "../context/auth-context";

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const history = useHistory();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await login(email, password);
      history.push("/");
    } catch (err) {
      setError("Invalid email or password");
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
              <h1 className="text-2xl font-bold">Welcome Back</h1>
              <p className="text-default-500">Sign in to your account</p>
            </div>

            {error && (
              <div className="bg-danger-50 border border-danger-200 text-danger p-3 rounded-md mb-4 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onValueChange={setEmail}
                startContent={<Icon icon="lucide:mail" className="text-default-400" />}
                isRequired
              />

              <Input
                label="Password"
                placeholder="Enter your password"
                type="password"
                value={password}
                onValueChange={setPassword}
                startContent={<Icon icon="lucide:lock" className="text-default-400" />}
                isRequired
              />

              <div className="flex items-center justify-between">
                <Checkbox isSelected={rememberMe} onValueChange={setRememberMe}>
                  Remember me
                </Checkbox>
                <Link href="#" size="sm">Forgot password?</Link>
              </div>

              <Button
                type="submit"
                color="primary"
                className="w-full"
                isLoading={isLoading}
              >
                Sign In
              </Button>
            </form>

            <Divider className="my-6" />

            <div className="space-y-3">
              <Button
                variant="flat"
                className="w-full"
                startContent={<Icon icon="logos:google-icon" />}
              >
                Continue with Google
              </Button>

              <Button
                variant="flat"
                className="w-full"
                startContent={<Icon icon="logos:facebook" />}
              >
                Continue with Facebook
              </Button>
            </div>

            <div className="text-center mt-6">
              <p className="text-default-500">
                Don't have an account?{" "}
                <Link as={RouterLink} to="/register" color="primary">
                  Sign up
                </Link>
              </p>
            </div>

            <div className="text-center mt-4">
              <p className="text-xs text-default-400">
                By signing in, you agree to our{" "}
                <Link href="#" size="sm">Terms of Service</Link>{" "}
                and{" "}
                <Link href="#" size="sm">Privacy Policy</Link>
              </p>
            </div>
          </CardBody>
        </Card>

        {/* Demo credentials */}
        <div className="mt-4 p-4 bg-content1 rounded-lg border border-divider">
          <p className="text-sm font-medium mb-2">Demo Credentials:</p>
          <div className="space-y-1 text-sm">
            <p><span className="text-default-500">Buyer:</span> demo@example.com / password</p>
            <p><span className="text-default-500">Seller:</span> seller@example.com / password</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};