/* =====================================================================
   DỮ LIỆU WEBSITE — đây là NƠI DUY NHẤT cần sửa khi đổi tên hoặc thêm nội dung
   ===================================================================== */

/* 1) Thương hiệu: đổi tên, slogan, logo ở đây */
const SITE = {
  name: "Linh Chinese",
  hanzi: "中文学习站",
  slogan: "Học tiếng Trung dễ hiểu – Luyện tập mỗi ngày",
  logo: "学",                       // chữ hoặc emoji trong logo tròn
  about: [
    "Đây là nơi tập hợp các tài liệu và công cụ học tiếng Trung do mình biên soạn.",
    "Mỗi bài học gồm các phần: Từ mới, Ngữ pháp, Bài khóa, Flashcard và Kiểm tra. Bạn chọn quyển, chọn bài rồi bấm “Học bài” là học được ngay, không cần đăng nhập."
  ],
  footer: "Học tiếng Trung mỗi ngày một chút."
};

/* 2) Kho bài học.
   Thêm bài mới: thêm mã bài vào đúng quyển, ví dụ "16.1" hoặc "17".
   Mã "2.2" = Bài 2, Bài khóa 2  →  mở thư mục  Q1/bai2.2/
   Mã "16"  = Bài 16             →  mở thư mục  Q1/bai16/            */
const pairs = n => Array.from({length: n}, (_, i) => [`${i+1}.1`, `${i+1}.2`]).flat();
const BOOKS = [
  { id: "Q1", name: "Quyển 1", lessons: [...pairs(15), "16"] },
  { id: "Q2", name: "Quyển 2", lessons: [...pairs(15)] },
  { id: "Q3", name: "Quyển 3", lessons: [...pairs(15)] }
];

/* 3) Trò chơi — mỗi trò chơi một dòng. Chỉ thêm khi file đã có trong repository.
   Ví dụ (mẫu ở dưới là trò chơi đã có): { name: "Tên trò chơi", desc: "Mô tả ngắn.", emoji: "🎮", href: "thu-muc-tro-choi/" }, */
const GAMES = [
  { name: "Mưa Từ Vựng HSK", desc: "Đọc nghĩa đang rơi, gõ pinyin để bắn hạ từ. Chọn cấp HSK 1 đến 4.", emoji: "🌧️", href: "mua_tu_vung/" },
  { name: "Ôn từ vựng tiếng Trung — Quyển 1", desc: "Ôn theo bài với 3 hình thức: Flashcard, Ghép thẻ, Trắc nghiệm. Chọn Quyển 1 trong trang.", emoji: "📝", href: "on-tu-vung/" },
  { name: "Ôn từ vựng tiếng Trung — Quyển 2", desc: "Ôn theo bài với 3 hình thức: Flashcard, Ghép thẻ, Trắc nghiệm. Chọn Quyển 2 trong trang.", emoji: "📝", href: "on-tu-vung/" },
  { name: "Ôn từ vựng tiếng Trung — Quyển 3", desc: "Ôn theo bài với 3 hình thức: Flashcard, Ghép thẻ, Trắc nghiệm. Chọn Quyển 3 trong trang.", emoji: "📝", href: "on-tu-vung/" }
];

/* 4) Góc kiến thức — bài viết kiến thức. Mỗi bài một dòng, ví dụ:
   { name: "Phân biệt 的 / 得 / 地", desc: "Ba chữ phát âm giống nhau.", emoji: "💡", href: "kien-thuc/de-de-di/" }, */
const ARTICLES = [
];

/* 5) Tài liệu — đề thi HSK, sách giáo trình và tài liệu học tiếng Trung. Mỗi tài liệu một dòng. */
const DOCS = [
];
