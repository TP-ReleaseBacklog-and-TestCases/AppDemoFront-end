import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { HomePage } from "./pages/home";
import { ExplorationPage } from "./pages/exploration";
import { ProductDetailPage } from "./pages/product-detail";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";
import { SellerDashboardPage } from "./pages/seller-dashboard";
import { AccountSettingsPage } from "./pages/account-settings";
import { AuthProvider } from "./context/auth-context";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/explore" component={ExplorationPage} />
              <Route path="/product/:id" component={ProductDetailPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/seller/dashboard" component={SellerDashboardPage} />
              <Route path="/account/settings" component={AccountSettingsPage} />
              <Redirect to="/" />
            </Switch>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;