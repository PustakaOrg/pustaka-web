import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full border-t py-6 md:py-0 bg-sky-600 text-white">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        {/* Copyright */}
        <p className="text-sm">
          © {new Date().getFullYear()} SMA Negeri 3 Banjarmasin
        </p>

        {/* Social Icons */}
        <div className="flex space-x-3 mt-2 md:mt-0">
          <a
            href="#"
            className="bg-secondary hover:bg-primary text-white p-2 rounded-full transition"
            aria-label="Twitter"
          >
            <Twitter className="w-7 h-7" />
          </a>
          <a
            href="https://www.instagram.com/sman3banjarmasin"
            className="bg-secondary hover:bg-primary text-white p-2 rounded-full transition"
            aria-label="Instagram"
          >
            <Instagram className="w-7 h-7" />
          </a>
          <a
            href="https://www.instagram.com/sman3banjarmasin"
            className="bg-secondary hover:bg-primary text-white p-2 rounded-full transition"
            aria-label="Facebook"
          >
            <Facebook className="w-7 h-7" />
          </a>
          <a
            href="https://www.youtube.com/@sman3banjarmasin914"
            className="bg-secondary hover:bg-primary text-white p-2 rounded-full transition"
            aria-label="YouTube"
          >
            <Youtube className="w-7 h-7 mb" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
