export type CourseLesson = {
  id: string;
  title: string;
  duration: string;
  previewUrl?: string;
};

export type CourseModule = {
  id: string;
  title: string;
  lessonCount: number;
  totalDuration: string;
  lessons: CourseLesson[];
};

export const courseData: CourseModule[] = [
  {
    id: "giris",
    title: "Giriş",
    lessonCount: 1,
    totalDuration: "2 dak",
    lessons: [
      {
        id: "giris-tanitim",
        title: "Tanıtım",
        duration: "1:33",
        previewUrl: "#",
      },
    ],
  },
  {
    id: "html",
    title: "HTML Dersleri",
    lessonCount: 24,
    totalDuration: "3 sa",
    lessons: [
      { id: "html-1", title: "HTML Nedir?", duration: "8:12", previewUrl: "#" },
      { id: "html-2", title: "Temel Etiketler", duration: "14:05", previewUrl: "#" },
      { id: "html-3", title: "Form Elemanları", duration: "11:40" },
    ],
  },
  {
    id: "css",
    title: "CSS",
    lessonCount: 12,
    totalDuration: "1 sa 37 dak",
    lessons: [
      { id: "css-1", title: "CSS Seçiciler", duration: "9:18", previewUrl: "#" },
      { id: "css-2", title: "Flexbox", duration: "16:22" },
    ],
  },
  {
    id: "html-css-apps",
    title: "HTML-CSS Uygulamaları",
    lessonCount: 1,
    totalDuration: "18 dak",
    lessons: [
      { id: "app-1", title: "Landing Page Projesi", duration: "18:00", previewUrl: "#" },
    ],
  },
  {
    id: "javascript",
    title: "Javascript Temel Bilgileri",
    lessonCount: 13,
    totalDuration: "1 sa 46 dak",
    lessons: [
      { id: "js-1", title: "Değişkenler ve Tipler", duration: "12:30" },
      { id: "js-2", title: "Fonksiyonlar", duration: "15:44", previewUrl: "#" },
    ],
  },
  {
    id: "sqlite",
    title: "Sqlite Veri Tabanı İşlemleri",
    lessonCount: 13,
    totalDuration: "56 dak",
    lessons: [
      { id: "sql-1", title: "Veritabanı Kurulumu", duration: "7:15" },
      { id: "sql-2", title: "CRUD İşlemleri", duration: "10:08" },
    ],
  },
  {
    id: "python",
    title: "Python Programlama",
    lessonCount: 29,
    totalDuration: "3 sa 32 dak",
    lessons: [
      { id: "py-1", title: "Python Kurulumu", duration: "6:20", previewUrl: "#" },
      { id: "py-2", title: "Veri Yapıları", duration: "18:55" },
    ],
  },
  {
    id: "python-db",
    title: "Python ile Veri Tabanı İşlemleri",
    lessonCount: 4,
    totalDuration: "35 dak",
    lessons: [
      { id: "pydb-1", title: "SQLite Bağlantısı", duration: "9:12" },
      { id: "pydb-2", title: "ORM Temelleri", duration: "12:40", previewUrl: "#" },
    ],
  },
];
