import { Search, Menu, Download, Home, User, LogOut, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import MegaMenu from "@/components/MegaMenu";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Download className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gradient-primary">دنیای نرم‌افزار</h1>
              <p className="text-xs text-muted-foreground">دانلود رایگان</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-secondary/50"
            >
              <Home className="w-4 h-4" />
              <span>خانه</span>
            </Link>
            <MegaMenu />
          </div>

          {/* Search + Auth */}
          <div className="hidden md:flex items-center gap-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجوی نرم‌افزار..."
                className="w-64 h-10 pr-10 pl-4 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </form>

            {user ? (
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Settings className="w-4 h-4" />
                      پنل ادمین
                    </Button>
                  </Link>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut()}
                  className="gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  خروج
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="gradient" size="sm" className="gap-2">
                  <User className="w-4 h-4" />
                  ورود / ثبت‌نام
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/50">
            <form onSubmit={handleSearch} className="relative mb-4">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجوی نرم‌افزار..."
                className="w-full h-10 pr-10 pl-4 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </form>
            <div className="space-y-2">
              <Link
                to="/"
                className="block px-4 py-2 rounded-lg text-foreground hover:bg-secondary/50"
                onClick={() => setIsMenuOpen(false)}
              >
                خانه
              </Link>
              <Link
                to="/platform/windows"
                className="block px-4 py-2 rounded-lg text-foreground hover:bg-secondary/50"
                onClick={() => setIsMenuOpen(false)}
              >
                ویندوز
              </Link>
              <Link
                to="/platform/mac"
                className="block px-4 py-2 rounded-lg text-foreground hover:bg-secondary/50"
                onClick={() => setIsMenuOpen(false)}
              >
                مک
              </Link>
              <Link
                to="/platform/linux"
                className="block px-4 py-2 rounded-lg text-foreground hover:bg-secondary/50"
                onClick={() => setIsMenuOpen(false)}
              >
                لینوکس
              </Link>
              <Link
                to="/platform/android"
                className="block px-4 py-2 rounded-lg text-foreground hover:bg-secondary/50"
                onClick={() => setIsMenuOpen(false)}
              >
                اندروید
              </Link>
              <Link
                to="/search"
                className="block px-4 py-2 rounded-lg text-primary hover:bg-secondary/50"
                onClick={() => setIsMenuOpen(false)}
              >
                جستجوی پیشرفته
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
