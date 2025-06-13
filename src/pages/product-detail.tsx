import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button, Chip, Divider, Tabs, Tab, Card, CardBody, Spinner } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Product } from "../components/product-card";
import { CATEGORY_IMAGES } from "../constants/categoryImages";
import { useLanguage } from "../context/language-context";

// Mock product data
const mockProduct: Product = {
  id: "prod1",
  name: "Premium Laptop Pro",
  description: "Experience unparalleled performance with our Premium Laptop Pro. Featuring the latest processor, stunning display, and all-day battery life, this laptop is perfect for professionals and creatives alike. The sleek design and lightweight build make it portable without sacrificing power.\n\nKey Features:\n- Latest generation processor\n- 16GB RAM and 512GB SSD storage\n- 15.6\" 4K Ultra HD Display\n- Backlit keyboard\n- 10+ hours battery life\n- Premium aluminum build",
  price: 1899,
  rating: 4.8,
  category: "Electronics",
  image: CATEGORY_IMAGES["electronics"],
  stock: 15
};

interface ProductDetailPageParams {
  id: string;
}

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<ProductDetailPageParams>();
  const history = useHistory();
  const { t } = useLanguage();
  const [product, setProduct] = React.useState<Product | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [quantity, setQuantity] = React.useState(1);
  const [selectedTab, setSelectedTab] = React.useState("description");
  const [isAddingToCart, setIsAddingToCart] = React.useState(false);

  // Fetch product data
  React.useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProduct({
        ...mockProduct,
        id
      });
      setIsLoading(false);
    }, 800);
  }, [id]);

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= (product?.stock || 1)) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    setIsAddingToCart(true);

    // Simulate API call
    setTimeout(() => {
      setIsAddingToCart(false);
      // Show success message or redirect to cart
      console.log(`Added ${quantity} of ${product?.name} to cart`);
    }, 1000);
  };

  const handleBuyNow = () => {
    // Redirect to checkout
    history.push("/checkout");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Icon icon="lucide:alert-circle" className="text-danger text-5xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">{t("productNotFound")}</h2>
        <p className="text-default-500 mb-6">{t("productNotFoundDesc")}</p>
        <Button
          color="primary"
          onPress={() => history.push("/explore")}
          startContent={<Icon icon="lucide:arrow-left" />}
        >
          {t("backToProducts")}
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Button
          variant="light"
          startContent={<Icon icon="lucide:arrow-left" />}
          onPress={() => history.goBack()}
          className="mb-4"
        >
          Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden">
            <CardBody className="p-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover"
              />
            </CardBody>
          </Card>

          <div className="grid grid-cols-4 gap-2 mt-2">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} isPressable className="overflow-hidden">
                <CardBody className="p-0">
                  <img
                    src={product.image}
                    alt={`${product.name} view ${i}`}
                    className="w-full h-auto object-cover"
                  />
                </CardBody>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Chip color="primary" variant="flat" size="sm">{product.category}</Chip>
              <span className="text-default-500 text-sm">ID: {product.id}</span>
            </div>

            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {Array(5).fill(0).map((_, i) => (
                  <Icon
                    key={i}
                    icon={i < Math.floor(product.rating) ? "lucide:star" : "lucide:star"}
                    className={i < Math.floor(product.rating) ? "text-warning" : "text-default-300"}
                  />
                ))}
              </div>
              <span className="text-default-500">({product.rating})</span>
              <span className="text-default-500">|</span>
              <span className="text-default-500">{product.stock} in stock</span>
            </div>

            <div className="mb-6">
              <span className="text-3xl font-bold text-primary">S/ {product.price.toFixed(2)}</span>
              {product.price > 1000 && (
                <span className="text-default-500 text-sm ml-2">
                  or S/ {(product.price / 12).toFixed(2)}/month with financing
                </span>
              )}
            </div>

            <Divider className="my-6" />

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">{t("quantity")}</h3>
              <div className="flex items-center">
                <Button
                  isIconOnly
                  variant="flat"
                  size="sm"
                  onPress={() => handleQuantityChange(quantity - 1)}
                  isDisabled={quantity <= 1}
                >
                  <Icon icon="lucide:minus" />
                </Button>
                <span className="mx-4 min-w-[40px] text-center">{quantity}</span>
                <Button
                  isIconOnly
                  variant="flat"
                  size="sm"
                  onPress={() => handleQuantityChange(quantity + 1)}
                  isDisabled={quantity >= product.stock}
                >
                  <Icon icon="lucide:plus" />
                </Button>
                <span className="ml-4 text-default-500">
                  {product.stock} {t("available")}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button
                color="primary"
                size="lg"
                className="flex-1"
                startContent={<Icon icon="lucide:shopping-cart" />}
                onPress={handleAddToCart}
                isLoading={isAddingToCart}
              >
                {t("addToCart")}
              </Button>
              <Button
                variant="flat"
                color="primary"
                size="lg"
                className="flex-1"
                onPress={handleBuyNow}
              >
                {t("buyNow")}
              </Button>
            </div>

            <div className="flex flex-col gap-3 text-default-500">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:truck" />
                <span>{t("freeShipping")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="lucide:refresh-ccw" />
                <span>{t("returnPolicy")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="lucide:shield" />
                <span>{t("warranty")}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs
          aria-label="Product details"
          selectedKey={selectedTab}
          onSelectionChange={(key) => setSelectedTab(key as string)}
          color="primary"
          variant="underlined"
          classNames={{
            tabList: "gap-6",
            cursor: "w-full",
            tab: "max-w-fit px-0 h-12",
          }}
        >
          <Tab key="description" title={t("description")}>
            <Card>
              <CardBody className="p-6">
                <div className="prose max-w-none">
                  {product.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="specifications" title={t("specifications")}>
            <Card>
              <CardBody className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">{t("technicalDetails")}</h3>
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b border-divider">
                          <td className="py-2 text-default-500">Brand</td>
                          <td className="py-2 font-medium">TechBrand</td>
                        </tr>
                        <tr className="border-b border-divider">
                          <td className="py-2 text-default-500">Model</td>
                          <td className="py-2 font-medium">Premium Pro X5</td>
                        </tr>
                        <tr className="border-b border-divider">
                          <td className="py-2 text-default-500">Processor</td>
                          <td className="py-2 font-medium">Intel Core i7-11800H</td>
                        </tr>
                        <tr className="border-b border-divider">
                          <td className="py-2 text-default-500">RAM</td>
                          <td className="py-2 font-medium">16GB DDR4</td>
                        </tr>
                        <tr className="border-b border-divider">
                          <td className="py-2 text-default-500">Storage</td>
                          <td className="py-2 font-medium">512GB SSD</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3">{t("physicalSpecifications")}</h3>
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b border-divider">
                          <td className="py-2 text-default-500">Dimensions</td>
                          <td className="py-2 font-medium">35.7 x 23.5 x 1.8 cm</td>
                        </tr>
                        <tr className="border-b border-divider">
                          <td className="py-2 text-default-500">Weight</td>
                          <td className="py-2 font-medium">1.8 kg</td>
                        </tr>
                        <tr className="border-b border-divider">
                          <td className="py-2 text-default-500">Color</td>
                          <td className="py-2 font-medium">Space Gray</td>
                        </tr>
                        <tr className="border-b border-divider">
                          <td className="py-2 text-default-500">Material</td>
                          <td className="py-2 font-medium">Aluminum</td>
                        </tr>
                        <tr className="border-b border-divider">
                          <td className="py-2 text-default-500">Battery Life</td>
                          <td className="py-2 font-medium">Up to 10 hours</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="reviews" title={t("reviews")}>
            <Card>
              <CardBody className="p-6">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <div className="text-center">
                      <div className="text-5xl font-bold mb-2">{product.rating}</div>
                      <div className="flex justify-center mb-2">
                        {Array(5).fill(0).map((_, i) => (
                          <Icon
                            key={i}
                            icon={i < Math.floor(product.rating) ? "lucide:star" : "lucide:star"}
                            className={i < Math.floor(product.rating) ? "text-warning" : "text-default-300"}
                            width={24}
                          />
                        ))}
                      </div>
                      <p className="text-default-500">Based on 128 reviews</p>
                    </div>

                    <Divider className="my-6" />

                    <div>
                      <div className="flex items-center mb-2">
                        <span className="w-16">5 stars</span>
                        <div className="flex-grow h-2 bg-default-100 rounded-full mx-2">
                          <div className="h-full bg-warning rounded-full" style={{ width: '70%' }}></div>
                        </div>
                        <span className="w-8 text-right">70%</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <span className="w-16">4 stars</span>
                        <div className="flex-grow h-2 bg-default-100 rounded-full mx-2">
                          <div className="h-full bg-warning rounded-full" style={{ width: '20%' }}></div>
                        </div>
                        <span className="w-8 text-right">20%</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <span className="w-16">3 stars</span>
                        <div className="flex-grow h-2 bg-default-100 rounded-full mx-2">
                          <div className="h-full bg-warning rounded-full" style={{ width: '5%' }}></div>
                        </div>
                        <span className="w-8 text-right">5%</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <span className="w-16">2 stars</span>
                        <div className="flex-grow h-2 bg-default-100 rounded-full mx-2">
                          <div className="h-full bg-warning rounded-full" style={{ width: '3%' }}></div>
                        </div>
                        <span className="w-8 text-right">3%</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <span className="w-16">1 star</span>
                        <div className="flex-grow h-2 bg-default-100 rounded-full mx-2">
                          <div className="h-full bg-warning rounded-full" style={{ width: '2%' }}></div>
                        </div>
                        <span className="w-8 text-right">2%</span>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-2/3">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-semibold">{t("customerReviews")}</h3>
                      <Button color="primary" variant="flat">{t("writeReview")}</Button>
                    </div>

                    {[1, 2, 3].map((i) => (
                      <div key={i} className="mb-6 pb-6 border-b border-divider last:border-0">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <img
                              src={product.image}
                              alt={`Reviewer ${i}`}
                              className="rounded-full w-10 h-10 mr-3"
                            />
                            <div>
                              <p className="font-semibold">Customer {i}</p>
                              <p className="text-xs text-default-500">Verified Purchase</p>
                            </div>
                          </div>
                          <div className="text-default-500 text-sm">
                            {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="flex mb-2">
                          {Array(5).fill(0).map((_, j) => (
                            <Icon
                              key={j}
                              icon={j < 5 - (i % 2) ? "lucide:star" : "lucide:star"}
                              className={j < 5 - (i % 2) ? "text-warning" : "text-default-300"}
                              width={16}
                            />
                          ))}
                        </div>

                        <h4 className="font-semibold mb-2">
                          {i === 1 ? "Excellent product, highly recommended!" :
                            i === 2 ? "Good value for money" :
                              "Works as expected"}
                        </h4>

                        <p className="text-default-600">
                          {i === 1 ?
                            "I've been using this laptop for a month now and I'm extremely satisfied with its performance. The display is stunning and the battery life is impressive. It handles all my work tasks and even some gaming without any issues." :
                            i === 2 ?
                              "This laptop offers great specs for the price. The build quality is solid and performance is good for everyday tasks. The only minor issue is that it can get a bit warm during intensive tasks." :
                              "Does what it says on the tin. Good laptop for work and casual use. Nothing extraordinary but reliable and well-built."}
                        </p>
                      </div>
                    ))}

                    <Button variant="flat" className="mt-2">{t("loadMoreReviews")}</Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">{t("youMayAlsoLike")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} isPressable className="overflow-hidden">
              <CardBody className="p-0">
                <img
                  src={CATEGORY_IMAGES["electronics"]}
                  alt={`Related Product ${i}`}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3">
                  <h3 className="font-semibold mb-1">Related Product {i}</h3>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-primary">S/ {(product.price * (0.7 + i * 0.1)).toFixed(2)}</span>
                    <div className="flex items-center">
                      <Icon icon="lucide:star" className="text-warning mr-1" width={14} />
                      <span className="text-sm">{(4 + i * 0.2).toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};