import BloomLogoWhite from "@/assets/images/bloom-logo-white.png";
import InstagramIcon from "@/assets/images/socials/instagram.svg";
import LinkedInIcon from "@/assets/images/socials/linkedin.svg";
import TwitterIcon from "@/assets/images/socials/twitter.svg";
import { useTheme } from "../../contexts/ThemeContext";
import Container from "../layout/Container";

const StoreFooter = () => {
  const { theme } = useTheme();

  return (
    <footer
      className={`w-full ${
        theme === "business" ? "bg-business-dark" : "bg-reseller-dark"
      } py-1`}
    >
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 py-2 md:py-0">
          <a className="order-1 md:order-1  md:pb-0" href="/">
            <img
              src={BloomLogoWhite}
              alt="Bloom Logo"
              className="w-30 pb-1 h-auto"
            />
          </a>

          <p className="text-white text-xs text-center order-3 md:order-2">
            Copyright © 2024 Beetle Ltd. All rights reserved.
          </p>

          <div className="flex space-x-6 items-center h-full order-2 md:order-3 pb-2 sm:pb-0">
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
                <img src={social.src} alt={social.alt} className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default StoreFooter;
