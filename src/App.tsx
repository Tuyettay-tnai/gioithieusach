import React, { useEffect, useState } from 'react';
import {
  STORAGE_KEYS,
  loadEventConfiguration,
  resetEventConfiguration,
  saveEventConfiguration,
} from './config/eventConfig';
import { EventConfiguration, ExhibitionBook } from './types/event';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { InvitationAndInfoSection } from './components/InvitationAndInfoSection';
import {
  BookDetailModal,
  BookExhibitionSection,
} from './components/BookExhibitionSection';
import { ScheduleAndGallerySection } from './components/ScheduleAndGallerySection';
import { DigitalLibrarySection } from './components/DigitalLibrarySection';
import { RegistrationAndContactSection } from './components/RegistrationAndContactSection';
import { ClosingAndFooter } from './components/ClosingAndFooter';
import {
  OrganizerEditorDrawer,
  OrganizerEditorTab,
} from './components/OrganizerEditorDrawer';

const TRACKED_SECTIONS = [
  'thu-moi',
  'khong-gian-sach',
  'chuong-trinh',
  'hinh-anh',
  'thu-vien-so',
  'dang-ky',
];

function loadFavorites(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [config, setConfig] = useState<EventConfiguration>(() =>
    loadEventConfiguration()
  );
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => loadFavorites());
  const [selectedBook, setSelectedBook] = useState<ExhibitionBook | null>(null);
  const [activeSection, setActiveSection] = useState<string>('thu-moi');
  const [editorState, setEditorState] = useState<{
    open: boolean;
    tab: OrganizerEditorTab;
  }>({ open: false, tab: 'event' });

  // Sync canonical and og:url dynamically
  useEffect(() => {
    const canonicalUrl = window.location.origin + window.location.pathname;
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonicalUrl;
  }, []);

  // Scroll-spy for top navigation highlight
  useEffect(() => {
    const elements = TRACKED_SECTIONS.map((id) =>
      document.getElementById(id)
    ).filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleToggleFavorite = (bookId: string) => {
    setFavoriteIds((prev) => {
      const next = prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId];
      try {
        localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(next));
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  };

  const handleSaveConfig = (nextConfig: EventConfiguration) => {
    setConfig(nextConfig);
    saveEventConfiguration(nextConfig);
    if (selectedBook) {
      const updated = nextConfig.books.find((b) => b.id === selectedBook.id);
      if (updated) setSelectedBook(updated);
    }
  };

  const handleResetConfig = () => {
    const defaults = resetEventConfiguration();
    setConfig(defaults);
  };

  const handleUpdateBookCover = (bookId: string, newCoverUrl: string) => {
    const nextConfig: EventConfiguration = {
      ...config,
      books: config.books.map((b) =>
        b.id === bookId ? { ...b, coverImage: newCoverUrl } : b
      ),
    };
    handleSaveConfig(nextConfig);
  };

  const openEditor = (tab: OrganizerEditorTab) => {
    setEditorState({ open: true, tab });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFBF8] text-[#2B1D16]">
      <Header activeSection={activeSection} />

      <main className="flex-1">
        {/* Phần 1: Hero – Màn hình mở đầu */}
        <HeroSection
          event={config.event}
          onOpenOrganizerEditor={() => openEditor('event')}
        />

        {/* Phần 2, 3, 4: Thư mời, Thông tin sự kiện & Sứ mệnh lan tỏa tri thức */}
        <InvitationAndInfoSection
          event={config.event}
          onOpenOrganizerEditor={() => openEditor('event')}
        />

        {/* Phần 5: Khám phá không gian sách (07 chuyên mục + xem chi tiết lật trang) */}
        <BookExhibitionSection
          books={config.books}
          favoriteIds={favoriteIds}
          onToggleFavorite={handleToggleFavorite}
          onSelectBook={(book) => setSelectedBook(book)}
          onEditBooksInOrganizer={() => openEditor('books')}
        />

        {/* Phần 6 & 7: Chương trình sự kiện + Thư viện hình ảnh & Video */}
        <ScheduleAndGallerySection
          schedule={config.schedule}
          gallery={config.gallery}
          contact={config.contact}
          onOpenScheduleEditor={() => openEditor('schedule')}
          onOpenMediaEditor={() => openEditor('contact')}
          onOpenGalleryEditor={() => openEditor('gallery')}
        />

        {/* Phần 8: Thư viện số – Khám phá tri thức */}
        <DigitalLibrarySection
          books={config.books}
          favoriteIds={favoriteIds}
          onToggleFavorite={handleToggleFavorite}
          onSelectBook={(book) => setSelectedBook(book)}
        />

        {/* Phần 9 & 10: Đăng ký tham dự + Bản đồ & Thông tin liên hệ */}
        <RegistrationAndContactSection
          event={config.event}
          contact={config.contact}
          onOpenOrganizerEditor={() => openEditor('contact')}
        />
      </main>

      {/* Phần 11: Lời kết – Thông điệp lan tỏa & Footer */}
      <ClosingAndFooter
        event={config.event}
        onOpenOrganizerEditor={() => openEditor('event')}
      />

      {/* Interactive 3D Open-Book Modal */}
      <BookDetailModal
        book={selectedBook}
        isFavorite={selectedBook ? favoriteIds.includes(selectedBook.id) : false}
        onClose={() => setSelectedBook(null)}
        onToggleFavorite={handleToggleFavorite}
        onUpdateBookCover={handleUpdateBookCover}
        onEditInOrganizer={() => openEditor('books')}
      />

      {/* Organizer Live Configuration Drawer */}
      <OrganizerEditorDrawer
        isOpen={editorState.open}
        initialTab={editorState.tab}
        config={config}
        onClose={() => setEditorState((prev) => ({ ...prev, open: false }))}
        onSaveConfig={handleSaveConfig}
        onResetConfig={handleResetConfig}
      />
    </div>
  );
}
