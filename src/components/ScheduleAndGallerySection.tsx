import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  Users,
  Mic,
  Award,
  Landmark,
  BookOpen,
  MessageCircle,
  Compass,
  Camera,
  Clock,
  Expand,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  PencilLine,
} from 'lucide-react';
import {
  EXHIBITION_ASSETS,
  GALLERY_GROUPS,
  extractYouTubeEmbedUrl,
} from '../config/eventConfig';
import {
  ContactAndMediaConfig,
  GalleryGroupId,
  GalleryItem,
  ScheduleIconKey,
  ScheduleItem,
} from '../types/event';
import { EditorialDivider, ResilientImage } from './CulturalMotifs';

const SCHEDULE_ICON_MAP: Record<ScheduleIconKey, React.ComponentType<{ className?: string }>> = {
  welcome: Users,
  'opening-intro': Mic,
  keynote: Award,
  'culture-day': Landmark,
  'book-showcase': BookOpen,
  exchange: MessageCircle,
  'exhibition-tour': Compass,
  closing: Camera,
};

interface ScheduleAndGallerySectionProps {
  schedule: ScheduleItem[];
  gallery: GalleryItem[];
  contact: ContactAndMediaConfig;
  onOpenScheduleEditor: () => void;
  onOpenMediaEditor: () => void;
  onOpenGalleryEditor: () => void;
}

export function ScheduleAndGallerySection({
  schedule,
  gallery,
  contact,
  onOpenScheduleEditor,
  onOpenMediaEditor,
  onOpenGalleryEditor,
}: ScheduleAndGallerySectionProps) {
  const [selectedGroup, setSelectedGroup] = useState<'all' | GalleryGroupId>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredGallery =
    selectedGroup === 'all'
      ? gallery
      : gallery.filter((item) => item.groupId === selectedGroup);

  const activeLightboxItem =
    lightboxIndex !== null ? filteredGallery[lightboxIndex] ?? null : null;

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredGallery.length
        );
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + filteredGallery.length) % filteredGallery.length
        );
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, filteredGallery.length]);

  const youtubeEmbedUrl = extractYouTubeEmbedUrl(contact.introVideoUrl);
  const isDirectVideo =
    !youtubeEmbedUrl &&
    Boolean(contact.introVideoUrl.trim()) &&
    /\.(mp4|webm|ogg)(\?.*)?$/i.test(contact.introVideoUrl.trim());

  return (
    <>
      {/* PHẦN 6: CHƯƠNG TRÌNH SỰ KIỆN */}
      <section id="chuong-trinh" className="py-20 sm:py-28 bg-[#FCFBF8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs tracking-[0.18em] uppercase text-[#9E2A2B] font-medium">
                Tiến trình tổ chức dự kiến
              </p>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-[#2B1D16] text-balance">
                Chương Trình Sự Kiện
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#5C463B] leading-relaxed">
                Khung chương trình được xây dựng theo trình tự trang trọng. Giờ diễn ra và thời lượng cụ thể để mở cho Ban Tổ Chức điền khi có lịch chính thức.
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenScheduleEditor}
              className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#2B1D16] bg-white border border-[#D8CBB8] hover:border-[#9E2A2B] hover:text-[#9E2A2B] rounded-sm transition-colors whitespace-nowrap"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Cập nhật khung giờ &amp; thời lượng</span>
            </button>
          </div>

          <div className="mt-14 relative">
            {/* Vertical Archival Timeline Spine */}
            <div
              className="hidden sm:block absolute left-6 top-2 bottom-2 w-px bg-[#DFD2BE]"
              aria-hidden="true"
            />

            <ol className="space-y-6">
              {schedule.map((item, idx) => {
                const Icon = SCHEDULE_ICON_MAP[item.icon] || BookOpen;
                return (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.45,
                      delay: idx * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="relative sm:pl-16"
                  >
                    {/* Timeline Node */}
                    <div className="hidden sm:flex absolute left-0 top-5 w-12 h-12 rounded-full bg-white border border-[#C49A45]/60 items-center justify-center text-[#9E2A2B]">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="bg-white border border-[#E6DCCD] p-5 sm:p-6 transition-colors hover:border-[#C49A45]">
                      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs text-[#7A6658]">
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-semibold text-[#9E2A2B] tabular-nums">
                            Phần {item.order}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>
                            {item.timeSlot.trim()
                              ? item.timeSlot
                              : 'Khung giờ chờ cập nhật'}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>
                            {item.duration.trim()
                              ? `Thời lượng: ${item.duration}`
                              : 'Thời lượng có thể chỉnh sửa'}
                          </span>
                        </div>
                        <Icon className="sm:hidden w-4 h-4 text-[#9E2A2B]" />
                      </div>

                      <h3 className="mt-2 font-serif text-lg sm:text-xl font-semibold text-[#2B1D16]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-[#5C463B] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* PHẦN 7: HÌNH ẢNH VÀ VIDEO */}
      <section
        id="hinh-anh"
        className="py-20 sm:py-28 bg-[#F6F1E7] border-t border-[#E6DCCD]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xs tracking-[0.18em] uppercase text-[#9E2A2B] font-medium">
              Thư viện hình ảnh &amp; Phim tư liệu
            </p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-[#2B1D16] text-balance">
              Hình Ảnh &amp; Video Chương Trình
            </h2>
            <EditorialDivider />
            <p className="text-sm sm:text-base text-[#5C463B] leading-relaxed">
              Không gian tư liệu trực quan về thư viện, tủ sách tiêu biểu và hoạt động văn hóa đọc. Nhấn vào từng hình ảnh để phóng to toàn màn hình.
            </p>
            <div className="mt-4">
              <button
                type="button"
                onClick={onOpenGalleryEditor}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#9E2A2B] hover:text-[#7B1E20] underline underline-offset-4"
              >
                <PencilLine className="w-3.5 h-3.5" />
                <span>Thay thế ảnh minh họa bằng ảnh thực tế (BTC)</span>
              </button>
            </div>
          </div>

          {/* Group Filter Bar */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {GALLERY_GROUPS.map((group) => {
              const isActive = selectedGroup === group.id;
              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => {
                    setSelectedGroup(group.id);
                    setLightboxIndex(null);
                  }}
                  className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-sm transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A45] ${
                    isActive
                      ? 'bg-[#2B1D16] text-[#FCFBF8]'
                      : 'bg-white border border-[#DFD2BE] text-[#4A372D] hover:border-[#9E2A2B] hover:text-[#9E2A2B]'
                  }`}
                >
                  {group.label}
                </button>
              );
            })}
          </div>

          {/* Photo Exhibition Grid */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item, idx) => (
              <figure
                key={item.id}
                className="group bg-white border border-[#E6DCCD] overflow-hidden flex flex-col"
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-[#2B1D16] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#C49A45]"
                  aria-label={`Phóng to hình ảnh: ${item.caption}`}
                >
                  <ResilientImage
                    src={item.imageUrl}
                    alt={item.caption}
                    fallbackTitle={item.caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1F140E]/85 text-[#FCFBF8] text-xs font-medium rounded-sm">
                      <Expand className="w-3.5 h-3.5" />
                      <span>Phóng to</span>
                    </span>
                  </div>
                </button>

                <figcaption className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#7A6658]">
                      <span>{item.groupLabel}</span>
                      {item.isIllustrative && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>Ảnh minh họa (có thể thay thế)</span>
                        </>
                      )}
                    </div>
                    <p className="mt-2 font-serif text-base font-semibold text-[#2B1D16] leading-snug">
                      {item.caption}
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Featured Video Area */}
          <div className="mt-14 bg-[#231711] text-[#FCFBF8] border border-[#C49A45]/30 p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <p className="text-xs tracking-[0.18em] uppercase text-[#E5C67E] font-medium">
                  Video giới thiệu chương trình
                </p>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold leading-snug">
                  {contact.introVideoTitle}
                </h3>
                <p className="text-sm text-[#E6DCCD]/80 leading-relaxed">
                  {contact.introVideoCaption}
                </p>
                <button
                  type="button"
                  onClick={onOpenMediaEditor}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-[#E5C67E] border border-[#C49A45]/45 hover:bg-[#C49A45]/15 rounded-sm transition-colors"
                >
                  <PencilLine className="w-3.5 h-3.5" />
                  <span>
                    {contact.introVideoUrl.trim()
                      ? 'Thay đường dẫn video (BTC)'
                      : 'Nhúng video YouTube / tệp video (BTC)'}
                  </span>
                </button>
              </div>

              <div className="lg:col-span-7">
                {youtubeEmbedUrl ? (
                  <div className="aspect-video w-full overflow-hidden border border-[#C49A45]/35 bg-black">
                    <iframe
                      src={youtubeEmbedUrl}
                      title={contact.introVideoTitle}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : isDirectVideo ? (
                  <div className="aspect-video w-full overflow-hidden border border-[#C49A45]/35 bg-black">
                    <video
                      src={contact.introVideoUrl.trim()}
                      controls
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="relative aspect-video w-full overflow-hidden border border-[#C49A45]/35 bg-[#19100B]">
                    <ResilientImage
                      src={EXHIBITION_ASSETS.librarySpace}
                      alt="Khung chờ video giới thiệu chương trình Ngày Văn hóa Việt Nam"
                      className="w-full h-full object-cover opacity-45"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#19100B]/90 via-[#19100B]/45 to-transparent flex flex-col items-center justify-center p-6 text-center">
                      <button
                        type="button"
                        onClick={onOpenMediaEditor}
                        className="w-14 h-14 rounded-full bg-[#9E2A2B] hover:bg-[#7B1E20] text-[#FCFBF8] flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A45]"
                        aria-label="Cấu hình video giới thiệu chương trình"
                      >
                        <Play className="w-6 h-6 ml-0.5" />
                      </button>
                      <p className="mt-4 font-serif text-lg text-[#FCFBF8]">
                        Chưa gắn đường dẫn video chính thức
                      </p>
                      <p className="mt-1 text-xs sm:text-sm text-[#E6DCCD]/80 max-w-md">
                        Ban Tổ Chức nhấn vào đây để dán liên kết YouTube hoặc đường dẫn video giới thiệu của Thư viện.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      {activeLightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Xem hình ảnh phóng to"
          className="fixed inset-0 z-50 bg-[#120B08]/92 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative w-full max-w-5xl bg-[#1F140E] border border-[#C49A45]/40 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#C49A45]/25 text-xs text-[#E5C67E]">
              <span>
                {activeLightboxItem.groupLabel} · Ảnh{' '}
                {(lightboxIndex ?? 0) + 1} / {filteredGallery.length}
              </span>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="w-9 h-9 inline-flex items-center justify-center text-[#E6DCCD] hover:text-white hover:bg-white/10 rounded-sm"
                aria-label="Đóng cửa sổ phóng to ảnh"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative bg-black flex items-center justify-center max-h-[68vh] overflow-hidden">
              <ResilientImage
                src={activeLightboxItem.imageUrl}
                alt={activeLightboxItem.caption}
                className="max-h-[68vh] w-auto object-contain"
              />

              {filteredGallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex((prev) =>
                        prev === null
                          ? 0
                          : (prev - 1 + filteredGallery.length) %
                            filteredGallery.length
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#1F140E]/80 hover:bg-[#9E2A2B] text-white flex items-center justify-center transition-colors"
                    aria-label="Ảnh trước"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex((prev) =>
                        prev === null ? 0 : (prev + 1) % filteredGallery.length
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#1F140E]/80 hover:bg-[#9E2A2B] text-white flex items-center justify-center transition-colors"
                    aria-label="Ảnh tiếp theo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            <div className="p-5 sm:p-6 text-[#FCFBF8]">
              <p className="font-serif text-lg font-medium">
                {activeLightboxItem.caption}
              </p>
              <p className="mt-1.5 text-sm text-[#E6DCCD]/80 leading-relaxed">
                {activeLightboxItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
