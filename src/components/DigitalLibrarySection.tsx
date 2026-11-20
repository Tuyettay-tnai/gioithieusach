import React, { useMemo, useState } from 'react';
import { Search, Heart, BookOpen, RefreshCw, X } from 'lucide-react';
import { BOOK_CATEGORIES, READING_INSPIRATIONS } from '../config/eventConfig';
import { BookCategoryId, ExhibitionBook } from '../types/event';
import { EditorialDivider, ResilientImage } from './CulturalMotifs';

interface DigitalLibrarySectionProps {
  books: ExhibitionBook[];
  favoriteIds: string[];
  onToggleFavorite: (bookId: string) => void;
  onSelectBook: (book: ExhibitionBook) => void;
}

export function DigitalLibrarySection({
  books,
  favoriteIds,
  onToggleFavorite,
  onSelectBook,
}: DigitalLibrarySectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | BookCategoryId>('all');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [inspirationIndex, setInspirationIndex] = useState(0);

  const filteredBooks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return books.filter((book) => {
      if (favoritesOnly && !favoriteIds.includes(book.id)) return false;
      if (selectedCategory !== 'all' && book.categoryId !== selectedCategory) {
        return false;
      }
      if (!q) return true;
      const categoryName =
        BOOK_CATEGORIES.find((c) => c.id === book.categoryId)?.name.toLowerCase() || '';
      return (
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.shortIntro.toLowerCase().includes(q) ||
        categoryName.includes(q)
      );
    });
  }, [books, favoriteIds, favoritesOnly, searchQuery, selectedCategory]);

  const currentInspiration = READING_INSPIRATIONS[inspirationIndex];

  const handleNextInspiration = () => {
    setInspirationIndex((prev) => (prev + 1) % READING_INSPIRATIONS.length);
  };

  return (
    <section id="thu-vien-so" className="py-20 sm:py-28 bg-[#FCFBF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.18em] uppercase text-[#9E2A2B] font-medium">
            Không gian tương tác bạn đọc
          </p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-[#2B1D16] text-balance">
            Thư Viện Số – Khám Phá Tri Thức
          </h2>
          <EditorialDivider />
        </div>

        {/* Highlight Reading Inspiration Banner */}
        <div className="mt-6 bg-white border border-[#E6DCCD] p-7 sm:p-10 text-center max-w-4xl mx-auto">
          <blockquote className="font-serif italic text-xl sm:text-2xl lg:text-[26px] text-[#2B1D16] leading-relaxed text-balance">
            “{currentInspiration.quote}”
          </blockquote>
          <p className="mt-3 text-xs sm:text-sm text-[#7A6658]">
            {currentInspiration.reflection}
          </p>
          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={handleNextInspiration}
              className="inline-flex items-center gap-2 text-xs font-medium text-[#9E2A2B] hover:text-[#7B1E20] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A45] rounded px-2 py-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Xem thông điệp truyền cảm hứng khác</span>
            </button>
          </div>
        </div>

        {/* Interactive Search & Filter Controls */}
        <div className="mt-12 bg-[#F6F1E7] border border-[#E6DCCD] p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="lg:col-span-5 relative">
              <Search className="w-4 h-4 text-[#7A6658] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <label htmlFor="digital-library-search" className="sr-only">
                Tìm kiếm tên sách, tác giả hoặc chuyên đề
              </label>
              <input
                id="digital-library-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm tên sách, chuyên đề hoặc từ khóa..."
                className="w-full pl-10 pr-9 py-2.5 bg-white border border-[#DFD2BE] text-sm text-[#2B1D16] placeholder:text-[#8E7A6C] rounded-sm focus:outline-none focus:border-[#9E2A2B]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#7A6658] hover:text-[#2B1D16]"
                  aria-label="Xóa từ khóa tìm kiếm"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Select */}
            <div className="lg:col-span-4">
              <label htmlFor="digital-library-category" className="sr-only">
                Lọc theo danh mục sách
              </label>
              <select
                id="digital-library-category"
                value={selectedCategory}
                onChange={(e) =>
                  setSelectedCategory(e.target.value as 'all' | BookCategoryId)
                }
                className="w-full px-3.5 py-2.5 bg-white border border-[#DFD2BE] text-sm text-[#2B1D16] rounded-sm focus:outline-none focus:border-[#9E2A2B]"
              >
                <option value="all">Tất cả 07 danh mục sách</option>
                {BOOK_CATEGORIES.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.orderLabel}. {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Favorites Toggle */}
            <div className="lg:col-span-3 flex items-center justify-between lg:justify-end gap-3">
              <button
                type="button"
                onClick={() => setFavoritesOnly((prev) => !prev)}
                aria-pressed={favoritesOnly}
                className={`w-full lg:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-sm border transition-colors whitespace-nowrap ${
                  favoritesOnly
                    ? 'bg-[#9E2A2B] border-[#9E2A2B] text-white'
                    : 'bg-white border-[#DFD2BE] text-[#2B1D16] hover:border-[#9E2A2B] hover:text-[#9E2A2B]'
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${favoritesOnly ? 'fill-current' : ''}`}
                />
                <span>
                  Sách yêu thích (<span className="tabular-nums">{favoriteIds.length}</span>)
                </span>
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E6DCCD] flex flex-wrap items-center justify-between gap-2 text-xs text-[#7A6658]">
            <span>
              Hiển thị <strong className="text-[#2B1D16] tabular-nums">{filteredBooks.length}</strong>{' '}
              trên tổng số <span className="tabular-nums">{books.length}</span> đầu mục trưng bày
            </span>
            {(searchQuery || selectedCategory !== 'all' || favoritesOnly) && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setFavoritesOnly(false);
                }}
                className="text-[#9E2A2B] font-medium hover:underline"
              >
                Đặt lại bộ lọc
              </button>
            )}
          </div>
        </div>

        {/* Results Grid */}
        {filteredBooks.length === 0 ? (
          <div className="mt-10 py-14 px-6 bg-white border border-[#E6DCCD] text-center">
            <BookOpen className="w-8 h-8 text-[#C49A45] mx-auto mb-3" />
            <p className="font-serif text-xl text-[#2B1D16]">
              {favoritesOnly
                ? 'Quý vị chưa đánh dấu cuốn sách yêu thích nào'
                : 'Không tìm thấy đầu sách phù hợp với từ khóa hiện tại'}
            </p>
            <p className="mt-2 text-sm text-[#7A6658]">
              {favoritesOnly
                ? 'Hãy nhấn biểu tượng trái tim trên bất kỳ cuốn sách nào để lưu vào tủ sách yêu thích của riêng quý vị.'
                : 'Thử nhập từ khóa khác hoặc chọn xem tất cả danh mục.'}
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => {
              const category = BOOK_CATEGORIES.find((c) => c.id === book.categoryId);
              const isFavorite = favoriteIds.includes(book.id);
              return (
                <article
                  key={book.id}
                  className="bg-white border border-[#E6DCCD] hover:border-[#C49A45] transition-colors p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => onSelectBook(book)}
                        className="w-20 h-28 shrink-0 overflow-hidden border border-[#E6DCCD] bg-[#2B1D16] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A45]"
                        aria-label={`Xem giới thiệu ${book.title}`}
                      >
                        <ResilientImage
                          src={book.coverImage}
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                      </button>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-[11px] tracking-wide uppercase text-[#7A6658] truncate">
                            {category?.shortName}
                          </p>
                          <button
                            type="button"
                            onClick={() => onToggleFavorite(book.id)}
                            aria-label={
                              isFavorite
                                ? 'Bỏ khỏi sách yêu thích'
                                : 'Thêm vào sách yêu thích'
                            }
                            aria-pressed={isFavorite}
                            className={`p-1.5 rounded-sm transition-colors ${
                              isFavorite
                                ? 'text-[#9E2A2B]'
                                : 'text-[#9C8B7E] hover:text-[#9E2A2B]'
                            }`}
                          >
                            <Heart
                              className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`}
                            />
                          </button>
                        </div>

                        <h3 className="mt-1 font-serif text-base font-semibold text-[#2B1D16] leading-snug line-clamp-2">
                          <button
                            type="button"
                            onClick={() => onSelectBook(book)}
                            className="text-left hover:text-[#9E2A2B] transition-colors"
                          >
                            {book.title}
                          </button>
                        </h3>
                        <p className="mt-1 text-xs text-[#7A6658] italic line-clamp-1">
                          {book.author}
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-xs sm:text-sm text-[#5C463B] leading-relaxed line-clamp-3">
                      {book.shortIntro}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#EFE8DC] flex items-center justify-between text-xs">
                    <span className="text-[#7A6658]">{book.accessionCode}</span>
                    <button
                      type="button"
                      onClick={() => onSelectBook(book)}
                      className="font-medium text-[#9E2A2B] hover:text-[#7B1E20] transition-colors"
                    >
                      Xem giới thiệu →
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
