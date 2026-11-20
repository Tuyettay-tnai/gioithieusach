import React from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, BookOpen, Calendar, MapPin, Building2, SlidersHorizontal } from 'lucide-react';
import { EXHIBITION_ASSETS } from '../config/eventConfig';
import { EventDetails } from '../types/event';
import { DongSonMedallion, LotusEmblem, ResilientImage } from './CulturalMotifs';

interface HeroSectionProps {
  event: EventDetails;
  onOpenOrganizerEditor: () => void;
}

export function HeroSection({ event, onOpenOrganizerEditor }: HeroSectionProps) {
  return (
    <section id="mo-dau" className="relative bg-[#1F140E] text-[#FCFBF8] overflow-hidden">
      {/* Full-bleed atmospheric background photograph with subtle depth */}
      <div className="absolute inset-0">
        <ResilientImage
          src={EXHIBITION_ASSETS.hero}
          alt="Không gian trưng bày sách mở dưới ánh sáng vàng, hoa sen và trống đồng Đông Sơn nhân Ngày Văn hóa Việt Nam"
          className="w-full h-full object-cover object-center opacity-55 scale-[1.01]"
        />
        {/* Measured museum contrast scrims */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#19100B]/95 via-[#1F140E]/82 to-[#19100B]/55"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#19100B] via-transparent to-[#19100B]/65"
          aria-hidden="true"
        />
      </div>

      {/* Subtle golden Dong Son ornamental frame on desktop right edge */}
      <div
        className="pointer-events-none hidden lg:block absolute -right-24 top-1/2 -translate-y-1/2 text-[#C49A45]/18"
        aria-hidden="true"
      >
        <DongSonMedallion className="w-[520px] h-[520px]" />
      </div>

      {/* Main Hero Canvas */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 text-xs sm:text-sm tracking-[0.18em] text-[#E5C67E] mb-6"
            >
              <LotusEmblem className="w-5 h-5 text-[#C49A45] shrink-0" />
              <span className="font-medium">
                Triển lãm &amp; Giới thiệu sách Thư viện
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-balance leading-[1.12] tracking-tight"
            >
              <span className="block text-[clamp(2.25rem,4.6vw,4.1rem)] font-semibold text-[#FCFBF8]">
                NGÀY VĂN HÓA VIỆT NAM
              </span>
              <span className="block mt-3 text-[clamp(1.4rem,2.6vw,2.35rem)] font-medium text-[#E5C67E]">
                GIỚI THIỆU SÁCH CỦA THƯ VIỆN
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-xs sm:text-sm tracking-[0.16em] text-[#E5C67E]/90 font-medium"
            >
              {event.theme.toUpperCase()}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 pt-7 border-t border-[#C49A45]/30 max-w-2xl"
            >
              <p className="font-serif italic text-lg sm:text-xl leading-relaxed text-[#F6F1E7]/95">
                “Mỗi cuốn sách mở ra một chân trời tri thức. Mỗi trang sách lưu giữ một phần hồn cốt dân tộc.”
              </p>
            </motion.div>

            {/* Primary & Secondary CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <a
                href="#thu-moi"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-semibold tracking-wide bg-[#9E2A2B] text-[#FCFBF8] hover:bg-[#821F20] rounded-sm transition-colors duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F140E] focus-visible:ring-[#C49A45]"
              >
                <span>KHÁM PHÁ SỰ KIỆN</span>
                <ArrowDownRight className="w-4 h-4" />
              </a>

              <a
                href="#khong-gian-sach"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-semibold tracking-wide border border-[#C49A45]/75 text-[#F6F1E7] hover:bg-[#C49A45]/15 rounded-sm transition-colors duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F140E] focus-visible:ring-[#C49A45]"
              >
                <BookOpen className="w-4 h-4 text-[#E5C67E]" />
                <span>KHÁM PHÁ TỦ SÁCH</span>
              </a>
            </motion.div>
          </div>

          {/* Right Curatorial Feature Framing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block lg:col-span-4"
          >
            <div className="relative p-3 border border-[#C49A45]/35 bg-[#1B110C]/70 backdrop-blur-sm">
              <div className="aspect-[4/5] overflow-hidden bg-[#2B1D16]">
                <ResilientImage
                  src={EXHIBITION_ASSETS.coverCinnabar}
                  alt="Bìa ấn phẩm trưng bày mang họa tiết trống đồng Đông Sơn"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="pt-4 pb-1 px-1 flex items-center justify-between text-xs text-[#E5C67E]/85">
                <span className="font-serif italic">Ấn phẩm chuyên đề văn hóa</span>
                <span className="tabular-nums text-[#F6F1E7]/70">07 Chuyên mục</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Museum Operational Utility Ribbon (Full-width row below Hero split) */}
      <div className="relative border-t border-[#C49A45]/25 bg-[#160E09]/92">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 items-center text-xs sm:text-sm">
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-[#C49A45] shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-[#E5C67E]/75 text-xs">Thời gian tổ chức</p>
                <p className="text-[#FCFBF8] font-medium truncate">
                  {event.dateTime || 'Đang cập nhật từ Ban Tổ Chức'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#C49A45] shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-[#E5C67E]/75 text-xs">Địa điểm</p>
                <p className="text-[#FCFBF8] font-medium truncate">
                  {event.venue || 'Đang cập nhật địa điểm tổ chức'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building2 className="w-4 h-4 text-[#C49A45] shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-[#E5C67E]/75 text-xs">Đơn vị tổ chức</p>
                <p className="text-[#FCFBF8] font-medium truncate">
                  {event.organizer || 'Chờ cập nhật tên đơn vị'}
                </p>
              </div>
            </div>

            <div className="flex md:justify-end">
              <button
                type="button"
                onClick={onOpenOrganizerEditor}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#E5C67E] border border-[#C49A45]/40 hover:bg-[#C49A45]/15 rounded-sm transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A45]"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Cập nhật thông tin (BTC)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
