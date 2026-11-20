import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { LotusEmblem } from './CulturalMotifs';

interface HeaderProps {
  activeSection: string;
}

const NAV_LINKS = [
  { href: '#thu-moi', label: 'Thư mời', id: 'thu-moi' },
  { href: '#khong-gian-sach', label: 'Tủ sách', id: 'khong-gian-sach' },
  { href: '#chuong-trinh', label: 'Chương trình', id: 'chuong-trinh' },
  { href: '#hinh-anh', label: 'Tư liệu', id: 'hinh-anh' },
  { href: '#thu-vien-so', label: 'Thư viện số', id: 'thu-vien-so' },
];

export function Header({ activeSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 28);
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (y / docHeight) * 100)));
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-200 ${
        isScrolled || mobileMenuOpen
          ? 'bg-[#FCFBF8]/95 backdrop-blur-md border-b border-[#E6DCCD] text-[#2B1D16]'
          : 'bg-[#2B1D16]/70 backdrop-blur-sm border-b border-white/10 text-[#FCFBF8]'
      }`}
    >
      {/* Reading depth progress hairline */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#9E2A2B] via-[#C49A45] to-[#E5C67E] transition-transform duration-150 origin-left"
        style={{
          width: '100%',
          transform: `scaleX(${scrollProgress / 100})`,
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Editorial Brand Wordmark */}
        <a
          href="#mo-dau"
          onClick={handleNavClick}
          className="flex items-center gap-2.5 font-serif text-lg font-semibold tracking-tight whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A45] rounded"
        >
          <LotusEmblem
            className={`w-6 h-6 shrink-0 ${
              isScrolled || mobileMenuOpen ? 'text-[#9E2A2B]' : 'text-[#E3C172]'
            }`}
          />
          <span>Ngày Văn Hóa Việt Nam</span>
        </a>

        {/* Zone 2: 5 Concise Single-Line Navigation Links */}
        <nav
          aria-label="Điều hướng chính"
          className="hidden lg:flex items-center gap-7 text-sm font-medium"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A45] rounded ${
                  isScrolled
                    ? isActive
                      ? 'text-[#9E2A2B]'
                      : 'text-[#4A372D] hover:text-[#9E2A2B]'
                    : isActive
                      ? 'text-[#E8C97F]'
                      : 'text-[#F6F1E7]/90 hover:text-white'
                }`}
              >
                {link.label}
                <span
                  className={`absolute left-0 right-0 -bottom-0.5 h-[1.5px] transition-transform duration-200 origin-left ${
                    isScrolled ? 'bg-[#9E2A2B]' : 'bg-[#E3C172]'
                  } ${isActive ? 'scale-x-100' : 'scale-x-0'}`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#dang-ky"
            onClick={handleNavClick}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold tracking-wide bg-[#9E2A2B] text-[#FCFBF8] hover:bg-[#7B1E20] rounded-sm transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C49A45]"
          >
            Đăng ký tham dự
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className={`lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A45] ${
              isScrolled || mobileMenuOpen
                ? 'text-[#2B1D16] hover:bg-[#F6F1E7]'
                : 'text-[#FCFBF8] hover:bg-white/10'
            }`}
            aria-label={mobileMenuOpen ? 'Đóng menu điều hướng' : 'Mở menu điều hướng'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FCFBF8] border-b border-[#E6DCCD] px-5 pt-3 pb-6">
          <nav aria-label="Điều hướng di động" className="flex flex-col divide-y divide-[#E6DCCD]/70">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={handleNavClick}
                className="py-3.5 text-base font-medium text-[#2B1D16] hover:text-[#9E2A2B] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#lien-he"
              onClick={handleNavClick}
              className="py-3.5 text-base font-medium text-[#2B1D16] hover:text-[#9E2A2B] transition-colors"
            >
              Bản đồ & Liên hệ
            </a>
          </nav>
          <div className="pt-4">
            <a
              href="#dang-ky"
              onClick={handleNavClick}
              className="w-full inline-flex items-center justify-center px-5 py-3 text-sm font-semibold bg-[#9E2A2B] text-[#FCFBF8] hover:bg-[#7B1E20] rounded-sm transition-colors"
            >
              Đăng ký tham dự
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
