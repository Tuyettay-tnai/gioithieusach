import React, { useEffect, useState } from 'react';
import {
  X,
  Save,
  RotateCcw,
  Download,
  Check,
  Calendar,
  BookOpen,
  Clock,
  Link2,
  Image as ImageIcon,
  Upload,
} from 'lucide-react';
import {
  BOOK_CATEGORIES,
  isImgBBPageLink,
  normalizeImageUrl,
  readImageFileAsDataUrl,
} from '../config/eventConfig';
import { EventConfiguration } from '../types/event';

export type OrganizerEditorTab =
  | 'event'
  | 'contact'
  | 'schedule'
  | 'books'
  | 'gallery';

interface OrganizerEditorDrawerProps {
  isOpen: boolean;
  initialTab?: OrganizerEditorTab;
  config: EventConfiguration;
  onClose: () => void;
  onSaveConfig: (next: EventConfiguration) => void;
  onResetConfig: () => void;
}

export function OrganizerEditorDrawer({
  isOpen,
  initialTab = 'event',
  config,
  onClose,
  onSaveConfig,
  onResetConfig,
}: OrganizerEditorDrawerProps) {
  const [activeTab, setActiveTab] = useState<OrganizerEditorTab>(initialTab);
  const [draft, setDraft] = useState<EventConfiguration>(config);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    setDraft(config);
  }, [config, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveConfig(draft);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2200);
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cau-hinh-ngay-van-hoa-viet-nam.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const tabs: {
    id: OrganizerEditorTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: 'event', label: 'Thông tin', icon: Calendar },
    { id: 'contact', label: 'Liên hệ & Video', icon: Link2 },
    { id: 'schedule', label: 'Lịch trình', icon: Clock },
    { id: 'books', label: 'Tủ sách', icon: BookOpen },
    { id: 'gallery', label: 'Hình ảnh', icon: ImageIcon },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Bảng biên tập nội dung dành cho Ban Tổ Chức"
      className="fixed inset-0 z-50 flex justify-end bg-[#140D09]/70 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#FCFBF8] text-[#2B1D16] h-full flex flex-col shadow-2xl border-l border-[#DFD2BE]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#231711] text-[#FCFBF8] flex items-center justify-between gap-4 border-b border-[#C49A45]/30">
          <div>
            <p className="text-[11px] tracking-[0.16em] uppercase text-[#E5C67E]">
              Chế độ biên tập Ban Tổ Chức
            </p>
            <h2 className="font-serif text-lg sm:text-xl font-semibold">
              Cập Nhật Dữ Liệu Website
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 inline-flex items-center justify-center text-[#E6DCCD] hover:text-white hover:bg-white/10 rounded-sm"
            aria-label="Đóng bảng biên tập"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Bar */}
        <div className="px-6 pt-3 bg-[#F6F1E7] border-b border-[#E6DCCD] flex items-center gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-medium border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'border-[#9E2A2B] text-[#9E2A2B] bg-white/70'
                    : 'border-transparent text-[#5C463B] hover:text-[#2B1D16]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'event' && (
            <div className="space-y-4">
              <p className="text-xs text-[#5C463B] bg-[#F6F1E7] p-3.5 border border-[#E6DCCD]">
                Thay đổi tại đây cập nhật ngay lập tức toàn bộ trang mà không cần chỉnh sửa mã nguồn. Dữ liệu được lưu trên trình duyệt hiện tại và có thể xuất ra tệp JSON.
              </p>

              <div>
                <label className="block text-xs font-semibold text-[#4A372D] mb-1.5">
                  Tên chương trình
                </label>
                <input
                  type="text"
                  value={draft.event.programName}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      event: { ...draft.event, programName: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DFD2BE] text-sm rounded-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A372D] mb-1.5">
                  Chủ đề sự kiện
                </label>
                <input
                  type="text"
                  value={draft.event.theme}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      event: { ...draft.event, theme: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DFD2BE] text-sm rounded-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A372D] mb-1.5">
                  Thời gian tổ chức (để trống nếu chưa ấn định)
                </label>
                <input
                  type="text"
                  value={draft.event.dateTime}
                  placeholder="Ví dụ: 08:00 – 11:30, Thứ Bảy ngày ..."
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      event: { ...draft.event, dateTime: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DFD2BE] text-sm rounded-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A372D] mb-1.5">
                  Địa điểm tổ chức
                </label>
                <input
                  type="text"
                  value={draft.event.venue}
                  placeholder="Nhập hội trường / địa chỉ thư viện"
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      event: { ...draft.event, venue: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DFD2BE] text-sm rounded-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A372D] mb-1.5">
                  Đơn vị tổ chức
                </label>
                <input
                  type="text"
                  value={draft.event.organizer}
                  placeholder="Nhập tên Thư viện / Cơ quan / Nhà trường"
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      event: { ...draft.event, organizer: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DFD2BE] text-sm rounded-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A372D] mb-1.5">
                  Người đại diện ký thư mời (tùy chọn)
                </label>
                <input
                  type="text"
                  value={draft.event.representativeName}
                  placeholder="Ví dụ: Giám đốc Thư viện / Trưởng Ban Tổ Chức"
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      event: { ...draft.event, representativeName: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DFD2BE] text-sm rounded-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A372D] mb-1.5">
                  Thành phần khách mời
                </label>
                <textarea
                  rows={2}
                  value={draft.event.guests}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      event: { ...draft.event, guests: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DFD2BE] text-sm rounded-sm"
                />
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A372D] mb-1.5">
                  Hotline Ban Tổ Chức
                </label>
                <input
                  type="text"
                  value={draft.contact.hotline}
                  placeholder="Nhập số điện thoại liên hệ chính thức"
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      contact: { ...draft.contact, hotline: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DFD2BE] text-sm rounded-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A372D] mb-1.5">
                  Email Ban Tổ Chức
                </label>
                <input
                  type="email"
                  value={draft.contact.email}
                  placeholder="Nhập địa chỉ email liên hệ"
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      contact: { ...draft.contact, email: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DFD2BE] text-sm rounded-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A372D] mb-1.5">
                  Liên kết nhúng Google Maps (URL trong thuộc tính src của iframe)
                </label>
                <input
                  type="url"
                  value={draft.contact.googleMapsEmbedUrl}
                  placeholder="https://www.google.com/maps/embed?pb=..."
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      contact: {
                        ...draft.contact,
                        googleMapsEmbedUrl: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DFD2BE] text-sm rounded-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A372D] mb-1.5">
                  Đường dẫn Video giới thiệu (YouTube hoặc tệp .mp4)
                </label>
                <input
                  type="url"
                  value={draft.contact.introVideoUrl}
                  placeholder="https://www.youtube.com/watch?v=... hoặc https://.../video.mp4"
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      contact: {
                        ...draft.contact,
                        introVideoUrl: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DFD2BE] text-sm rounded-sm"
                />
              </div>

              <div className="pt-4 border-t border-[#E6DCCD] space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#9E2A2B]">
                  Cấu hình lưu dữ liệu đăng ký (Google Sheets / Firebase)
                </p>

                <div>
                  <label className="block text-xs font-semibold text-[#4A372D] mb-1.5">
                    Loại cổng kết nối
                  </label>
                  <select
                    value={draft.contact.registrationBackendType}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        contact: {
                          ...draft.contact,
                          registrationBackendType: e.target.value as
                            | 'unconfigured'
                            | 'google-sheets'
                            | 'firebase',
                        },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-white border border-[#DFD2BE] text-sm rounded-sm"
                  >
                    <option value="unconfigured">Chưa kết nối (Hiển thị sao chép phiếu)</option>
                    <option value="google-sheets">Google Sheets (Apps Script Web App)</option>
                    <option value="firebase">Firebase (Cloud Function / REST API)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A372D] mb-1.5">
                    URL tiếp nhận POST JSON
                  </label>
                  <input
                    type="url"
                    value={draft.contact.registrationEndpointUrl}
                    placeholder="https://script.google.com/macros/s/.../exec"
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        contact: {
                          ...draft.contact,
                          registrationEndpointUrl: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-white border border-[#DFD2BE] text-sm rounded-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="space-y-4">
              <p className="text-xs text-[#5C463B] bg-[#F6F1E7] p-3.5 border border-[#E6DCCD]">
                Nhập khung giờ và thời lượng cho từng phần chương trình. Các mục để trống sẽ hiển thị trung thực là “Khung giờ chờ cập nhật”.
              </p>

              {draft.schedule.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-4 bg-white border border-[#E6DCCD] space-y-3"
                >
                  <p className="text-xs font-semibold text-[#9E2A2B]">
                    Phần {item.order}
                  </p>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const next = [...draft.schedule];
                      next[idx] = { ...item, title: e.target.value };
                      setDraft({ ...draft, schedule: next });
                    }}
                    className="w-full px-3 py-2 bg-[#FCFBF8] border border-[#DFD2BE] text-sm font-medium rounded-sm"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={item.timeSlot}
                      placeholder="Khung giờ (VD: 08:00 – 08:30)"
                      onChange={(e) => {
                        const next = [...draft.schedule];
                        next[idx] = { ...item, timeSlot: e.target.value };
                        setDraft({ ...draft, schedule: next });
                      }}
                      className="w-full px-3 py-2 bg-[#FCFBF8] border border-[#DFD2BE] text-xs rounded-sm"
                    />
                    <input
                      type="text"
                      value={item.duration}
                      placeholder="Thời lượng (VD: 30 phút)"
                      onChange={(e) => {
                        const next = [...draft.schedule];
                        next[idx] = { ...item, duration: e.target.value };
                        setDraft({ ...draft, schedule: next });
                      }}
                      className="w-full px-3 py-2 bg-[#FCFBF8] border border-[#DFD2BE] text-xs rounded-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'books' && (
            <div className="space-y-4">
              <p className="text-xs text-[#5C463B] bg-[#F6F1E7] p-3.5 border border-[#E6DCCD]">
                Thay thế các vị trí mẫu bằng đầu sách thực tế của Thư viện. Khi chỉnh sửa tên sách và tắt tùy chọn “Đánh dấu là vị trí mẫu”, cuốn sách sẽ hiển thị như ấn phẩm trưng bày chính thức.
              </p>

              {draft.books.map((book, idx) => {
                const catName =
                  BOOK_CATEGORIES.find((c) => c.id === book.categoryId)?.shortName ||
                  '';
                return (
                  <div
                    key={book.id}
                    className="p-4 bg-white border border-[#E6DCCD] space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-semibold text-[#9E2A2B]">
                        {book.accessionCode} · {catName}
                      </span>
                      <label className="inline-flex items-center gap-1.5 text-[#5C463B] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={book.isSampleSlot}
                          onChange={(e) => {
                            const next = [...draft.books];
                            next[idx] = {
                              ...book,
                              isSampleSlot: e.target.checked,
                            };
                            setDraft({ ...draft, books: next });
                          }}
                        />
                        <span>Vị trí mẫu</span>
                      </label>
                    </div>

                    <input
                      type="text"
                      value={book.title}
                      onChange={(e) => {
                        const next = [...draft.books];
                        next[idx] = { ...book, title: e.target.value };
                        setDraft({ ...draft, books: next });
                      }}
                      placeholder="Tên cuốn sách thực tế"
                      className="w-full px-3 py-2 bg-[#FCFBF8] border border-[#DFD2BE] text-sm font-medium rounded-sm"
                    />

                    <input
                      type="text"
                      value={book.author}
                      onChange={(e) => {
                        const next = [...draft.books];
                        next[idx] = { ...book, author: e.target.value };
                        setDraft({ ...draft, books: next });
                      }}
                      placeholder="Tên tác giả / Đơn vị biên soạn"
                      className="w-full px-3 py-2 bg-[#FCFBF8] border border-[#DFD2BE] text-xs rounded-sm"
                    />

                    <div className="flex items-start gap-3">
                      <img
                        src={normalizeImageUrl(book.coverImage)}
                        alt={book.title}
                        referrerPolicy="no-referrer"
                        className="w-12 h-16 object-cover border border-[#DFD2BE] bg-[#2B1D16] shrink-0"
                      />
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="url"
                            value={book.coverImage.startsWith('data:') ? '' : book.coverImage}
                            onChange={(e) => {
                              const next = [...draft.books];
                              next[idx] = {
                                ...book,
                                coverImage: normalizeImageUrl(e.target.value),
                              };
                              setDraft({ ...draft, books: next });
                            }}
                            placeholder={
                              book.coverImage.startsWith('data:')
                                ? 'Đang dùng ảnh tải từ máy (dán link mới để thay)'
                                : 'Đường dẫn ảnh trực tiếp (https://i.ibb.co/...)'
                            }
                            className="flex-1 min-w-0 px-3 py-2 bg-[#FCFBF8] border border-[#DFD2BE] text-xs rounded-sm"
                          />
                          <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-[#F6F1E7] hover:bg-[#EFE6D6] border border-[#DFD2BE] text-[#2B1D16] rounded-sm whitespace-nowrap shrink-0">
                            <Upload className="w-3.5 h-3.5 text-[#9E2A2B]" />
                            <span>Tải ảnh</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                e.target.value = '';
                                if (!file) return;
                                try {
                                  const dataUrl = await readImageFileAsDataUrl(file);
                                  const next = [...draft.books];
                                  next[idx] = { ...book, coverImage: dataUrl };
                                  setDraft({ ...draft, books: next });
                                } catch {
                                  // Ignore unreadable image
                                }
                              }}
                            />
                          </label>
                        </div>
                        {isImgBBPageLink(book.coverImage) &&
                          normalizeImageUrl(book.coverImage) ===
                            book.coverImage.trim() && (
                            <p className="text-[11px] text-[#9C7528]">
                              Lưu ý: Với ImgBB, hãy dùng <strong>Liên kết trực tiếp (i.ibb.co/...)</strong> thay vì link trang ibb.co/...
                            </p>
                          )}
                      </div>
                    </div>

                    <textarea
                      rows={2}
                      value={book.shortIntro}
                      onChange={(e) => {
                        const next = [...draft.books];
                        next[idx] = { ...book, shortIntro: e.target.value };
                        setDraft({ ...draft, books: next });
                      }}
                      placeholder="Nội dung giới thiệu ngắn"
                      className="w-full px-3 py-2 bg-[#FCFBF8] border border-[#DFD2BE] text-xs rounded-sm"
                    />

                    <textarea
                      rows={2}
                      value={book.significance}
                      onChange={(e) => {
                        const next = [...draft.books];
                        next[idx] = { ...book, significance: e.target.value };
                        setDraft({ ...draft, books: next });
                      }}
                      placeholder="Ý nghĩa và giá trị của cuốn sách"
                      className="w-full px-3 py-2 bg-[#FCFBF8] border border-[#DFD2BE] text-xs rounded-sm"
                    />
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="space-y-4">
              <p className="text-xs text-[#5C463B] bg-[#F6F1E7] p-3.5 border border-[#E6DCCD]">
                Thay thế đường dẫn hình ảnh minh họa và chú thích bằng hình ảnh thực tế của Thư viện và sự kiện.
              </p>

              {draft.gallery.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-4 bg-white border border-[#E6DCCD] space-y-3"
                >
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-semibold text-[#9E2A2B]">
                      {item.groupLabel}
                    </span>
                    <label className="inline-flex items-center gap-1.5 text-[#5C463B] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.isIllustrative}
                        onChange={(e) => {
                          const next = [...draft.gallery];
                          next[idx] = {
                            ...item,
                            isIllustrative: e.target.checked,
                          };
                          setDraft({ ...draft, gallery: next });
                        }}
                      />
                      <span>Ảnh minh họa</span>
                    </label>
                  </div>

                  <input
                    type="text"
                    value={item.caption}
                    onChange={(e) => {
                      const next = [...draft.gallery];
                      next[idx] = { ...item, caption: e.target.value };
                      setDraft({ ...draft, gallery: next });
                    }}
                    placeholder="Chú thích hình ảnh"
                    className="w-full px-3 py-2 bg-[#FCFBF8] border border-[#DFD2BE] text-sm font-medium rounded-sm"
                  />

                  <input
                    type="url"
                    value={item.imageUrl}
                    onChange={(e) => {
                      const next = [...draft.gallery];
                      next[idx] = { ...item, imageUrl: e.target.value };
                      setDraft({ ...draft, gallery: next });
                    }}
                    placeholder="Đường dẫn ảnh thực tế (URL)"
                    className="w-full px-3 py-2 bg-[#FCFBF8] border border-[#DFD2BE] text-xs rounded-sm"
                  />

                  <textarea
                    rows={2}
                    value={item.description}
                    onChange={(e) => {
                      const next = [...draft.gallery];
                      next[idx] = { ...item, description: e.target.value };
                      setDraft({ ...draft, gallery: next });
                    }}
                    placeholder="Mô tả chi tiết hiển thị khi phóng to ảnh"
                    className="w-full px-3 py-2 bg-[#FCFBF8] border border-[#DFD2BE] text-xs rounded-sm"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#F6F1E7] border-t border-[#E6DCCD] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportJson}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-[#D8CBB8] bg-white text-[#2B1D16] hover:border-[#9E2A2B] rounded-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất JSON</span>
            </button>
            <button
              type="button"
              onClick={onResetConfig}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#7A6658] hover:text-[#9E2A2B]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Khôi phục mặc định</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold bg-[#9E2A2B] hover:bg-[#7B1E20] text-white rounded-sm transition-colors"
          >
            {savedNotice ? (
              <>
                <Check className="w-4 h-4" />
                <span>Đã lưu thay đổi</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Áp dụng thay đổi</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
