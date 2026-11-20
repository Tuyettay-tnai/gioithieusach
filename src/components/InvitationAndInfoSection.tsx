import React from 'react';
import { motion } from 'motion/react';
import {
  BookMarked,
  CalendarClock,
  MapPin,
  Building2,
  Users,
  Sparkles,
  PencilLine,
} from 'lucide-react';
import { EventDetails } from '../types/event';
import { EditorialDivider, LotusEmblem } from './CulturalMotifs';

interface InvitationAndInfoSectionProps {
  event: EventDetails;
  onOpenOrganizerEditor: () => void;
}

const MISSION_PILLARS = [
  {
    number: '01',
    title: 'Tôn vinh giá trị sách',
    description:
      'Khẳng định vai trò bền vững của sách trong việc lưu giữ tri thức nhân loại, ghi chép dòng chảy lịch sử và kết tinh văn hóa dân tộc qua nhiều thế hệ.',
  },
  {
    number: '02',
    title: 'Lan tỏa văn hóa đọc',
    description:
      'Khơi dậy niềm đam mê đọc sách sâu sắc trong cộng đồng, đặc biệt là thế hệ trẻ, hình thành thói quen tự học và suy ngẫm trước những trang sách hay.',
  },
  {
    number: '03',
    title: 'Gìn giữ bản sắc Việt',
    description:
      'Trân trọng giới thiệu những tác phẩm giá trị về lịch sử, di sản văn hóa, phong tục tập quán, con người và truyền thống tốt đẹp của dân tộc Việt Nam.',
  },
  {
    number: '04',
    title: 'Kết nối cộng đồng',
    description:
      'Kiến tạo không gian giao lưu trang trọng, gần gũi để các đại biểu, thầy cô giáo, học sinh và người yêu sách gặp gỡ, đối thoại và sẻ chia tri thức.',
  },
];

export function InvitationAndInfoSection({
  event,
  onOpenOrganizerEditor,
}: InvitationAndInfoSectionProps) {
  const infoCards = [
    {
      label: 'Tên chương trình',
      value: event.programName,
      icon: BookMarked,
      isPending: !event.programName.trim(),
    },
    {
      label: 'Thời gian tổ chức',
      value: event.dateTime,
      icon: CalendarClock,
      isPending: !event.dateTime.trim(),
    },
    {
      label: 'Địa điểm tổ chức',
      value: event.venue,
      icon: MapPin,
      isPending: !event.venue.trim(),
    },
    {
      label: 'Đơn vị tổ chức',
      value: event.organizer,
      icon: Building2,
      isPending: !event.organizer.trim(),
    },
    {
      label: 'Thành phần khách mời',
      value: event.guests,
      icon: Users,
      isPending: !event.guests.trim(),
    },
    {
      label: 'Chủ đề sự kiện',
      value: event.theme,
      icon: Sparkles,
      isPending: !event.theme.trim(),
    },
  ];

  return (
    <>
      {/* PHẦN 2: THƯ NGỎ – LỜI MỜI THAM DỰ */}
      <section
        id="thu-moi"
        className="relative py-20 sm:py-28 bg-[#FCFBF8] golden-ambient-glow"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-white border border-[#E6DCCD] p-7 sm:p-12 lg:p-16"
          >
            {/* Delicate Inner Archival Hairline Frame */}
            <div
              className="pointer-events-none absolute inset-2.5 sm:inset-3.5 border border-[#C49A45]/35"
              aria-hidden="true"
            />

            <div className="relative text-center">
              <div className="inline-flex items-center justify-center text-[#9E2A2B] mb-3">
                <LotusEmblem className="w-8 h-8" />
              </div>
              <p className="text-xs tracking-[0.2em] text-[#7A6658] uppercase">
                Thư ngỏ trân trọng kính mời
              </p>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-semibold text-[#2B1D16] text-balance">
                Thư Mời Tham Dự Sự Kiện
              </h2>
              <EditorialDivider />
            </div>

            <div className="relative mt-8 max-w-2xl mx-auto space-y-5 text-[#3A2B23] text-base sm:text-[17px] leading-[1.85]">
              <p className="font-serif italic text-lg text-[#7B1E20]">
                Kính gửi: Quý đại biểu, quý khách mời, quý thầy cô giáo, các em học sinh và những người yêu sách,
              </p>

              <p className="first-letter:font-serif first-letter:text-5xl first-letter:font-semibold first-letter:text-[#9E2A2B] first-letter:float-left first-letter:mr-3 first-letter:leading-[0.9] first-letter:pt-1">
                Trong dòng chảy nghìn năm văn hiến, sách luôn là người bạn đồng hành thủy chung, là nơi lưu giữ ký ức lịch sử, kết tinh trí tuệ và bồi đắp tâm hồn của biết bao thế hệ người Việt. Hòa chung không khí trang trọng hưởng ứng Ngày Văn hóa Việt Nam, Thư viện trân trọng tổ chức chương trình giới thiệu sách nhằm tôn vinh giá trị tri thức, khơi dậy tình yêu đọc sách, lan tỏa văn hóa đọc và góp phần gìn giữ, phát huy những giá trị văn hóa tốt đẹp của dân tộc.
              </p>

              <p>
                Đến với chương trình, quý vị sẽ cùng thưởng lãm không gian trưng bày những ấn phẩm tuyển chọn về lịch sử, di sản văn hóa, tư tưởng Hồ Chí Minh, văn học, giáo dục và quê hương đất nước; đồng thời cùng gặp gỡ, lắng nghe và chia sẻ những câu chuyện giàu cảm hứng từ trang sách.
              </p>

              <p>
                Trân trọng kính mời quý đại biểu, quý khách mời, quý thầy cô giáo, các em học sinh và những người yêu sách đến tham dự chương trình, cùng chung tay tạo nên một ngày hội tri thức ấm áp, trang trọng và giàu ý nghĩa.
              </p>

              <div className="pt-6 mt-8 border-t border-[#E6DCCD] flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <p className="font-serif italic text-xl text-[#9E2A2B] font-medium">
                  “Rất hân hạnh được đón tiếp quý vị!”
                </p>
                <div className="text-left sm:text-right">
                  <p className="text-xs tracking-[0.14em] uppercase text-[#7A6658]">
                    Trân trọng kính mời
                  </p>
                  <p className="mt-1 font-serif text-base font-semibold text-[#2B1D16]">
                    {event.organizer || 'Ban Tổ Chức Chương Trình'}
                  </p>
                  {event.representativeName ? (
                    <p className="text-sm text-[#5C463B]">
                      {event.representativeName}
                    </p>
                  ) : (
                    <p className="text-xs italic text-[#7A6658]">
                      (Chờ cập nhật tên đơn vị / đại diện ký mời)
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PHẦN 3: THÔNG TIN SỰ KIỆN */}
      <section
        id="thong-tin"
        className="py-20 sm:py-24 bg-[#F6F1E7] border-y border-[#E6DCCD]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs tracking-[0.18em] uppercase text-[#9E2A2B] font-medium">
                Hồ sơ sự kiện
              </p>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-[#2B1D16] text-balance">
                Thông Tin Chương Trình
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#5C463B] leading-relaxed">
                Các hạng mục chưa có thông tin chính thức được đánh dấu rõ để Ban Tổ Chức cập nhật trực tiếp mà không hiển thị dữ liệu giả định.
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenOrganizerEditor}
              className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#2B1D16] bg-white border border-[#D8CBB8] hover:border-[#9E2A2B] hover:text-[#9E2A2B] rounded-sm transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A45]"
            >
              <PencilLine className="w-3.5 h-3.5" />
              <span>Chỉnh sửa thông tin sự kiện</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {infoCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="bg-white border border-[#E6DCCD] p-6 sm:p-7 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="text-xs tracking-[0.12em] uppercase text-[#7A6658] font-medium">
                        {card.label}
                      </span>
                      <Icon className="w-4 h-4 text-[#C49A45] shrink-0" />
                    </div>

                    {card.isPending ? (
                      <div className="space-y-2">
                        <p className="font-serif italic text-base text-[#7A6658]">
                          Thông tin đang chờ Ban Tổ Chức cập nhật chính thức.
                        </p>
                        <button
                          type="button"
                          onClick={onOpenOrganizerEditor}
                          className="text-xs font-medium text-[#9E2A2B] underline underline-offset-4 hover:text-[#7B1E20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A45] rounded"
                        >
                          Nhập thông tin này
                        </button>
                      </div>
                    ) : (
                      <p className="font-serif text-lg sm:text-[19px] font-medium text-[#2B1D16] leading-snug">
                        {card.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PHẦN 4: Ý NGHĨA VÀ MỤC ĐÍCH SỰ KIỆN */}
      <section id="y-nghia" className="py-20 sm:py-28 bg-[#FCFBF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xs tracking-[0.18em] uppercase text-[#9E2A2B] font-medium">
              Ý nghĩa và mục đích sự kiện
            </p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-[#2B1D16] text-balance">
              Sứ Mệnh Lan Tỏa Tri Thức
            </h2>
            <EditorialDivider />
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {MISSION_PILLARS.map((pillar, index) => (
              <motion.article
                key={pillar.number}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="pt-6 border-t border-[#D9CCB8] flex gap-6"
              >
                <span className="font-serif text-3xl sm:text-4xl font-semibold text-[#C49A45] tabular-nums leading-none shrink-0">
                  {pillar.number}
                </span>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#2B1D16]">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-[#5C463B] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
