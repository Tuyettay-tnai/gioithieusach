import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Share2, Check, SlidersHorizontal, ArrowUp } from 'lucide-react';
import { EventDetails } from '../types/event';
import { DongSonMedallion, EditorialDivider, LotusEmblem } from './CulturalMotifs';

interface ClosingAndFooterProps {
  event: EventDetails;
  onOpenOrganizerEditor: () => void;
}

export function ClosingAndFooter({
  event,
  onOpenOrganizerEditor,
}: ClosingAndFooterProps) {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShareLink = async () => {
    const shareUrl = window.location.origin + window.location.pathname;
    try {
      if (navigator.share) {
        await navigator.share({
          title: event.programName,
          text: event.theme,
          url: shareUrl,
        });
        return;
      }
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2600);
    } catch {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2600);
      } catch {
        // Ignore clipboard errors gracefully
      }
    }
  };

  return (
    <footer className="bg-[#1C120D] text-[#FCFBF8] relative overflow-hidden">
      {/* Subtle Dong Son Medallion Ornament */}
      <div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-28 text-[#C49A45]/10"
        aria-hidden="true"
      >
        <DongSonMedallion className="w-[460px] h-[460px]" />
      </div>

      {/* PHẦN 11: LỜI KẾT – THÔNG ĐIỆP LAN TỎA */}
      <section className="relative py-20 sm:py-28 border-b border-[#C49A45]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs tracking-[0.2em] uppercase text-[#E5C67E] font-medium">
              Thông điệp lan tỏa
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#FCFBF8] text-balance leading-tight">
              Mỗi Cuốn Sách – Một Hành Trình Tri Thức
            </h2>

            <EditorialDivider tone="dark" />

            <p className="mt-8 font-serif italic text-lg sm:text-xl text-[#F6F1E7]/90 leading-[1.85] max-w-3xl mx-auto">
              “Văn hóa đọc không chỉ bắt đầu từ một cuốn sách, mà còn được nuôi dưỡng bằng tình yêu tri thức và sự sẻ chia. Hãy cùng nhau lan tỏa những giá trị tốt đẹp của sách, gìn giữ bản sắc văn hóa Việt Nam và truyền cảm hứng đọc sách đến các thế hệ mai sau.”
            </p>

            <p className="mt-10 font-serif text-base sm:text-lg tracking-[0.12em] uppercase text-[#E5C67E] font-semibold">
              TRÂN TRỌNG CẢM ƠN QUÝ ĐẠI BIỂU VÀ QUÝ KHÁCH MỜI!
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleShareLink}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-medium bg-[#9E2A2B] hover:bg-[#7B1E20] text-[#FCFBF8] rounded-sm transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A45]"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Đã sao chép đường dẫn chia sẻ (Facebook / Zalo)</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>Chia sẻ trang sự kiện (Facebook / Zalo)</span>
                  </>
                )}
              </button>

              <a
                href="#mo-dau"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-medium border border-[#C49A45]/45 text-[#E5C67E] hover:bg-[#C49A45]/15 rounded-sm transition-colors whitespace-nowrap"
              >
                <ArrowUp className="w-4 h-4" />
                <span>Trở lại đầu trang</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quiet Institutional Footer */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#E6DCCD]/70">
        <div className="flex items-center gap-2.5 text-center md:text-left">
          <LotusEmblem className="w-5 h-5 text-[#C49A45] shrink-0" />
          <span>
            {event.programName}
            {event.organizer.trim() ? ` · ${event.organizer}` : ''}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5">
          <a href="#thu-moi" className="hover:text-[#E5C67E] transition-colors">
            Thư mời
          </a>
          <a href="#khong-gian-sach" className="hover:text-[#E5C67E] transition-colors">
            Không gian sách
          </a>
          <a href="#chuong-trinh" className="hover:text-[#E5C67E] transition-colors">
            Chương trình
          </a>
          <a href="#dang-ky" className="hover:text-[#E5C67E] transition-colors">
            Đăng ký
          </a>
          <button
            type="button"
            onClick={onOpenOrganizerEditor}
            className="inline-flex items-center gap-1.5 text-[#E5C67E] hover:text-white transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Biên tập nội dung (BTC)</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
