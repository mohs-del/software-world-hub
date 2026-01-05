// Types
export interface Software {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  icon: string;
  category: string;
  subCategory: string;
  platform: 'windows' | 'mac' | 'linux' | 'android' | 'ios';
  version: string;
  size: string;
  sizeInMB: number;
  downloads: number;
  rating: number;
  screenshots: string[];
  downloadUrl: string;
  developer: string;
  releaseDate: string;
  requirements: string[];
  features: string[];
  isPopular: boolean;
  isQuickDownload: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: { id: string; name: string }[];
}

// Categories with subcategories
export const categories: Category[] = [
  {
    id: 'graphics',
    name: 'گرافیک و طراحی',
    icon: 'Palette',
    subcategories: [
      { id: 'photo-editing', name: 'ویرایش عکس' },
      { id: 'video-editing', name: 'ویرایش ویدیو' },
      { id: '3d-modeling', name: 'مدل‌سازی سه‌بعدی' },
      { id: 'vector-design', name: 'طراحی وکتور' },
    ]
  },
  {
    id: 'development',
    name: 'برنامه‌نویسی',
    icon: 'Code',
    subcategories: [
      { id: 'ide', name: 'محیط توسعه' },
      { id: 'web-dev', name: 'توسعه وب' },
      { id: 'database', name: 'پایگاه داده' },
      { id: 'version-control', name: 'کنترل نسخه' },
    ]
  },
  {
    id: 'office',
    name: 'اداری و آفیس',
    icon: 'FileText',
    subcategories: [
      { id: 'word-processing', name: 'پردازش متن' },
      { id: 'spreadsheet', name: 'صفحه گسترده' },
      { id: 'presentation', name: 'ارائه' },
      { id: 'pdf', name: 'PDF' },
    ]
  },
  {
    id: 'internet',
    name: 'اینترنت و شبکه',
    icon: 'Globe',
    subcategories: [
      { id: 'browsers', name: 'مرورگر' },
      { id: 'download-managers', name: 'مدیریت دانلود' },
      { id: 'vpn', name: 'VPN' },
      { id: 'messaging', name: 'پیام‌رسان' },
    ]
  },
  {
    id: 'security',
    name: 'امنیت',
    icon: 'Shield',
    subcategories: [
      { id: 'antivirus', name: 'آنتی‌ویروس' },
      { id: 'firewall', name: 'فایروال' },
      { id: 'password-manager', name: 'مدیریت رمز' },
    ]
  },
  {
    id: 'multimedia',
    name: 'چندرسانه‌ای',
    icon: 'Play',
    subcategories: [
      { id: 'media-player', name: 'پخش‌کننده' },
      { id: 'audio-editing', name: 'ویرایش صدا' },
      { id: 'streaming', name: 'استریم' },
    ]
  },
  {
    id: 'utilities',
    name: 'ابزار سیستم',
    icon: 'Settings',
    subcategories: [
      { id: 'file-manager', name: 'مدیریت فایل' },
      { id: 'compression', name: 'فشرده‌سازی' },
      { id: 'backup', name: 'پشتیبان‌گیری' },
      { id: 'optimization', name: 'بهینه‌سازی' },
    ]
  },
  {
    id: 'games',
    name: 'بازی',
    icon: 'Gamepad2',
    subcategories: [
      { id: 'action', name: 'اکشن' },
      { id: 'strategy', name: 'استراتژی' },
      { id: 'puzzle', name: 'پازل' },
      { id: 'racing', name: 'مسابقه‌ای' },
    ]
  },
];

// Platform specific navigation
export const platforms = [
  {
    id: 'windows',
    name: 'ویندوز',
    icon: 'Monitor',
    categories: ['graphics', 'development', 'office', 'internet', 'security', 'multimedia', 'utilities', 'games']
  },
  {
    id: 'mac',
    name: 'مک',
    icon: 'Apple',
    categories: ['graphics', 'development', 'office', 'internet', 'security', 'multimedia', 'utilities']
  },
  {
    id: 'linux',
    name: 'لینوکس',
    icon: 'Terminal',
    categories: ['development', 'office', 'internet', 'security', 'utilities']
  },
  {
    id: 'android',
    name: 'اندروید',
    icon: 'Smartphone',
    categories: ['internet', 'security', 'multimedia', 'games']
  },
  {
    id: 'ios',
    name: 'iOS',
    icon: 'Tablet',
    categories: ['internet', 'security', 'multimedia', 'games']
  },
];

// Sample software data
export const softwareList: Software[] = [
  {
    id: 'google-chrome',
    name: 'گوگل کروم',
    description: 'مرورگر سریع و امن گوگل',
    fullDescription: 'گوگل کروم یکی از محبوب‌ترین مرورگرهای وب است که توسط گوگل توسعه داده شده. این مرورگر با سرعت بالا، امنیت قوی و قابلیت همگام‌سازی با حساب گوگل، تجربه‌ای عالی از وب‌گردی را فراهم می‌کند.',
    icon: '🌐',
    category: 'internet',
    subCategory: 'browsers',
    platform: 'windows',
    version: '120.0.6099.130',
    size: '95 MB',
    sizeInMB: 95,
    downloads: 1500000,
    rating: 4.8,
    screenshots: [
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800',
      'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800',
    ],
    downloadUrl: '#',
    developer: 'Google',
    releaseDate: '2024-01-10',
    requirements: ['Windows 10 یا بالاتر', 'حداقل 512 مگابایت RAM', '500 مگابایت فضای خالی'],
    features: ['همگام‌سازی با حساب گوگل', 'پشتیبانی از افزونه‌ها', 'حالت ناشناس', 'مدیریت رمز عبور'],
    isPopular: true,
    isQuickDownload: true,
  },
  {
    id: 'idm',
    name: 'Internet Download Manager',
    description: 'مدیریت دانلود حرفه‌ای',
    fullDescription: 'Internet Download Manager یکی از قدرتمندترین ابزارهای مدیریت دانلود است که سرعت دانلود را تا ۵ برابر افزایش می‌دهد. با قابلیت زمان‌بندی، دانلود هوشمند فایل‌های ویدیویی و ادغام کامل با مرورگرها.',
    icon: '⬇️',
    category: 'internet',
    subCategory: 'download-managers',
    platform: 'windows',
    version: '6.42',
    size: '12 MB',
    sizeInMB: 12,
    downloads: 2000000,
    rating: 4.9,
    screenshots: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    ],
    downloadUrl: '#',
    developer: 'Tonec Inc.',
    releaseDate: '2024-01-15',
    requirements: ['Windows 7 یا بالاتر', 'حداقل 256 مگابایت RAM'],
    features: ['افزایش سرعت دانلود', 'زمان‌بندی دانلود', 'دانلود ویدیو از سایت‌ها', 'ادامه دانلودهای ناقص'],
    isPopular: true,
    isQuickDownload: true,
  },
  {
    id: 'photoshop',
    name: 'Adobe Photoshop',
    description: 'ویرایشگر حرفه‌ای تصاویر',
    fullDescription: 'Adobe Photoshop استاندارد صنعت برای ویرایش تصاویر و طراحی گرافیک است. با ابزارهای قدرتمند، لایه‌ها، فیلترها و امکانات AI جدید، هر آنچه برای خلق آثار بصری خیره‌کننده نیاز دارید.',
    icon: '🎨',
    category: 'graphics',
    subCategory: 'photo-editing',
    platform: 'windows',
    version: '2024',
    size: '3.2 GB',
    sizeInMB: 3200,
    downloads: 800000,
    rating: 4.7,
    screenshots: [
      'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800',
      'https://images.unsplash.com/photo-1561998338-13ad7883b20f?w=800',
    ],
    downloadUrl: '#',
    developer: 'Adobe',
    releaseDate: '2024-01-01',
    requirements: ['Windows 10 64-bit', 'حداقل 8 گیگابایت RAM', 'کارت گرافیک 2 گیگابایت'],
    features: ['ابزارهای AI', 'لایه‌های هوشمند', 'پشتیبانی از RAW', 'ادغام با Creative Cloud'],
    isPopular: true,
    isQuickDownload: false,
  },
  {
    id: 'vscode',
    name: 'Visual Studio Code',
    description: 'ویرایشگر کد قدرتمند',
    fullDescription: 'Visual Studio Code یک ویرایشگر کد منبع‌باز و رایگان از مایکروسافت است. با پشتیبانی از صدها زبان برنامه‌نویسی، افزونه‌های متنوع و ابزارهای اشکال‌زدایی داخلی.',
    icon: '💻',
    category: 'development',
    subCategory: 'ide',
    platform: 'windows',
    version: '1.85.1',
    size: '95 MB',
    sizeInMB: 95,
    downloads: 3000000,
    rating: 4.9,
    screenshots: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
    ],
    downloadUrl: '#',
    developer: 'Microsoft',
    releaseDate: '2024-01-08',
    requirements: ['Windows 7 یا بالاتر', 'حداقل 1 گیگابایت RAM'],
    features: ['IntelliSense', 'اشکال‌زدایی داخلی', 'Git یکپارچه', 'ترمینال داخلی'],
    isPopular: true,
    isQuickDownload: true,
  },
  {
    id: 'vlc',
    name: 'VLC Media Player',
    description: 'پخش‌کننده همه‌کاره رسانه',
    fullDescription: 'VLC Media Player پخش‌کننده‌ای رایگان و متن‌باز است که تقریباً هر فرمت ویدیو و صوتی را پشتیبانی می‌کند. بدون نیاز به کدک اضافی.',
    icon: '🎬',
    category: 'multimedia',
    subCategory: 'media-player',
    platform: 'windows',
    version: '3.0.20',
    size: '42 MB',
    sizeInMB: 42,
    downloads: 2500000,
    rating: 4.8,
    screenshots: [
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800',
    ],
    downloadUrl: '#',
    developer: 'VideoLAN',
    releaseDate: '2024-01-12',
    requirements: ['Windows 7 یا بالاتر', 'حداقل 256 مگابایت RAM'],
    features: ['پشتیبانی از همه فرمت‌ها', 'پخش استریم', 'بدون تبلیغات', 'زیرنویس'],
    isPopular: true,
    isQuickDownload: true,
  },
  {
    id: 'winrar',
    name: 'WinRAR',
    description: 'فشرده‌سازی حرفه‌ای فایل‌ها',
    fullDescription: 'WinRAR ابزار قدرتمند فشرده‌سازی و استخراج فایل با پشتیبانی از RAR، ZIP و بسیاری فرمت‌های دیگر. رمزنگاری AES 256-bit برای امنیت فایل‌ها.',
    icon: '📦',
    category: 'utilities',
    subCategory: 'compression',
    platform: 'windows',
    version: '6.24',
    size: '3.5 MB',
    sizeInMB: 3.5,
    downloads: 4000000,
    rating: 4.6,
    screenshots: [
      'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800',
    ],
    downloadUrl: '#',
    developer: 'win.rar GmbH',
    releaseDate: '2024-01-05',
    requirements: ['Windows 7 یا بالاتر'],
    features: ['فشرده‌سازی RAR5', 'رمزنگاری AES', 'تعمیر آرشیو', 'چند جلدی'],
    isPopular: true,
    isQuickDownload: true,
  },
  {
    id: 'telegram-desktop',
    name: 'تلگرام دسکتاپ',
    description: 'پیام‌رسان سریع و امن',
    fullDescription: 'تلگرام دسکتاپ نسخه رسمی تلگرام برای ویندوز، مک و لینوکس. با همگام‌سازی کامل با موبایل و امکانات پیشرفته.',
    icon: '✈️',
    category: 'internet',
    subCategory: 'messaging',
    platform: 'windows',
    version: '4.15.2',
    size: '45 MB',
    sizeInMB: 45,
    downloads: 1800000,
    rating: 4.7,
    screenshots: [
      'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800',
    ],
    downloadUrl: '#',
    developer: 'Telegram',
    releaseDate: '2024-01-14',
    requirements: ['Windows 7 یا بالاتر'],
    features: ['همگام‌سازی چند دستگاهی', 'کانال و گروه', 'استیکر و ایموجی', 'رمزنگاری end-to-end'],
    isPopular: true,
    isQuickDownload: true,
  },
  {
    id: 'microsoft-office',
    name: 'Microsoft Office 2024',
    description: 'مجموعه اداری حرفه‌ای',
    fullDescription: 'Microsoft Office 2024 شامل Word، Excel، PowerPoint و سایر ابزارهای اداری با قابلیت‌های AI جدید برای افزایش بهره‌وری.',
    icon: '📊',
    category: 'office',
    subCategory: 'word-processing',
    platform: 'windows',
    version: '2024',
    size: '4.5 GB',
    sizeInMB: 4500,
    downloads: 1200000,
    rating: 4.8,
    screenshots: [
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800',
    ],
    downloadUrl: '#',
    developer: 'Microsoft',
    releaseDate: '2024-01-01',
    requirements: ['Windows 10 یا بالاتر', 'حداقل 4 گیگابایت RAM'],
    features: ['Word با AI', 'Excel پیشرفته', 'PowerPoint Designer', 'OneDrive یکپارچه'],
    isPopular: true,
    isQuickDownload: false,
  },
];

// Quick download apps (popular utilities)
export const quickDownloadApps = softwareList.filter(s => s.isQuickDownload);

// Get software by platform
export const getSoftwareByPlatform = (platform: string) => 
  softwareList.filter(s => s.platform === platform);

// Get software by category
export const getSoftwareByCategory = (category: string) => 
  softwareList.filter(s => s.category === category);

// Get software by ID
export const getSoftwareById = (id: string) => 
  softwareList.find(s => s.id === id);
