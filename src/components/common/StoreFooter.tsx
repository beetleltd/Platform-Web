import BloomLogoWhite from "@/assets/images/bloom-logo-white.png";
import InstagramIcon from "@/assets/images/socials/instagram.svg";
import LinkedInIcon from "@/assets/images/socials/linkedin.svg";
import TwitterIcon from "@/assets/images/socials/twitter.svg";
import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";
import Container from "../layout/Container";

const StoreFooter = () => {
  const { theme } = useTheme();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <footer
      className={`w-full ${
        theme === "business" ? "bg-business-dark" : "bg-reseller-dark"
      } py-1`}
    >
      <Container>
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0  md:py-0"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.a
            variants={itemVariants}
            className="order-1 md:order-1 pb-3 "
          >
            <img
              src={BloomLogoWhite}
              alt="Bloom logo"
              className="w-24 md:w-30 -mb-3"
            />
          </motion.a>

          <motion.p
            variants={itemVariants}
            className="text-white text-xs text-center order-3 md:order-2"
          >
            Copyright © 2024 Beetle Ltd. All rights reserved.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex space-x-6 items-center h-full order-2 md:order-3 pb-2 sm:pb-0"
          >
            {[
              {
                href: "https://www.linkedin.com/company/use-bloom/",
                src: LinkedInIcon,
                alt: "LinkedIn",
              },
              {
                href: "https://x.com/usebloom_?t=NjriTYaqKrO7ABSr9WLbFw&s=09",
                src: TwitterIcon,
                alt: "Twitter",
              },
              {
                href: "https://www.instagram.com/getbloom_?igsh=Y2IzYTdxaDBjcTZt",
                src: InstagramIcon,
                alt: "Instagram",
              },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-200 ease-in-out hover:scale-110"
              >
                <motion.img
                  src={social.src}
                  alt={social.alt}
                  className="w-6 h-6"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </footer>
  );
};

export default StoreFooter;
