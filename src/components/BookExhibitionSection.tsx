import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Heart,
  X,
  ChevronLeft,
  ChevronRight,
  PencilLine,
  ArrowRight,
  Link2,
  Check,
  AlertCircle,
  Upload,
} from 'lucide-react';
import {
  BOOK_CATEGORIES,
  isImgBBPageLink,
  normalizeImageUrl,
  readImageFileAsDataUrl,
} from '../config/eventConfig';
import { BookCategoryId, ExhibitionBook } from '../types/event';
import { EditorialDivider, LotusEmblem, ResilientImage } from './CulturalMotifs';

interface BookExhibitionSectionProps {
  books: ExhibitionBook[];
  favoriteIds: string[];
  onToggleFavorite: (bookId: string) => void;
  onSelectBook: (book: ExhibitionBook) => void;
  onEditBooksInOrganizer: () => void;
}

export function BookExhibitionSection({
  books,
  favoriteIds,
  onToggleFavorite,
  onSelectBook,
  onEditBooksInOrganizer,
}: BookExhibitionSectionProps) {
  const [activeCategory, setActiveCategory] = useState<BookCategoryId>('lich-su');

  const currentCategory =
    BOOK_CATEGORIES.find((cat) => cat.id === activeCategory) || BOOK_CATEGORIES[0];

  const categoryBooks = books.filter((book) => book.categoryId === activeCategory);

  return (
    <section
      id="khong-gian-sach"
      className="py-20 sm:py-28 bg-[#231711] text-[#FCFBF8] relative overflow-hidden"
    >
      {/* Subtle top golden museum light wash */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-80 golden-ambient-glow"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <p className="text-xs tracking-[0.2em] uppercase text-[#E5C67E] font-medium">
              Triển lãm trực tuyến · 07 Chuyên đề trọng tâm
            </p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#FCFBF8] text-balance leading-tight">
              Khám Phá Không Gian Sách
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#E6DCCD]/85 leading-relaxed max-w-2xl">
              Mỗi chuyên đề trưng bày được thiết kế như một gian triển lãm riêng biệt. Nhấn vào từng ấn phẩm để mở trang giới thiệu chi tiết. Các vị trí có nhãn <span className="text-[#E5C67E] font-medium">MẪU</span> là dữ liệu minh họa cấu trúc để Ban Tổ Chức thay thế bằng sách thực tế của Thư viện.
            </p>
          </div>

          <button
            type="button"
            onClick={onEditBooksInOrganizer}
            className="self-start lg:self-auto inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-[#E5C67E] border border-[#C49A45]/45 hover:bg-[#C49A45]/15 rounded-sm transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A45]"
          >
            <PencilLine className="w-3.5 h-3.5" />
            <span>Cập nhật danh mục sách (BTC)</span>
          </button>
        </div>

        {/* Category Filter Tabs (Functional buttons) */}
        <div
          role="tablist"
          aria-label="Danh mục chuyên đề sách trưng bày"
          className="mt-10 flex flex-wrap items-center gap-2 pb-4 border-b border-[#C49A45]/25"
        >
          {BOOK_CATEGORIES.map((category) => {
            const isSelected = category.id === activeCategory;
            return (
              <button
                key={category.id}
                role="tab"
                type="button"
                aria-selected={isSelected}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2.5 text-xs sm:text-sm font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A45] ${
                  isSelected
                    ? 'bg-[#9E2A2B] text-[#FCFBF8]'
                    : 'bg-[#2E1F17] text-[#E6DCCD]/80 hover:bg-[#3A281E] hover:text-white'
                }`}
              >
                <span className="tabular-nums opacity-70 mr-1.5">
                  {category.orderLabel}.
                </span>
                <span>{category.shortName}</span>
              </button>
            );
          })}
        </div>

        {/* Current Exhibition Pavilion Header */}
        <div className="mt-8 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.16em] uppercase text-[#C49A45]">
              Gian trưng bày {currentCategory.orderLabel} · {categoryBooks.length} ấn phẩm
            </p>
            <h3 className="mt-1 font-serif text-2xl sm:text-3xl font-medium text-[#FCFBF8]">
              {currentCategory.name}
            </h3>
          </div>
          <p className="text-sm text-[#E6DCCD]/75 max-w-xl leading-relaxed">
            {currentCategory.curatorNote}
          </p>
        </div>

        {/* Book Exhibition Pedestal Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {categoryBooks.map((book) => {
              const isFavorite = favoriteIds.includes(book.id);
              return (
                <article
                  key={book.id}
                  className="group bg-[#2B1D16] border border-[#C49A45]/25 hover:border-[#C49A45]/60 transition-colors duration-200 p-6 sm:p-7 flex flex-col sm:flex-row gap-6"
                >
                  {/* Book Cover Pedestal */}
                  <button
                    type="button"
                    onClick={() => onSelectBook(book)}
                    className="relative w-44 sm:w-40 md:w-44 aspect-[3/4] shrink-0 mx-auto sm:mx-0 overflow-hidden bg-[#1A110C] border border-[#C49A45]/30 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A45]"
                    aria-label={`Mở xem chi tiết ${book.title}`}
                  >
                    <ResilientImage
                      src={book.coverImage}
                      alt={`Bìa trưng bày ${book.title}`}
                      fallbackTitle={book.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                    <div className="absolute inset-x-3 bottom-3">
                      <p className="text-[11px] tracking-[0.12em] uppercase text-[#E5C67E] font-medium">
                        {book.accessionCode}
                      </p>
                    </div>
                  </button>

                  {/* Book Curatorial Content */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 text-xs text-[#E5C67E]/85">
                        <span className="truncate">
                          {book.isSampleSlot
                            ? 'Dữ liệu mẫu · Chờ BTC thay sách thực tế'
                            : currentCategory.shortName}
                        </span>
                        <button
                          type="button"
                          onClick={() => onToggleFavorite(book.id)}
                          aria-label={
                            isFavorite
                              ? 'Bỏ đánh dấu sách yêu thích'
                              : 'Đánh dấu sách yêu thích'
                          }
                          aria-pressed={isFavorite}
                          className={`inline-flex items-center justify-center w-9 h-9 rounded-sm transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A45] ${
                            isFavorite
                              ? 'text-[#E5C67E] bg-[#9E2A2B]/35'
                              : 'text-[#E6DCCD]/65 hover:text-[#E5C67E] hover:bg-white/5'
                          }`}
                        >
                          <Heart
                            className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`}
                          />
                        </button>
                      </div>

                      <h4 className="mt-2 font-serif text-xl font-semibold text-[#FCFBF8] leading-snug">
                        <button
                          type="button"
                          onClick={() => onSelectBook(book)}
                          className="text-left hover:text-[#E5C67E] transition-colors focus-visible:outline-none focus-visible:underline"
                        >
                          {book.title}
                        </button>
                      </h4>

                      <p className="mt-1.5 text-xs sm:text-sm text-[#E5C67E]/80 italic">
                        {book.author}
                      </p>

                      <p className="mt-3 text-sm text-[#E6DCCD]/85 leading-relaxed line-clamp-3">
                        {book.shortIntro}
                      </p>

                      <p className="mt-3 pt-3 border-t border-[#C49A45]/20 text-xs sm:text-sm text-[#E6DCCD]/75 leading-relaxed">
                        <span className="text-[#E5C67E] font-medium">Giá trị: </span>
                        {book.significance}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 flex items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => onSelectBook(book)}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#E5C67E] hover:text-white transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A45] rounded"
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>Mở trang giới thiệu</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

interface BookDetailModalProps {
  book: ExhibitionBook | null;
  isFavorite: boolean;
  onClose: () => void;
  onToggleFavorite: (bookId: string) => void;
  onUpdateBookCover: (bookId: string, newCoverUrl: string) => void;
  onEditInOrganizer: () => void;
}

export function BookDetailModal({
  book,
  isFavorite,
  onClose,
  onToggleFavorite,
  onUpdateBookCover,
  onEditInOrganizer,
}: BookDetailModalProps) {
  const [pageSpread, setPageSpread] = useState<0 | 1>(0);
  const [editingImage, setEditingImage] = useState(false);
  const [coverInput, setCoverInput] = useState('');
  const [coverSaved, setCoverSaved] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    setPageSpread(0);
    setEditingImage(false);
    setCoverInput(book?.coverImage || '');
    setCoverSaved(false);
    setUploadError(null);
  }, [book?.id, book?.coverImage]);

  useEffect(() => {
    if (!book) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setPageSpread(1);
      if (e.key === 'ArrowLeft') setPageSpread(0);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [book, onClose]);

  if (!book) return null;

  const category = BOOK_CATEGORIES.find((c) => c.id === book.categoryId);

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#140D09]/82 backdrop-blur-sm overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl bg-[#FCFBF8] text-[#2B1D16] border border-[#C49A45]/50 shadow-2xl overflow-hidden my-auto"
        >
          {/* Top Bar inside Modal */}
          <div className="flex items-center justify-between gap-4 px-5 sm:px-7 py-4 bg-[#231711] text-[#FCFBF8] border-b border-[#C49A45]/30">
            <div className="flex items-center gap-2.5 text-xs text-[#E5C67E] min-w-0">
              <LotusEmblem className="w-4 h-4 shrink-0" />
              <span className="truncate">
                {category?.name} · {book.accessionCode}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center w-9 h-9 text-[#E6DCCD] hover:text-white hover:bg-white/10 rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A45]"
              aria-label="Đóng cửa sổ chi tiết sách"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Open-Book Two-Page Spread */}
          <div className="book-perspective grid grid-cols-1 md:grid-cols-12">
            {/* Left Page: Book Cover & Accession Metadata */}
            <div className="md:col-span-5 bg-[#F6F1E7] p-6 sm:p-8 border-b md:border-b-0 md:border-r border-[#DFD2BE] flex flex-col items-center justify-between">
              <div className="w-full flex flex-col items-center">
                <div className="w-48 sm:w-56 aspect-[3/4] shadow-lg border border-[#C49A45]/35 overflow-hidden bg-[#2B1D16]">
                  <ResilientImage
                    src={book.coverImage}
                    alt={`Bìa sách ${book.title}`}
                    fallbackTitle={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Inline Change Book Cover by Device Upload or Link */}
                <div className="w-full mt-4 space-y-2">
                  {!editingImage ? (
                    <div className="grid grid-cols-2 gap-2">
                      <label className="cursor-pointer inline-flex items-center justify-center gap-1.5 px-2.5 py-2 text-xs font-medium text-[#FCFBF8] bg-[#9E2A2B] hover:bg-[#7B1E20] rounded-sm transition-colors">
                        <Upload className="w-3.5 h-3.5 shrink-0" />
                        <span>Tải ảnh lên</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            e.target.value = '';
                            if (!file) return;
                            try {
                              setUploadError(null);
                              const dataUrl = await readImageFileAsDataUrl(file);
                              onUpdateBookCover(book.id, dataUrl);
                              setCoverSaved(true);
                            } catch (err) {
                              setUploadError(
                                err instanceof Error
                                  ? err.message
                                  : 'Không thể tải tệp ảnh.'
                              );
                            }
                          }}
                        />
                      </label>

                      <button
                        type="button"
                        onClick={() => {
                          setCoverInput(
                            book.coverImage.startsWith('data:')
                              ? ''
                              : book.coverImage
                          );
                          setEditingImage(true);
                          setCoverSaved(false);
                          setUploadError(null);
                        }}
                        className="inline-flex items-center justify-center gap-1.5 px-2.5 py-2 text-xs font-medium text-[#7B1E20] bg-white border border-[#DFD2BE] hover:border-[#9E2A2B] rounded-sm transition-colors"
                      >
                        <Link2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Dán link ảnh</span>
                      </button>
                    </div>
                  ) : (
                    <div className="p-3 bg-white border border-[#DFD2BE] space-y-2.5 text-left">
                      <label
                        htmlFor="modal-book-cover-url"
                        className="block text-[11px] font-semibold uppercase tracking-wider text-[#5C463B]"
                      >
                        Dán liên kết ảnh trực tiếp (URL)
                      </label>
                      <input
                        id="modal-book-cover-url"
                        type="url"
                        value={coverInput}
                        onChange={(e) => setCoverInput(e.target.value)}
                        placeholder="https://i.ibb.co/.../bia-sach.jpg"
                        className="w-full px-2.5 py-2 bg-[#FCFBF8] border border-[#DFD2BE] text-xs text-[#2B1D16] rounded-sm focus:outline-none focus:border-[#9E2A2B]"
                      />

                      {isImgBBPageLink(coverInput) &&
                        normalizeImageUrl(coverInput) === coverInput.trim() && (
                          <div className="flex items-start gap-1.5 text-[11px] text-[#9C7528] leading-snug">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                            <span>
                              Link <strong>ibb.co/...</strong> là trang web, không phải file ảnh. Trên ImgBB hãy chọn mục <strong>Liên kết trực tiếp (Direct link)</strong> bắt đầu bằng <strong>https://i.ibb.co/...</strong>
                            </span>
                          </div>
                        )}

                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingImage(false)}
                          className="px-2.5 py-1.5 text-xs text-[#7A6658] hover:text-[#2B1D16]"
                        >
                          Hủy
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const normalized = normalizeImageUrl(coverInput);
                            if (!normalized) return;
                            onUpdateBookCover(book.id, normalized);
                            setCoverSaved(true);
                            setEditingImage(false);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-[#9E2A2B] hover:bg-[#7B1E20] text-white rounded-sm transition-colors"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Áp dụng ảnh</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {uploadError && (
                    <p className="text-center text-[11px] font-medium text-[#9E2A2B]">
                      {uploadError}
                    </p>
                  )}

                  {coverSaved && !editingImage && (
                    <p className="text-center text-[11px] font-medium text-[#2F6B48]">
                      Đã cập nhật ảnh bìa sách thành công.
                    </p>
                  )}
                </div>
              </div>

              <dl className="w-full mt-6 pt-5 border-t border-[#DFD2BE] space-y-2.5 text-xs">
                <div className="flex justify-between gap-3">
                  <dt className="text-[#7A6658]">Mã vị trí</dt>
                  <dd className="font-medium text-[#2B1D16] tabular-nums">
                    {book.accessionCode}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-[#7A6658]">Chuyên mục</dt>
                  <dd className="font-medium text-[#2B1D16] text-right">
                    {category?.shortName}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-[#7A6658]">Trạng thái dữ liệu</dt>
                  <dd className="font-medium text-[#9E2A2B] text-right">
                    {book.isSampleSlot ? 'Vị trí mẫu (Chờ cập nhật)' : 'Sách trưng bày chính thức'}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Right Page: Interactive Flippable Content Page */}
            <div className="md:col-span-7 p-6 sm:p-9 flex flex-col justify-between bg-[#FCFBF8]">
              <div>
                <div className="flex items-center justify-between gap-3 text-xs text-[#7A6658]">
                  <span>Trang {pageSpread === 0 ? '01 / 02' : '02 / 02'}</span>
                  <span className="font-serif italic">
                    {pageSpread === 0
                      ? 'Giới thiệu tác phẩm'
                      : 'Ý nghĩa & Giá trị lưu giữ'}
                  </span>
                </div>

                <h3
                  id="book-modal-title"
                  className="mt-3 font-serif text-2xl sm:text-[26px] font-semibold text-[#2B1D16] leading-snug"
                >
                  {book.title}
                </h3>

                <p className="mt-2 text-sm text-[#7B1E20] font-medium">
                  {book.author}
                </p>

                <EditorialDivider />

                <AnimatePresence mode="wait">
                  {pageSpread === 0 ? (
                    <motion.div
                      key="page-1"
                      initial={{ opacity: 0, rotateY: -12 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: 12 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-4 text-sm sm:text-base text-[#3A2B23] leading-[1.8]"
                    >
                      <p className="text-xs tracking-[0.14em] uppercase text-[#9C7528] font-semibold">
                        Nội dung giới thiệu
                      </p>
                      <p>{book.shortIntro}</p>
                      {book.isSampleSlot && book.sampleGuidance && (
                        <div className="p-4 bg-[#F6F1E7] border border-[#E6DCCD] text-xs sm:text-sm text-[#5C463B]">
                          <p className="font-semibold text-[#2B1D16] mb-1">
                            Ghi chú dành cho Ban Tổ Chức
                          </p>
                          <p>{book.sampleGuidance}</p>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="page-2"
                      initial={{ opacity: 0, rotateY: 12 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: -12 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-4 text-sm sm:text-base text-[#3A2B23] leading-[1.8]"
                    >
                      <p className="text-xs tracking-[0.14em] uppercase text-[#9C7528] font-semibold">
                        Ý nghĩa và giá trị của cuốn sách
                      </p>
                      <p>{book.significance}</p>
                      <p className="font-serif italic text-[#5C463B] pt-2">
                        “Mỗi ấn phẩm được tuyển chọn giới thiệu nhân Ngày Văn hóa Việt Nam đều góp phần bồi đắp tình yêu tri thức và bản sắc văn hóa dân tộc.”
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Page-Turn Controls & Actions */}
              <div className="mt-8 pt-5 border-t border-[#E6DCCD] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPageSpread(0)}
                    disabled={pageSpread === 0}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-[#D9CCB8] rounded-sm text-[#2B1D16] hover:bg-[#F6F1E7] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Trang trước</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPageSpread(1)}
                    disabled={pageSpread === 1}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-[#D9CCB8] rounded-sm text-[#2B1D16] hover:bg-[#F6F1E7] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <span>Lật trang sau</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onToggleFavorite(book.id)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-sm border transition-colors ${
                      isFavorite
                        ? 'bg-[#9E2A2B] border-[#9E2A2B] text-white'
                        : 'border-[#D9CCB8] text-[#2B1D16] hover:border-[#9E2A2B] hover:text-[#9E2A2B]'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
                    <span>{isFavorite ? 'Đã lưu yêu thích' : 'Lưu yêu thích'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onEditInOrganizer();
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#5C463B] hover:text-[#9E2A2B] transition-colors"
                  >
                    <PencilLine className="w-3.5 h-3.5" />
                    <span>Thay sách (BTC)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
