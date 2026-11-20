export type BookCategoryId =
  | 'lich-su'
  | 'van-hoa-di-san'
  | 'chu-tich-ho-chi-minh'
  | 'van-hoc'
  | 'giao-duc-ky-nang'
  | 'thieu-nhi'
  | 'que-huong-dat-nuoc';

export interface BookCategory {
  id: BookCategoryId;
  name: string;
  shortName: string;
  curatorNote: string;
  orderLabel: string;
}

export interface ExhibitionBook {
  id: string;
  accessionCode: string;
  categoryId: BookCategoryId;
  title: string;
  author: string;
  shortIntro: string;
  significance: string;
  coverImage: string;
  coverTone: 'cinnabar' | 'ivory' | 'mahogany';
  isSampleSlot: boolean;
  sampleGuidance?: string;
}

export type ScheduleIconKey =
  | 'welcome'
  | 'opening-intro'
  | 'keynote'
  | 'culture-day'
  | 'book-showcase'
  | 'exchange'
  | 'exhibition-tour'
  | 'closing';

export interface ScheduleItem {
  id: string;
  order: string;
  title: string;
  description: string;
  timeSlot: string;
  duration: string;
  icon: ScheduleIconKey;
}

export type GalleryGroupId =
  | 'khong-gian-thu-vien'
  | 'sach-tieu-bieu'
  | 'hoat-dong-van-hoa-doc'
  | 'chuan-bi-su-kien';

export interface GalleryItem {
  id: string;
  groupId: GalleryGroupId;
  groupLabel: string;
  caption: string;
  description: string;
  imageUrl: string;
  isIllustrative: boolean;
}

export interface EventDetails {
  programName: string;
  theme: string;
  dateTime: string;
  venue: string;
  organizer: string;
  guests: string;
  representativeName: string;
}

export interface ContactAndMediaConfig {
  hotline: string;
  email: string;
  googleMapsEmbedUrl: string;
  introVideoUrl: string;
  introVideoTitle: string;
  introVideoCaption: string;
  registrationEndpointUrl: string;
  registrationBackendType: 'unconfigured' | 'google-sheets' | 'firebase';
}

export interface EventConfiguration {
  event: EventDetails;
  contact: ContactAndMediaConfig;
  schedule: ScheduleItem[];
  books: ExhibitionBook[];
  gallery: GalleryItem[];
}

export interface RegistrationFormData {
  fullName: string;
  roleOrOrganization: string;
  phone: string;
  email: string;
  attendeeCount: number;
  message: string;
}
