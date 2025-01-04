import React, { useEffect, useState } from "react";
// import bannerImage1 from "../../images/banner1.jpg";
import "./hero.css";
import Slider from "react-slick";
import grocery from "../../images/grocery.png";
import CountUp from "react-countup";
import article1 from "../../images/articleimg1.png";
import article2 from "../../images/articleimg2.png";
import article3 from "../../images/articleimg3.png";
import article4 from "../../images/articleimg4.png";
import ProductsTabs from "../ProductsTabs/ProductsTabs";
import SubscribeForm from "../SubscribeForm/SubscribeForm";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Hero = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [inView, setInView] = useState(false);
  const [selectedWeights, setSelectedWeights] = useState({});
  const [products, setProducts] = useState([]);
  const [banner, setBanner] = useState([])

  useEffect(() => {
    const fetchBanners = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://swhealthcare.digiindiasolutions.com/api/all-banner');
        console.log(response)
        const newData = response.data.banners
        const filterData = newData.filter((x) => x.bannerStatus === true)
        setBanner(filterData);
      } catch (error) {
        // toast.error("Failed to load banners!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://swhealthcare.digiindiasolutions.com/api/get-product");
        const productData = response.data.products || [];
        const bestsellers = productData.filter((product) => product.bestseller === true);
        setProducts(bestsellers);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleViewDetails = (product) => {
    navigate(
      `/product/product-details/${product._id}?&price=${product.productFinalPrice}&stock=${product.stock}`
    );
  }

  const handleScroll = () => {
    const section = document.getElementById("stats-section");
    if (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        setInView(true);
      }
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: false,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const articles = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          dots: false,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          dots: false,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function truncateText(text, wordLimit) {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  }

  const articleArr = [
    {
      image: article1,
      title: "URO-Flo Urine Bag: A Reliable Solution for Patients",
      desc: "SW Healthcare offers the URO-Flo Urine Bag, a trusted product designed for comfort and convenience. Learn how this product ensures hygienic and reliable urine collection, making it an essential for patients with specific medical needs...",
      date: "13 Dec, 2022",
    },
    {
      image: article2,
      title: "Premium Douche Set: The Ultimate Hygiene Solution",
      desc: "Our Premium Douche Set is designed for effective personal care. SW Healthcare's high-quality douche set ensures comfort and cleanliness, providing a refreshing and hygienic experience for users...",
      date: "13 Dec, 2022",
    },
    {
      image: article3,
      title: "Steam Vaporizer for Better Respiratory Health",
      desc: "Stay healthy and clear your airways with our high-quality Steam Vaporizer. SW Healthcare's steam vaporizer is designed to ease congestion and promote better respiratory health, especially for cold and flu symptoms...",
      date: "13 Dec, 2022",
    },
    {
      image: article4,
      title: "Surgical Tape: A Medical Essential",
      desc: "SW Healthcare provides durable and skin-friendly surgical tape that ensures secure wound closure. Explore how our medical-grade surgical tape enhances patient care by promoting healing and minimizing discomfort...",
      date: "13 Dec, 2022",
    },
    {
      image: article1,
      title: "Protective Gloves: Ensuring Safety and Hygiene",
      desc: "Our high-quality gloves are designed to provide maximum protection. SW Healthcare offers gloves suitable for medical and personal use, ensuring both safety and hygiene for users across various settings...",
      date: "13 Dec, 2022",
    },
    {
      image: article2,
      title: "Hot Water Bottle: Comfort and Relief for Your Body",
      desc: "Our Hot Water Bottle is perfect for soothing aches and pains. SW Healthcare's hot water bottle provides comforting heat therapy for muscle cramps, stress relief, and general comfort...",
      date: "13 Dec, 2022",
    },
    {
      image: article3,
      title: "Electric Warm Bag: Portable Heat Therapy",
      desc: "SW Healthcare introduces the Electric Warm Bag, a modern solution for heat therapy. Ideal for relieving pain and discomfort, our electric warm bag is a portable and easy-to-use alternative to traditional hot water bottles...",
      date: "13 Dec, 2022",
    },
    {
      image: article4,
      title: "Pulse Oximeter: Monitor Your Health at Home",
      desc: "SW Healthcare's Pulse Oximeter allows you to easily monitor your oxygen levels at home. Perfect for patients with respiratory conditions, this device helps track oxygen saturation and pulse rate, ensuring you stay on top of your health...",
      date: "13 Dec, 2022",
    },
    {
      image: article1,
      title: "Digital Thermometer: Accurate and Quick Results",
      desc: "Take control of your health with SW Healthcare's Digital Thermometer. Get accurate and fast temperature readings to track your health condition. Perfect for monitoring fevers in children and adults alike...",
      date: "13 Dec, 2022",
    },
    {
      image: article2,
      title: "Patient Care: Comfort and Support with SW Healthcare",
      desc: "SW Healthcare offers a range of products for patient care, ensuring comfort and support throughout the recovery process. From cushions to medical aids, our products help improve the quality of care for patients...",
      date: "13 Dec, 2022",
    },
    {
      image: article3,
      title: "IV Fixator: Stability and Comfort for IV Therapy",
      desc: "The SW Healthcare IV Fixator ensures the secure and comfortable placement of intravenous lines. Designed to provide stability during treatment, our fixator helps prevent movement-related discomfort...",
      date: "13 Dec, 2022",
    },
    {
      image: article4,
      title: "Face Masks: Protection and Comfort",
      desc: "SW Healthcare's high-quality face masks are designed to provide optimal protection while maintaining comfort. Suitable for medical and everyday use, our face masks offer reliable filtration and comfort...",
      date: "13 Dec, 2022",
    },
    {
      image: article1,
      title: "Surzon Cap: Protection During Surgery",
      desc: "Ensure optimal hygiene during surgical procedures with the Surzon Cap from SW Healthcare. Our surgical caps provide full head coverage, keeping hair and contaminants away from the surgical site...",
      date: "13 Dec, 2022",
    },
  ];



  return (
    <>
      <section className="sidebutton">
        <a href="#home">
          <i class="bi bi-arrow-up-circle"></i>
        </a>
      </section>
      <section className="sidewhatsapp">
        <a target="_blank" href="https://wa.me/9873745454">
          <i class="bi bi-whatsapp"></i>
        </a>
      </section>
      <section className="sidecall">
        <a href="tel:+919873745454">
          <i class="bi bi-telephone"></i>
        </a>
      </section>
      <section id="home" className="hero">
        <div className="heroCarousel">
          <div
            id="carouselExampleControls"
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="2000"
          >
            <div className="carousel-inner">
              {banner.length > 0 ? (
                banner.map((bannerItem, index) => (
                  <div
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                    key={bannerItem.id || index} // Assuming each banner has a unique `id`
                  >
                    <img
                      src={bannerItem.bannerImage} // Assuming the banner has an 'image' property
                      className="d-block w-100"
                      alt={`Banner ${index + 1}`}
                    />
                  </div>
                ))
              ) : (
                // <div className="carousel-item active">
                //   <img
                //     src={bannerImage1} // Fallback to a default image
                //     className="d-block w-100"
                //     alt="Default Banner"
                //   />
                // </div>
                null
              )}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>


      <section className="hero-product">
        <div className="container">
          <div className="headings">
            <h2>Bestsellers</h2>
          </div>
          <div className="slider-container">
            <Slider {...settings}>
              {
                products && products.map((product, index) => (
                  <div key={index}>
                    <div className="product-card">
                      {/* <Link to={"/product/product-details"}> */}
                      <div className="product-image">
                        <img src={product.productImage[0]}
                          alt={product.productName} />
                      </div>
                      <div className="productName">
                        <h3 className="product-title">
                          {truncateText(product.productName, 3)}
                          {/* {product.productName} */}
                        </h3>
                        <div className="price text-end">
                          <>
                            <span className="current-price">
                              <del>&#8377; {product.productPrice}</del>
                            </span> <br />
                            <span className="original-price">
                              Off {product.productDiscountPercentage}%
                            </span> <br />
                            <span className="current-price">
                              &#8377; {product.productFinalPrice}
                            </span>
                          </>
                        </div>

                      </div>
                      {/* </Link> */}

                      <button
                        onClick={() => handleViewDetails(product)}
                        className="add-to-cart"
                      >
                        View Details <i class="bi bi-chevron-double-right"></i>
                      </button>
                    </div>
                  </div>
                ))
              }
            </Slider>
          </div>
        </div>
      </section>

      <section className="grocery">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-7">
              <h4>Welcome To  SW Healthcare</h4>
              <h2>
                <b>SW Healthcare</b> is your one-stop shop for medical supplies, including Stethoscopes
              </h2>
              <p>
                The option to use our state-of-the-art laser engraving service.

                With a wide range of products, competitive prices, and fast delivery.

                Whether you're a healthcare professional or an individual, SW is the place to find the medical supplies you need.
              </p>
              <Link className="button_" to="/all-products">
                Check More Products <i class="bi bi-bag"></i>
              </Link>
            </div>
            <div className="col-md-5">
              <img className="w-100" src={grocery} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="countUp">
        <div id="stats-section" className="stats-container">
          <div className="stat-item">
            <h1>{inView && <CountUp start={0} end={200} duration={2} />}+</h1>
            <p>Vendors</p>
          </div>
          <div className="stat-item">
            <h1>{inView && <CountUp start={0} end={654} duration={2} />}K+</h1>
            <p>Sales</p>
          </div>
          <div className="stat-item">
            <h1>{inView && <CountUp start={0} end={587} duration={2} />}K+</h1>
            <p>Customers</p>
          </div>
          <div className="stat-item">
            <h1>
              {inView && (
                <CountUp start={0} end={4.9} duration={2} decimals={1} />
              )}
              +
            </h1>
            <p>Happy Clients And Partners</p>
          </div>
        </div>
      </section>

      <section className="productDetailsCols">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-2">
              <div className="fruitvegitabls1">
                <div className="overlay">
                  <div className="firstCol">
                    <h6>URO-Flo Urine Bag</h6>
                    <h4>Reliable and Comfortable Solution</h4>
                    <p>
                      The URO-Flo Urine Bag from SW Healthcare is designed for comfort and hygienic urine collection. Perfect for patients with specific medical needs, this product offers both reliability and convenience for long-term use.
                    </p>
                    {/* <Link className="button_" to="">
                      Show More
                    </Link> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-2">
              <div className="fruitvegitabls2">
                <div className="overlay">
                  <h6>Premium Douche Set</h6>
                  <h4>Effective Personal Hygiene</h4>
                  <p>
                    SW Healthcare's Premium Douche Set is designed to provide effective personal care and hygiene. It ensures comfort, cleanliness, and refreshment, making it an essential part of your daily hygiene routine.
                  </p>
                  {/* <Link className="button_" to="">
                    Show More
                  </Link> */}
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-2">
              <div className="fruitvegitabls3">
                <div className="overlay">
                  <h6>Steam Vaporizer</h6>
                  <h4>Improve Respiratory Health</h4>
                  <p>
                    SW Healthcare's Steam Vaporizer provides an effective solution to ease respiratory congestion. Ideal for individuals suffering from cold or flu, this product helps to clear nasal passages and promotes healthy breathing.
                  </p>
                  {/* <Link className="button_" to="">
                    Show More
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >

      <ProductsTabs />

      <section className="article">
        <div className="container">
          <div className="headings">
            <h2>Articles</h2>
            <div className="Article-carousel">
              <div className="slider-container">
                <Slider {...articles}>
                  {articleArr.map((item, index) => (
                    <div>
                      <div className="article_card">
                        <img src={item.image} alt="" />
                        <h5>{truncateText(item.title, 2)}</h5>
                        <p>{truncateText(item.desc, 15)}</p>
                        <p className="date">{item.date}</p>
                        {/* <div className="d-flex justify-start">
                          <Link className="button_" to="">
                            Read More
                          </Link>
                        </div> */}
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SubscribeForm />
    </>
  );
};

export default Hero;
