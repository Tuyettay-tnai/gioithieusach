import React, { useState } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  MapPin,
  Phone,
  Mail,
  Building2,
  SlidersHorizontal,
} from 'lucide-react';
import {
  ContactAndMediaConfig,
  EventDetails,
  RegistrationFormData,
} from '../types/event';
import { EditorialDivider } from './CulturalMotifs';

interface RegistrationAndContactSectionProps {
  event: EventDetails;
  contact: ContactAndMediaConfig;
  onOpenOrganizerEditor: () => void;
}

const INITIAL_FORM: RegistrationFormData = {
  fullName: '',
  roleOrOrganization: '',
  phone: '',
  email: '',
  attendeeCount: 1,
  message: '',
};

type SubmitStatus =
  | { state: 'idle' }
  | { state: 'submitting' }
  | { state: 'success'; submittedData: RegistrationFormData; backendLabel: string }
  | { state: 'unconfigured'; validatedData: RegistrationFormData }
  | { state: 'error'; message: string };

export function RegistrationAndContactSection({
  event,
  contact,
  onOpenOrganizerEditor,
}: RegistrationAndContactSectionProps) {
  const [formData, setFormData] = useState<RegistrationFormData>(INITIAL_FORM);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({ state: 'idle' });
  const [copiedSummary, setCopiedSummary] = useState(false);

  const handleFieldChange = <K extends keyof RegistrationFormData>(
    key: K,
    value: RegistrationFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (validationError) setValidationError(null);
  };

  const buildSummaryText = (data: RegistrationFormData) =>
    [
      `ĐĂNG KÝ THAM DỰ: ${event.programName}`,
      `- Họ và tên: ${data.fullName}`,
      `- Chức vụ / Đơn vị: ${data.roleOrOrganization}`,
      `- Số điện thoại: ${data.phone}`,
      `- Email: ${data.email || '(Không cung cấp)'}`,
      `- Số lượng người tham dự: ${data.attendeeCount}`,
      `- Lời nhắn: ${data.message || '(Không có)'}`,
    ].join('\n');

  const handleCopySummary = async (data: RegistrationFormData) => {
    try {
      await navigator.clipboard.writeText(buildSummaryText(data));
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2500);
    } catch {
      // Fallback ignored gracefully
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      setValidationError('Vui lòng nhập Họ và tên đại biểu / khách mời.');
      return;
    }
    if (!formData.roleOrOrganization.trim()) {
      setValidationError('Vui lòng nhập Chức vụ hoặc Đơn vị công tác / học tập.');
      return;
    }
    if (!formData.phone.trim()) {
      setValidationError('Vui lòng nhập Số điện thoại liên hệ.');
      return;
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setValidationError('Địa chỉ Email chưa đúng định dạng.');
      return;
    }

    const endpoint = contact.registrationEndpointUrl.trim();

    // Strictly honor: Do NOT fake saving or fake success when no backend is configured!
    if (!endpoint) {
      setSubmitStatus({
        state: 'unconfigured',
        validatedData: { ...formData },
      });
      return;
    }

    setSubmitStatus({ state: 'submitting' });

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          eventName: event.programName,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Máy chủ phản hồi mã lỗi ${response.status}.`);
      }

      const backendLabel =
        contact.registrationBackendType === 'google-sheets'
          ? 'Google Sheets'
          : contact.registrationBackendType === 'firebase'
            ? 'Firebase'
            : 'hệ thống tiếp nhận trực tuyến';

      setSubmitStatus({
        state: 'success',
        submittedData: { ...formData },
        backendLabel,
      });
      setFormData(INITIAL_FORM);
    } catch (err) {
      setSubmitStatus({
        state: 'error',
        message:
          err instanceof Error
            ? `Không thể gửi thông tin tới địa chỉ kết nối đã cấu hình (${err.message}). Vui lòng kiểm tra cấu hình CORS/URL hoặc sao chép phiếu đăng ký gửi trực tiếp cho Ban Tổ Chức.`
            : 'Đã xảy ra lỗi kết nối khi gửi biểu mẫu. Vui lòng thử lại sau.',
      });
    }
  };

  const hasValidMapEmbed =
    contact.googleMapsEmbedUrl.trim().startsWith('https://www.google.com/maps/embed') ||
    contact.googleMapsEmbedUrl.trim().startsWith('https://maps.google.com/');

  return (
    <>
      {/* PHẦN 9: ĐĂNG KÝ THAM DỰ */}
      <section
        id="dang-ky"
        className="py-20 sm:py-28 bg-[#F6F1E7] border-t border-[#E6DCCD]"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs tracking-[0.18em] uppercase text-[#9E2A2B] font-medium">
              Phiếu xác nhận tham dự
            </p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-[#2B1D16] text-balance">
              Đăng Ký Tham Dự Sự Kiện
            </h2>
            <EditorialDivider />
            <p className="text-sm sm:text-base text-[#5C463B] leading-relaxed">
              Kính mời quý đại biểu, quý thầy cô giáo, các em học sinh và bạn đọc điền thông tin để Ban Tổ Chức thuận tiện chuẩn bị đón tiếp chu đáo.
            </p>
          </div>

          <div className="mt-10 bg-white border border-[#E6DCCD] p-6 sm:p-10">
            {/* Real Backend Success Notice (Only shown after genuine HTTP 2xx) */}
            {submitStatus.state === 'success' ? (
              <div className="py-6 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#2F6B48] mx-auto" />
                <h3 className="font-serif text-2xl font-semibold text-[#2B1D16]">
                  Đã ghi nhận thông tin đăng ký tham dự
                </h3>
                <p className="text-sm sm:text-base text-[#5C463B] max-w-xl mx-auto leading-relaxed">
                  Cảm ơn <strong>{submitStatus.submittedData.fullName}</strong>. Thông tin đăng ký của quý vị ({submitStatus.submittedData.attendeeCount} người) đã được chuyển thành công tới {submitStatus.backendLabel} của Ban Tổ Chức.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setSubmitStatus({ state: 'idle' })}
                    className="px-6 py-2.5 text-sm font-medium bg-[#2B1D16] text-white hover:bg-[#3F2B21] rounded-sm transition-colors"
                  >
                    Đăng ký thêm khách mời khác
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="reg-fullname"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#4A372D] mb-2"
                    >
                      Họ và tên <span className="text-[#9E2A2B]">*</span>
                    </label>
                    <input
                      id="reg-fullname"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => handleFieldChange('fullName', e.target.value)}
                      placeholder="Nhập họ và tên đầy đủ"
                      className="w-full px-4 py-3 bg-[#FCFBF8] border border-[#DFD2BE] text-sm text-[#2B1D16] placeholder:text-[#9C8B7E] rounded-sm focus:outline-none focus:border-[#9E2A2B]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="reg-org"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#4A372D] mb-2"
                    >
                      Chức vụ / Đơn vị công tác <span className="text-[#9E2A2B]">*</span>
                    </label>
                    <input
                      id="reg-org"
                      type="text"
                      required
                      value={formData.roleOrOrganization}
                      onChange={(e) =>
                        handleFieldChange('roleOrOrganization', e.target.value)
                      }
                      placeholder="Cơ quan, trường học, lớp hoặc nghề nghiệp"
                      className="w-full px-4 py-3 bg-[#FCFBF8] border border-[#DFD2BE] text-sm text-[#2B1D16] placeholder:text-[#9C8B7E] rounded-sm focus:outline-none focus:border-[#9E2A2B]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="reg-phone"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#4A372D] mb-2"
                    >
                      Số điện thoại <span className="text-[#9E2A2B]">*</span>
                    </label>
                    <input
                      id="reg-phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleFieldChange('phone', e.target.value)}
                      placeholder="Nhập số điện thoại liên hệ"
                      className="w-full px-4 py-3 bg-[#FCFBF8] border border-[#DFD2BE] text-sm text-[#2B1D16] placeholder:text-[#9C8B7E] rounded-sm focus:outline-none focus:border-[#9E2A2B]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="reg-email"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#4A372D] mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="reg-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                      placeholder="Địa chỉ email (nếu có)"
                      className="w-full px-4 py-3 bg-[#FCFBF8] border border-[#DFD2BE] text-sm text-[#2B1D16] placeholder:text-[#9C8B7E] rounded-sm focus:outline-none focus:border-[#9E2A2B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="reg-count"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#4A372D] mb-2"
                    >
                      Số lượng người tham dự
                    </label>
                    <input
                      id="reg-count"
                      type="number"
                      min={1}
                      max={100}
                      value={formData.attendeeCount}
                      onChange={(e) =>
                        handleFieldChange(
                          'attendeeCount',
                          Math.max(1, Number(e.target.value) || 1)
                        )
                      }
                      className="w-full px-4 py-3 bg-[#FCFBF8] border border-[#DFD2BE] text-sm text-[#2B1D16] tabular-nums rounded-sm focus:outline-none focus:border-[#9E2A2B]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="reg-message"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#4A372D] mb-2"
                    >
                      Lời nhắn gửi Ban Tổ Chức
                    </label>
                    <textarea
                      id="reg-message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => handleFieldChange('message', e.target.value)}
                      placeholder="Ghi chú về chuyên đề sách quan tâm hoặc đề xuất hỗ trợ đón tiếp..."
                      className="w-full px-4 py-3 bg-[#FCFBF8] border border-[#DFD2BE] text-sm text-[#2B1D16] placeholder:text-[#9C8B7E] rounded-sm focus:outline-none focus:border-[#9E2A2B]"
                    />
                  </div>
                </div>

                {validationError && (
                  <div
                    role="alert"
                    className="flex items-start gap-2.5 p-4 bg-[#FDF2F2] border border-[#EBC4C4] text-sm text-[#8F1D1F]"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{validationError}</span>
                  </div>
                )}

                {submitStatus.state === 'error' && (
                  <div
                    role="alert"
                    className="flex items-start gap-2.5 p-4 bg-[#FDF2F2] border border-[#EBC4C4] text-sm text-[#8F1D1F]"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{submitStatus.message}</span>
                  </div>
                )}

                {/* Honest Unconfigured Backend Handling — Zero Fake Confirmation */}
                {submitStatus.state === 'unconfigured' && (
                  <div
                    role="status"
                    className="p-5 bg-[#FBF7EE] border border-[#DEC99D] space-y-3 text-sm text-[#3A2B23]"
                  >
                    <div className="flex items-start gap-2.5">
                      <AlertCircle className="w-5 h-5 text-[#9C7528] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-[#2B1D16]">
                          Cổng lưu đăng ký trực tuyến chưa được kết nối máy chủ
                        </p>
                        <p className="mt-1 text-xs sm:text-sm text-[#5C463B] leading-relaxed">
                          Hệ thống không giả lập xác nhận khi chưa có kết nối Google Sheets hoặc Firebase. Dữ liệu phiếu đăng ký của quý vị đã hợp lệ — quý vị có thể sao chép nội dung bên dưới gửi trực tiếp tới Ban Tổ Chức, hoặc Ban Tổ Chức cấu hình đường dẫn tiếp nhận ngay.
                        </p>
                      </div>
                    </div>

                    <pre className="p-3.5 bg-white border border-[#E6DCCD] text-xs text-[#2B1D16] whitespace-pre-wrap font-sans leading-relaxed">
                      {buildSummaryText(submitStatus.validatedData)}
                    </pre>

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => handleCopySummary(submitStatus.validatedData)}
                        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-[#2B1D16] text-white hover:bg-[#3F2B21] rounded-sm transition-colors"
                      >
                        {copiedSummary ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Đã sao chép phiếu đăng ký</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Sao chép phiếu đăng ký</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={onOpenOrganizerEditor}
                        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium border border-[#C49A45] text-[#7B1E20] hover:bg-white rounded-sm transition-colors"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                        <span>Cấu hình kết nối Google Sheets / Firebase (BTC)</span>
                      </button>
                    </div>
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-xs text-[#7A6658]">
                    {contact.registrationEndpointUrl.trim()
                      ? `Đang kết nối cổng tiếp nhận trực tuyến (${
                          contact.registrationBackendType === 'google-sheets'
                            ? 'Google Sheets'
                            : contact.registrationBackendType === 'firebase'
                              ? 'Firebase'
                              : 'Webhook'
                        }).`
                      : 'Sẵn sàng kết nối Google Sheets hoặc Firebase khi Ban Tổ Chức cấu hình.'}
                  </p>

                  <button
                    type="submit"
                    disabled={submitStatus.state === 'submitting'}
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-semibold tracking-wide bg-[#9E2A2B] text-[#FCFBF8] hover:bg-[#7B1E20] disabled:opacity-60 rounded-sm transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C49A45]"
                  >
                    <Send className="w-4 h-4" />
                    <span>
                      {submitStatus.state === 'submitting'
                        ? 'ĐANG GỬI ĐĂNG KÝ...'
                        : 'XÁC NHẬN THAM DỰ'}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* PHẦN 10: BẢN ĐỒ VÀ THÔNG TIN LIÊN HỆ */}
      <section id="lien-he" className="py-20 sm:py-28 bg-[#FCFBF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs tracking-[0.18em] uppercase text-[#9E2A2B] font-medium">
                Chỉ dẫn địa điểm &amp; Ban Tổ Chức
              </p>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-[#2B1D16] text-balance">
                Bản Đồ &amp; Thông Tin Liên Hệ
              </h2>
            </div>

            <button
              type="button"
              onClick={onOpenOrganizerEditor}
              className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#2B1D16] bg-white border border-[#D8CBB8] hover:border-[#9E2A2B] hover:text-[#9E2A2B] rounded-sm transition-colors whitespace-nowrap"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Cập nhật liên hệ &amp; bản đồ</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Contact Specifications */}
            <div className="lg:col-span-5 bg-white border border-[#E6DCCD] p-7 sm:p-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="pb-5 border-b border-[#EFE8DC] flex items-start gap-4">
                  <Building2 className="w-5 h-5 text-[#9E2A2B] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#7A6658]">
                      Đơn vị tổ chức
                    </p>
                    <p className="mt-1 font-serif text-lg text-[#2B1D16]">
                      {event.organizer.trim() || (
                        <span className="italic text-[#7A6658] text-base">
                          Chờ Ban Tổ Chức cập nhật tên đơn vị
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="pb-5 border-b border-[#EFE8DC] flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#9E2A2B] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#7A6658]">
                      Địa điểm tổ chức
                    </p>
                    <p className="mt-1 text-sm sm:text-base text-[#2B1D16] leading-relaxed">
                      {event.venue.trim() || (
                        <span className="italic text-[#7A6658]">
                          Địa chỉ chi tiết đang chờ Ban Tổ Chức cập nhật
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="pb-5 border-b border-[#EFE8DC] flex items-start gap-4">
                  <Phone className="w-5 h-5 text-[#9E2A2B] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#7A6658]">
                      Hotline Ban Tổ Chức
                    </p>
                    {contact.hotline.trim() ? (
                      <a
                        href={`tel:${contact.hotline.replace(/\s+/g, '')}`}
                        className="mt-1 inline-block text-base font-medium text-[#2B1D16] hover:text-[#9E2A2B] tabular-nums"
                      >
                        {contact.hotline}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm italic text-[#7A6658]">
                        Chưa cấu hình số điện thoại liên hệ
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-[#9E2A2B] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#7A6658]">
                      Email tiếp nhận thông tin
                    </p>
                    {contact.email.trim() ? (
                      <a
                        href={`mailto:${contact.email.trim()}`}
                        className="mt-1 inline-block text-base font-medium text-[#2B1D16] hover:text-[#9E2A2B] break-all"
                      >
                        {contact.email}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm italic text-[#7A6658]">
                        Chưa cấu hình địa chỉ email chính thức
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Embeddable Google Maps Area */}
            <div className="lg:col-span-7 bg-[#F6F1E7] border border-[#E6DCCD] min-h-[340px] flex flex-col">
              {hasValidMapEmbed ? (
                <iframe
                  src={contact.googleMapsEmbedUrl.trim()}
                  title="Bản đồ địa điểm tổ chức sự kiện"
                  className="w-full h-full min-h-[360px] border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <MapPin className="w-9 h-9 text-[#C49A45] mb-3" />
                  <h3 className="font-serif text-xl font-medium text-[#2B1D16]">
                    Khung nhúng bản đồ Google Maps
                  </h3>
                  <p className="mt-2 text-sm text-[#5C463B] max-w-md leading-relaxed">
                    Chưa có tọa độ hoặc liên kết bản đồ chính thức. Ban Tổ Chức có thể dán đường dẫn <span className="font-medium">Embed a map</span> của Google Maps trong phần cấu hình để hiển thị chỉ đường trực tiếp tại đây.
                  </p>
                  <button
                    type="button"
                    onClick={onOpenOrganizerEditor}
                    className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold bg-[#2B1D16] text-white hover:bg-[#3F2B21] rounded-sm transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Gắn liên kết bản đồ Google Maps</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
