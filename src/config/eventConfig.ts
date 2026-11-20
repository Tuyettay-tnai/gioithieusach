import {
  BookCategory,
  EventConfiguration,
  GalleryGroupId,
} from '../types/event';

export const STORAGE_KEYS = {
  CONFIG: 'vn_culture_book_exhibition_config_v1',
  FAVORITES: 'vn_culture_book_exhibition_favorites_v1',
} as const;

export const EXHIBITION_ASSETS = {
  hero: '/src/assets/images/hero_vietnam_exhibition_1795152224634.jpg',
  librarySpace: '/src/assets/images/gallery_library_space_1795152226098.jpg',
  heritageBooks: '/src/assets/images/gallery_heritage_books_1795152225678.jpg',
  readingCulture: '/src/assets/images/gallery_reading_culture_1795152226200.jpg',
  exhibitionPrep: '/src/assets/images/gallery_exhibition_prep_1795152225491.jpg',
  coverCinnabar: '/src/assets/images/book_cover_heritage_1795152225740.jpg',
  coverIvory: '/src/assets/images/book_cover_landscape_1795152224824.jpg',
  coverMahogany: '/src/assets/images/book_cover_classic_1795152225429.jpg',
} as const;

export const BOOK_CATEGORIES: BookCategory[] = [
  {
    id: 'lich-su',
    name: 'Sách lịch sử Việt Nam',
    shortName: 'Lịch sử Việt Nam',
    orderLabel: '01',
    curatorNote:
      'Tái hiện những chặng đường dựng nước và giữ nước hào hùng, khơi dậy niềm tự hào về nguồn cội dân tộc.',
  },
  {
    id: 'van-hoa-di-san',
    name: 'Sách văn hóa và di sản dân tộc',
    shortName: 'Văn hóa & Di sản',
    orderLabel: '02',
    curatorNote:
      'Ghi dấu phong tục, nghệ thuật truyền thống, lễ hội và kho tàng di sản vật thể, phi vật thể đặc sắc.',
  },
  {
    id: 'chu-tich-ho-chi-minh',
    name: 'Sách về Chủ tịch Hồ Chí Minh',
    shortName: 'Chủ tịch Hồ Chí Minh',
    orderLabel: '03',
    curatorNote:
      'Tôn vinh tư tưởng, đạo đức, phong cách và những bài học sâu sắc từ cuộc đời của Người.',
  },
  {
    id: 'van-hoc',
    name: 'Sách văn học Việt Nam',
    shortName: 'Văn học Việt Nam',
    orderLabel: '04',
    curatorNote:
      'Kết tinh vẻ đẹp ngôn ngữ tiếng Việt, tâm hồn và chiều sâu nhân văn qua nhiều thế hệ tác gia.',
  },
  {
    id: 'giao-duc-ky-nang',
    name: 'Sách giáo dục và kỹ năng sống',
    shortName: 'Giáo dục & Kỹ năng',
    orderLabel: '05',
    curatorNote:
      'Đồng hành cùng người học trong hành trình rèn luyện tư duy, phương pháp tự học và năng lực hội nhập.',
  },
  {
    id: 'thieu-nhi',
    name: 'Sách thiếu nhi',
    shortName: 'Sách thiếu nhi',
    orderLabel: '06',
    curatorNote:
      'Nuôi dưỡng trí tưởng tượng trong sáng, lòng nhân ái và thói quen đọc sách từ những năm tháng đầu đời.',
  },
  {
    id: 'que-huong-dat-nuoc',
    name: 'Sách về quê hương, đất nước và con người Việt Nam',
    shortName: 'Quê hương & Con người',
    orderLabel: '07',
    curatorNote:
      'Khắc họa vẻ đẹp non sông, địa chí vùng miền và cốt cách kiên cường, nghĩa tình của con người Việt Nam.',
  },
];

export const GALLERY_GROUPS: { id: 'all' | GalleryGroupId; label: string }[] = [
  { id: 'all', label: 'Tất cả tư liệu' },
  { id: 'khong-gian-thu-vien', label: 'Không gian thư viện' },
  { id: 'sach-tieu-bieu', label: 'Những cuốn sách tiêu biểu' },
  { id: 'hoat-dong-van-hoa-doc', label: 'Hoạt động văn hóa đọc' },
  { id: 'chuan-bi-su-kien', label: 'Hình ảnh chuẩn bị sự kiện' },
];

export const READING_INSPIRATIONS: { quote: string; reflection: string }[] = [
  {
    quote:
      'Sách là kho tàng tri thức, là nhịp cầu kết nối quá khứ, hiện tại và tương lai.',
    reflection:
      'Thông điệp chủ đạo của không gian thư viện số nhân Ngày Văn hóa Việt Nam.',
  },
  {
    quote:
      'Mỗi cuốn sách mở ra một chân trời tri thức. Mỗi trang sách lưu giữ một phần hồn cốt dân tộc.',
    reflection:
      'Đọc sách là cách bền bỉ nhất để đối thoại cùng tiền nhân và vun đắp tương lai.',
  },
  {
    quote:
      'Một thế hệ yêu đọc sách là nền tảng vững bền của một nền văn hóa giàu bản sắc và sáng tạo.',
    reflection:
      'Cùng chung tay nuôi dưỡng thói quen đọc trong gia đình, nhà trường và cộng đồng.',
  },
];

export const DEFAULT_EVENT_CONFIG: EventConfiguration = {
  event: {
    programName: 'Giới thiệu sách của Thư viện nhân Ngày Văn hóa Việt Nam',
    theme: 'Lan tỏa tri thức – Gìn giữ bản sắc – Kết nối tương lai',
    dateTime: '',
    venue: '',
    organizer: '',
    guests:
      'Quý đại biểu, lãnh đạo, quý khách mời, quý thầy cô giáo, các em học sinh và những người yêu sách',
    representativeName: '',
  },
  contact: {
    hotline: '',
    email: '',
    googleMapsEmbedUrl: '',
    introVideoUrl: '',
    introVideoTitle: 'Video giới thiệu chương trình Ngày Văn hóa Việt Nam',
    introVideoCaption:
      'Không gian trình chiếu video giới thiệu chính thức của Ban Tổ Chức (hỗ trợ đường dẫn nhúng YouTube hoặc tệp video trực tiếp).',
    registrationEndpointUrl: '',
    registrationBackendType: 'unconfigured',
  },
  schedule: [
    {
      id: 'item-1',
      order: '01',
      title: 'Đón tiếp đại biểu và khách mời',
      description:
        'Đón tiếp quý đại biểu, thầy cô giáo, các em học sinh và bạn đọc; hướng dẫn tham quan khu vực check-in và không gian trưng bày mở đầu.',
      timeSlot: '',
      duration: '',
      icon: 'welcome',
    },
    {
      id: 'item-2',
      order: '02',
      title: 'Tuyên bố lý do, giới thiệu đại biểu',
      description:
        'Ổn định chương trình, nêu ý nghĩa tổ chức sự kiện và trân trọng giới thiệu quý đại biểu, khách mời tham dự.',
      timeSlot: '',
      duration: '',
      icon: 'opening-intro',
    },
    {
      id: 'item-3',
      order: '03',
      title: 'Phát biểu khai mạc',
      description:
        'Đại diện Ban Tổ Chức phát biểu khai mạc chương trình, gửi gắm thông điệp lan tỏa văn hóa đọc đến cộng đồng.',
      timeSlot: '',
      duration: '',
      icon: 'keynote',
    },
    {
      id: 'item-4',
      order: '04',
      title: 'Giới thiệu ý nghĩa Ngày Văn hóa Việt Nam',
      description:
        'Nhìn lại những giá trị cốt lõi của nền văn hóa Việt Nam tiên tiến, đậm đà bản sắc dân tộc và vai trò của sách trong đời sống tinh thần.',
      timeSlot: '',
      duration: '',
      icon: 'culture-day',
    },
    {
      id: 'item-5',
      order: '05',
      title: 'Giới thiệu những cuốn sách tiêu biểu của thư viện',
      description:
        'Điểm sách theo 07 chuyên đề trọng tâm: Lịch sử, Văn hóa – Di sản, Chủ tịch Hồ Chí Minh, Văn học, Giáo dục, Thiếu nhi và Quê hương đất nước.',
      timeSlot: '',
      duration: '',
      icon: 'book-showcase',
    },
    {
      id: 'item-6',
      order: '06',
      title: 'Giao lưu, chia sẻ về sách và văn hóa đọc',
      description:
        'Diễn đàn cởi mở giữa khách mời, thầy cô, học sinh và bạn đọc về phương pháp đọc sách hiệu quả và những trang sách truyền cảm hứng.',
      timeSlot: '',
      duration: '',
      icon: 'exchange',
    },
    {
      id: 'item-7',
      order: '07',
      title: 'Tham quan không gian trưng bày sách',
      description:
        'Trải nghiệm trực tiếp các chuyên đề sách tuyển chọn tại thư viện, đọc sách tại chỗ và ghi lưu bút cảm nghĩ.',
      timeSlot: '',
      duration: '',
      icon: 'exhibition-tour',
    },
    {
      id: 'item-8',
      order: '08',
      title: 'Bế mạc và chụp ảnh lưu niệm',
      description:
        'Tổng kết chương trình, tri ân quý đại biểu và khách mời, cùng lưu giữ những khoảnh khắc ý nghĩa bên không gian sách.',
      timeSlot: '',
      duration: '',
      icon: 'closing',
    },
  ],
  books: [
    // 01. Sách lịch sử Việt Nam
    {
      id: 'sample-ls-01',
      accessionCode: 'TV · LS-01',
      categoryId: 'lich-su',
      title: 'Văn hóa các dân tộc thiểu số – Những giá trị đặc sắc',
      author: 'Phan Đăng Nhật · Hội Văn nghệ dân gian Việt Nam · NXB Khoa học xã hội',
      shortIntro:
        'Công trình nghiên cứu chuyên sâu do Hội Văn nghệ dân gian Việt Nam và Nhà xuất bản Khoa học xã hội ấn hành. Tác phẩm phác họa bức tranh toàn cảnh về đời sống tinh thần, sự đa dạng bản sắc cùng quá trình cư trú xen kẽ, giao lưu văn hóa lâu đời trong đại gia đình các dân tộc Việt Nam.',
      significance:
        'Góp phần nhận diện khoa học và tôn vinh những giá trị văn hóa vật thể, phi vật thể đặc sắc của đồng bào các dân tộc thiểu số, qua đó nâng cao ý thức trân trọng, bảo tồn và phát huy di sản dân tộc.',
      coverImage: 'https://i.ibb.co/8LmqQYpF/shopping-1.webp',
      coverTone: 'cinnabar',
      isSampleSlot: false,
    },
    {
      id: 'sample-ls-02',
      accessionCode: 'MẪU · LS-02',
      categoryId: 'lich-su',
      title: '[Vị trí trưng bày mẫu 02] Nhân vật & sự kiện lịch sử tiêu biểu',
      author: 'Chờ Ban Tổ Chức cập nhật tên tác giả / nhà xuất bản',
      shortIntro:
        'Khung trưng bày mẫu dành cho ấn phẩm giới thiệu các danh nhân, anh hùng dân tộc và mốc son lịch sử quan trọng trong kho sách của Thư viện.',
      significance:
        'Khơi gợi niềm tự hào dân tộc thông qua những câu chuyện lịch sử giàu tư liệu và gần gũi với độc giả nhiều lứa tuổi.',
      coverImage: EXHIBITION_ASSETS.coverMahogany,
      coverTone: 'mahogany',
      isSampleSlot: true,
      sampleGuidance:
        'Gợi ý thay thế: Tác phẩm viết về danh nhân lịch sử hoặc bộ sử biên niên thực tế của thư viện.',
    },
    {
      id: 'sample-ls-03',
      accessionCode: 'MẪU · LS-03',
      categoryId: 'lich-su',
      title: '[Vị trí trưng bày mẫu 03] Chờ cập nhật sách Lịch sử Việt Nam',
      author: 'Chờ Ban Tổ Chức cập nhật tên tác giả / nhà xuất bản',
      shortIntro:
        'Vị trí trưng bày mới dành cho ấn phẩm Lịch sử Việt Nam của Thư viện. Nhấn vào sách để tải ảnh bìa từ máy tính/điện thoại hoặc dán đường dẫn ảnh và cập nhật thông tin sách.',
      significance:
        'Làm phong phú thêm gian trưng bày Lịch sử Việt Nam, giúp người đọc tiếp cận đa dạng góc nhìn về truyền thống dựng nước và giữ nước.',
      coverImage: EXHIBITION_ASSETS.coverCinnabar,
      coverTone: 'cinnabar',
      isSampleSlot: true,
      sampleGuidance:
        'Gợi ý thay thế: Nhấn "Đổi ảnh bìa" trong cửa sổ xem sách hoặc mở bảng biên tập BTC để đưa ảnh và tên sách thực tế lên.',
    },
    {
      id: 'sample-ls-04',
      accessionCode: 'MẪU · LS-04',
      categoryId: 'lich-su',
      title: '[Vị trí trưng bày mẫu 04] Chờ cập nhật sách Lịch sử Việt Nam',
      author: 'Chờ Ban Tổ Chức cập nhật tên tác giả / nhà xuất bản',
      shortIntro:
        'Vị trí trưng bày mới dành cho ấn phẩm Lịch sử Việt Nam tiếp theo của Thư viện. Hỗ trợ tải ảnh trực tiếp từ thiết bị hoặc dán liên kết ảnh.',
      significance:
        'Góp phần hoàn thiện bộ sưu tập sách lịch sử tiêu biểu giới thiệu tới đại biểu, thầy cô, học sinh và bạn đọc nhân Ngày Văn hóa Việt Nam.',
      coverImage: EXHIBITION_ASSETS.coverIvory,
      coverTone: 'ivory',
      isSampleSlot: true,
      sampleGuidance:
        'Gợi ý thay thế: Nhấn "Đổi ảnh bìa" trong cửa sổ xem sách hoặc mở bảng biên tập BTC để đưa ảnh và tên sách thực tế lên.',
    },

    // 02. Sách văn hóa và di sản dân tộc
    {
      id: 'sample-vh-01',
      accessionCode: 'MẪU · VH-01',
      categoryId: 'van-hoa-di-san',
      title: '[Vị trí trưng bày mẫu 01] Di sản văn hóa & nghệ thuật truyền thống',
      author: 'Chờ Ban Tổ Chức cập nhật tên tác giả / đơn vị xuất bản',
      shortIntro:
        'Vị trí mẫu dành cho cuốn sách khảo cứu về phong tục, lễ hội, mỹ thuật cổ truyền hoặc di sản văn hóa Việt Nam được thư viện chọn giới thiệu.',
      significance:
        'Góp phần bảo tồn ký ức văn hóa dân tộc và lan tỏa vẻ đẹp tinh hoa của nghệ thuật truyền thống trong đời sống đương đại.',
      coverImage: EXHIBITION_ASSETS.coverIvory,
      coverTone: 'ivory',
      isSampleSlot: true,
      sampleGuidance:
        'Gợi ý thay thế: Sách ảnh di sản, nghiên cứu văn hóa dân gian hoặc kiến trúc cổ truyền Việt Nam.',
    },
    {
      id: 'sample-vh-02',
      accessionCode: 'MẪU · VH-02',
      categoryId: 'van-hoa-di-san',
      title: '[Vị trí trưng bày mẫu 02] Phong tục, lễ nghi & bản sắc vùng miền',
      author: 'Chờ Ban Tổ Chức cập nhật tên tác giả',
      shortIntro:
        'Khung trưng bày mẫu cho ấn phẩm giới thiệu sự đa dạng văn hóa các dân tộc Việt Nam, ẩm thực truyền thống và làng nghề cổ truyền.',
      significance:
        'Giúp người đọc cảm nhận sâu sắc sự thống nhất trong đa dạng của cộng đồng các dân tộc Việt Nam.',
      coverImage: EXHIBITION_ASSETS.coverCinnabar,
      coverTone: 'cinnabar',
      isSampleSlot: true,
      sampleGuidance:
        'Gợi ý thay thế: Tác phẩm biên khảo về phong tục tập quán hoặc làng nghề truyền thống.',
    },

    // 03. Sách về Chủ tịch Hồ Chí Minh
    {
      id: 'sample-hcm-01',
      accessionCode: 'MẪU · HCM-01',
      categoryId: 'chu-tich-ho-chi-minh',
      title: '[Vị trí trưng bày mẫu 01] Tư tưởng, đạo đức & phong cách Hồ Chí Minh',
      author: 'Chờ Ban Tổ Chức cập nhật thông tin xuất bản thực tế',
      shortIntro:
        'Vị trí trưng bày trang trọng dành cho tác phẩm chính thống về cuộc đời, sự nghiệp và tư tưởng văn hóa của Chủ tịch Hồ Chí Minh đang lưu giữ tại Thư viện.',
      significance:
        'Truyền cảm hứng sâu sắc về tinh thần tự học suốt đời, lối sống giản dị, nhân ái và khát vọng cống hiến vì Tổ quốc.',
      coverImage: EXHIBITION_ASSETS.coverCinnabar,
      coverTone: 'cinnabar',
      isSampleSlot: true,
      sampleGuidance:
        'Gợi ý thay thế: Ấn phẩm chính thống về Chủ tịch Hồ Chí Minh do Nhà xuất bản uy tín ấn hành có sẵn tại thư viện.',
    },
    {
      id: 'sample-hcm-02',
      accessionCode: 'MẪU · HCM-02',
      categoryId: 'chu-tich-ho-chi-minh',
      title: '[Vị trí trưng bày mẫu 02] Những câu chuyện kể về Bác Hồ',
      author: 'Chờ Ban Tổ Chức cập nhật tên người tuyển chọn / biên soạn',
      shortIntro:
        'Khung giới thiệu mẫu cho tập sách kể chuyện về Bác Hồ với giáo dục, với văn hóa đọc và với thế hệ thiếu nhi, thanh niên Việt Nam.',
      significance:
        'Mang đến những bài học đạo đức gần gũi, dễ cảm nhận cho cán bộ, giáo viên, học sinh và đông đảo bạn đọc.',
      coverImage: EXHIBITION_ASSETS.coverMahogany,
      coverTone: 'mahogany',
      isSampleSlot: true,
      sampleGuidance:
        'Gợi ý thay thế: Tuyển tập hồi ký hoặc sách kể chuyện về tấm gương tự học và đọc sách của Bác Hồ.',
    },

    // 04. Sách văn học Việt Nam
    {
      id: 'sample-vhoc-01',
      accessionCode: 'MẪU · VN-01',
      categoryId: 'van-hoc',
      title: '[Vị trí trưng bày mẫu 01] Tác phẩm văn học Việt Nam tiêu biểu',
      author: 'Chờ Ban Tổ Chức cập nhật tên nhà văn / nhà thơ',
      shortIntro:
        'Vị trí trưng bày mẫu cho kiệt tác văn học cổ điển hoặc hiện đại Việt Nam được Thư viện tuyển chọn giới thiệu trong chương trình.',
      significance:
        'Bồi đắp vẻ đẹp tâm hồn, gìn giữ sự trong sáng của tiếng Việt và nuôi dưỡng cảm quan thẩm mỹ giàu tính nhân văn.',
      coverImage: EXHIBITION_ASSETS.coverIvory,
      coverTone: 'ivory',
      isSampleSlot: true,
      sampleGuidance:
        'Gợi ý thay thế: Tác phẩm văn học Việt Nam kinh điển hoặc tuyển tập truyện ngắn, thơ ca tiêu biểu tại thư viện.',
    },
    {
      id: 'sample-vhoc-02',
      accessionCode: 'MẪU · VN-02',
      categoryId: 'van-hoc',
      title: '[Vị trí trưng bày mẫu 02] Văn học đương đại & tiếng nói thế hệ mới',
      author: 'Chờ Ban Tổ Chức cập nhật tên tác giả',
      shortIntro:
        'Khung trưng bày mẫu cho tác phẩm văn học đương đại phản ánh hơi thở cuộc sống, gia đình và khát vọng của người Việt hôm nay.',
      significance:
        'Kết nối bạn đọc trẻ với dòng chảy văn chương đương đại, tạo cầu nối đồng cảm giữa các thế hệ.',
      coverImage: EXHIBITION_ASSETS.coverMahogany,
      coverTone: 'mahogany',
      isSampleSlot: true,
      sampleGuidance:
        'Gợi ý thay thế: Tác phẩm văn học đạt giải thưởng quốc gia hoặc được bạn đọc thư viện yêu thích.',
    },

    // 05. Sách giáo dục và kỹ năng sống
    {
      id: 'sample-gd-01',
      accessionCode: 'MẪU · GD-01',
      categoryId: 'giao-duc-ky-nang',
      title: '[Vị trí trưng bày mẫu 01] Phương pháp tự học & nuôi dưỡng tư duy',
      author: 'Chờ Ban Tổ Chức cập nhật tên tác giả / dịch giả',
      shortIntro:
        'Vị trí trưng bày mẫu dành cho cuốn sách giáo dục tiêu biểu về phương pháp đọc hiểu, tư duy phản biện và xây dựng thói quen học tập suốt đời.',
      significance:
        'Trang bị hành trang tri thức thiết thực cho học sinh, sinh viên và giáo viên trong kỷ nguyên chuyển đổi số.',
      coverImage: EXHIBITION_ASSETS.coverMahogany,
      coverTone: 'mahogany',
      isSampleSlot: true,
      sampleGuidance:
        'Gợi ý thay thế: Sách về phương pháp học tập, giáo dục nhân cách hoặc kỹ năng đọc sách sâu.',
    },
    {
      id: 'sample-gd-02',
      accessionCode: 'MẪU · GD-02',
      categoryId: 'giao-duc-ky-nang',
      title: '[Vị trí trưng bày mẫu 02] Kỹ năng sống & giá trị công dân tích cực',
      author: 'Chờ Ban Tổ Chức cập nhật tên tác giả',
      shortIntro:
        'Khung trưng bày mẫu dành cho ấn phẩm phát triển kỹ năng giao tiếp, hợp tác, quản lý cảm xúc và trách nhiệm cộng đồng.',
      significance:
        'Hỗ trợ người đọc phát triển hài hòa giữa tri thức chuyên môn, kỹ năng thực tiễn và thái độ sống tích cực.',
      coverImage: EXHIBITION_ASSETS.coverIvory,
      coverTone: 'ivory',
      isSampleSlot: true,
      sampleGuidance:
        'Gợi ý thay thế: Ấn phẩm kỹ năng sống và hướng nghiệp hiện có tại tủ sách giáo dục của thư viện.',
    },

    // 06. Sách thiếu nhi
    {
      id: 'sample-tn-01',
      accessionCode: 'MẪU · TN-01',
      categoryId: 'thieu-nhi',
      title: '[Vị trí trưng bày mẫu 01] Truyện cổ tích & văn học thiếu nhi Việt Nam',
      author: 'Chờ Ban Tổ Chức cập nhật tên tác giả / họa sĩ minh họa',
      shortIntro:
        'Vị trí trưng bày mẫu dành cho tuyển tập truyện cổ tích, đồng dao hoặc tác phẩm văn học thiếu nhi giàu tranh minh họa của Thư viện.',
      significance:
        'Gieo mầm tình yêu tiếng Việt, nuôi dưỡng trí tưởng tượng phong phú và bài học thiện lương cho các em nhỏ.',
      coverImage: EXHIBITION_ASSETS.coverIvory,
      coverTone: 'ivory',
      isSampleSlot: true,
      sampleGuidance:
        'Gợi ý thay thế: Sách tranh cổ tích Việt Nam hoặc truyện thiếu nhi giàu giá trị nhân văn trong thư viện.',
    },
    {
      id: 'sample-tn-02',
      accessionCode: 'MẪU · TN-02',
      categoryId: 'thieu-nhi',
      title: '[Vị trí trưng bày mẫu 02] Khám phá khoa học & thế giới quanh em',
      author: 'Chờ Ban Tổ Chức cập nhật tên tác giả / nhóm biên soạn',
      shortIntro:
        'Khung trưng bày mẫu cho ấn phẩm bách khoa tri thức thiếu nhi, giúp các em nhỏ vừa học vừa khám phá thiên nhiên và văn hóa.',
      significance:
        'Khuyến khích tinh thần tò mò khoa học và tạo niềm vui khi các em đến với không gian thư viện.',
      coverImage: EXHIBITION_ASSETS.coverCinnabar,
      coverTone: 'cinnabar',
      isSampleSlot: true,
      sampleGuidance:
        'Gợi ý thay thế: Sách khoa học thường thức hoặc bách khoa bằng tranh cho thiếu nhi.',
    },

    // 07. Sách về quê hương, đất nước và con người Việt Nam
    {
      id: 'sample-qh-01',
      accessionCode: 'MẪU · QH-01',
      categoryId: 'que-huong-dat-nuoc',
      title: '[Vị trí trưng bày mẫu 01] Địa chí, danh thắng & non sông Việt Nam',
      author: 'Chờ Ban Tổ Chức cập nhật tên tác giả / hội đồng biên soạn',
      shortIntro:
        'Vị trí trưng bày mẫu dành cho tác phẩm địa chí địa phương, sách ảnh danh thắng và hành trình khám phá ba miền Bắc – Trung – Nam.',
      significance:
        'Gắn kết tình yêu quê hương cụ thể với niềm tự hào về toàn vẹn lãnh thổ và vẻ đẹp đất nước Việt Nam.',
      coverImage: EXHIBITION_ASSETS.coverIvory,
      coverTone: 'ivory',
      isSampleSlot: true,
      sampleGuidance:
        'Gợi ý thay thế: Ấn phẩm địa chí địa phương hoặc sách giới thiệu cảnh quan, biển đảo quê hương.',
    },
    {
      id: 'sample-qh-02',
      accessionCode: 'MẪU · QH-02',
      categoryId: 'que-huong-dat-nuoc',
      title: '[Vị trí trưng bày mẫu 02] Chân dung & cốt cách con người Việt Nam',
      author: 'Chờ Ban Tổ Chức cập nhật tên tác giả',
      shortIntro:
        'Khung trưng bày mẫu cho bút ký, phóng sự văn hóa hoặc tuyển tập viết về nghĩa tình, nghị lực và tinh thần sáng tạo của con người Việt Nam.',
      significance:
        'Tôn vinh vẻ đẹp bình dị mà cao quý của con người Việt Nam trong lao động, học tập và gìn giữ truyền thống.',
      coverImage: EXHIBITION_ASSETS.coverMahogany,
      coverTone: 'mahogany',
      isSampleSlot: true,
      sampleGuidance:
        'Gợi ý thay thế: Tập bút ký văn hóa, ký sự địa phương hoặc chân dung người tốt việc tốt.',
    },
  ],
  gallery: [
    {
      id: 'gal-01',
      groupId: 'khong-gian-thu-vien',
      groupLabel: 'Không gian thư viện',
      caption: 'Không gian kiến trúc thư viện ấm cúng, chan hòa ánh sáng tự nhiên',
      description:
        'Hình ảnh minh họa không gian đọc sách và trưng bày mang âm hưởng gỗ truyền thống kết hợp tiện nghi hiện đại. Ban Tổ Chức có thể thay bằng ảnh thực tế của Thư viện.',
      imageUrl: EXHIBITION_ASSETS.librarySpace,
      isIllustrative: true,
    },
    {
      id: 'gal-02',
      groupId: 'sach-tieu-bieu',
      groupLabel: 'Những cuốn sách tiêu biểu',
      caption: 'Khu vực tuyển chọn và bài trí ấn phẩm văn hóa – di sản',
      description:
        'Hình ảnh minh họa cách trưng bày sách nghệ thuật cùng hoa sen và chất liệu truyền thống. Sẵn sàng thay thế bằng hình ảnh tủ sách thực tế.',
      imageUrl: EXHIBITION_ASSETS.heritageBooks,
      isIllustrative: true,
    },
    {
      id: 'gal-03',
      groupId: 'hoat-dong-van-hoa-doc',
      groupLabel: 'Hoạt động văn hóa đọc',
      caption: 'Khoảnh khắc giao lưu và sẻ chia tri thức giữa các thế hệ bạn đọc',
      description:
        'Hình ảnh minh họa hoạt động cùng đọc sách, trao đổi cảm nhận giữa thầy cô, phụ huynh, học sinh và người yêu sách.',
      imageUrl: EXHIBITION_ASSETS.readingCulture,
      isIllustrative: true,
    },
    {
      id: 'gal-04',
      groupId: 'chuan-bi-su-kien',
      groupLabel: 'Hình ảnh chuẩn bị sự kiện',
      caption: 'Công tác bài trí giá sách trưng bày trước giờ khai mạc',
      description:
        'Hình ảnh minh họa quy trình sắp đặt từng ấn phẩm tiêu biểu trên bục triển lãm, bảo đảm sự trang trọng và thẩm mỹ.',
      imageUrl: EXHIBITION_ASSETS.exhibitionPrep,
      isIllustrative: true,
    },
    {
      id: 'gal-05',
      groupId: 'sach-tieu-bieu',
      groupLabel: 'Những cuốn sách tiêu biểu',
      caption: 'Không gian điểm nhấn với sách mở và họa tiết trống đồng Đông Sơn',
      description:
        'Hình ảnh minh họa chủ đề trung tâm của triển lãm sách nhân Ngày Văn hóa Việt Nam.',
      imageUrl: EXHIBITION_ASSETS.hero,
      isIllustrative: true,
    },
    {
      id: 'gal-06',
      groupId: 'chuan-bi-su-kien',
      groupLabel: 'Hình ảnh chuẩn bị sự kiện',
      caption: 'Tuyển chọn bìa ấn phẩm chuyên đề lịch sử và văn hóa dân tộc',
      description:
        'Hình ảnh minh họa hệ thống phân nhóm sách theo từng chuyên đề phục vụ đại biểu và khách mời tham quan.',
      imageUrl: EXHIBITION_ASSETS.coverCinnabar,
      isIllustrative: true,
    },
  ],
};

export function isImgBBPageLink(rawUrl: string): boolean {
  const trimmed = rawUrl.trim();
  if (!trimmed) return false;
  try {
    const parsed = new URL(trimmed);
    return (
      (parsed.hostname === 'ibb.co' || parsed.hostname === 'www.ibb.co') &&
      parsed.pathname.length > 1
    );
  } catch {
    return false;
  }
}

export function normalizeImageUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  if (!trimmed) return '';
  if (trimmed === 'https://ibb.co/jP8mjJ27' || trimmed === 'https://ibb.co/jP8mjJ27/') {
    return 'https://i.ibb.co/8LmqQYpF/shopping-1.webp';
  }
  // Convert Google Drive share links to direct image links
  const driveMatch = trimmed.match(/drive\.google\.com\/file\/d\/([^/]+)/i);
  if (driveMatch?.[1]) {
    return `https://lh3.googleusercontent.com/d/${driveMatch[1]}`;
  }
  return trimmed;
}

export function readImageFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Không thể đọc tệp ảnh đã chọn.'));
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      if (!result) {
        reject(new Error('Dữ liệu ảnh trống.'));
        return;
      }
      const img = new Image();
      img.onload = () => {
        const maxDim = 960;
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          const ratio = Math.min(maxDim / width, maxDim / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(result);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        try {
          resolve(canvas.toDataURL('image/jpeg', 0.85));
        } catch {
          resolve(result);
        }
      };
      img.onerror = () => resolve(result);
      img.src = result;
    };
    reader.readAsDataURL(file);
  });
}

export function loadEventConfiguration(): EventConfiguration {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
    if (!saved) return DEFAULT_EVENT_CONFIG;
    const parsed = JSON.parse(saved) as Partial<EventConfiguration>;
    const defaultLs01 = DEFAULT_EVENT_CONFIG.books[0];

    let savedBooks =
      Array.isArray(parsed.books) && parsed.books.length > 0
        ? parsed.books.map((book) => {
            if (
              book.id === 'sample-ls-01' &&
              (book.isSampleSlot ||
                book.title.includes('[Vị trí trưng bày mẫu 01]'))
            ) {
              return {
                ...defaultLs01,
                coverImage:
                  book.coverImage === EXHIBITION_ASSETS.coverCinnabar ||
                  book.coverImage === 'https://ibb.co/jP8mjJ27' ||
                  !book.coverImage
                    ? defaultLs01.coverImage
                    : normalizeImageUrl(book.coverImage),
              };
            }
            return {
              ...book,
              coverImage: normalizeImageUrl(book.coverImage),
            };
          })
        : DEFAULT_EVENT_CONFIG.books;

    // Ensure newly added default book slots (e.g., sample-ls-03, sample-ls-04) are merged cleanly
    const existingIds = new Set(savedBooks.map((b) => b.id));
    const missingDefaults = DEFAULT_EVENT_CONFIG.books.filter(
      (b) => !existingIds.has(b.id)
    );
    if (missingDefaults.length > 0) {
      savedBooks = [...savedBooks, ...missingDefaults];
    }

    return {
      event: { ...DEFAULT_EVENT_CONFIG.event, ...(parsed.event || {}) },
      contact: { ...DEFAULT_EVENT_CONFIG.contact, ...(parsed.contact || {}) },
      schedule:
        Array.isArray(parsed.schedule) && parsed.schedule.length > 0
          ? parsed.schedule
          : DEFAULT_EVENT_CONFIG.schedule,
      books: savedBooks,
      gallery:
        Array.isArray(parsed.gallery) && parsed.gallery.length > 0
          ? parsed.gallery
          : DEFAULT_EVENT_CONFIG.gallery,
    };
  } catch {
    return DEFAULT_EVENT_CONFIG;
  }
}

export function saveEventConfiguration(config: EventConfiguration): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
  } catch {
    // Ignore storage quota issues silently
  }
}

export function resetEventConfiguration(): EventConfiguration {
  try {
    localStorage.removeItem(STORAGE_KEYS.CONFIG);
  } catch {
    // Ignore storage issues
  }
  return DEFAULT_EVENT_CONFIG;
}

export function extractYouTubeEmbedUrl(rawUrl: string): string | null {
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;
  try {
    const url = new URL(trimmed);
    if (url.hostname.includes('youtube.com')) {
      if (url.pathname.startsWith('/embed/')) {
        return trimmed;
      }
      const videoId = url.searchParams.get('v');
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
    if (url.hostname === 'youtu.be') {
      const videoId = url.pathname.replace('/', '').trim();
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
    return null;
  } catch {
    return null;
  }
}
