(() => {
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const norm = s => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");

  /* Thương hiệu */
  document.title = `${SITE.name} · ${SITE.slogan}`;
  document.querySelectorAll("[data-site]").forEach(e => e.textContent = SITE[e.dataset.site]);
  $("#about-text").innerHTML = SITE.about.map(p => `<p>${esc(p)}</p>`).join("");

  /* Gom toàn bộ nội dung (đường dẫn tương đối → chạy được dưới /tieng-trung-/) */
  const L = BOOKS.flatMap(b => b.lessons.map(code => {
    const [n, k] = code.split(".");
    return { kind: "Bài học", book: b.id, bookName: b.name, code, title: k ? `Bài ${n} · Bài khóa ${k}` : `Bài ${n}`, href: `${b.id}/bai${code}/` };
  }));
  const mk = (kind, arr, cta) => arr.map(x => ({ kind, title: x.name, desc: x.desc || "", emoji: x.emoji || "✨", href: x.href, cta }));
  const G = mk("Trò chơi", GAMES, "Chơi →"), A = mk("Góc kiến thức", ARTICLES, "Đọc →"), D = mk("Tài liệu", DOCS, "Mở →");
  const ALL = [...L, ...G, ...A, ...D].map(i => ({ ...i, key: norm(`${i.kind} ${i.bookName || ""} ${i.book || ""} ${i.code || ""} ${i.title} ${i.desc || ""}`) }));

  const card = (i, showKind) => i.kind === "Bài học"
    ? `<a class="card" data-book="${i.book}" href="${esc(i.href)}"><small>${esc(i.bookName)}${showKind ? " · Bài học" : ""}</small><h3>${esc(i.title)}</h3><span class="go">Học bài →</span></a>`
    : `<a class="card tool" href="${esc(i.href)}"><span class="emo">${esc(i.emoji)}</span>${showKind ? `<small>${esc(i.kind)}</small>` : ""}<h3>${esc(i.title)}</h3><p>${esc(i.desc)}</p><span class="go">${i.cta}</span></a>`;
  const soon = (e, t) => `<div class="soon"><span>${e}</span><p>${t}</p></div>`;
  const fill = (sel, items, e, t) => $(sel).innerHTML = items.length ? items.map(i => card(i)).join("") : soon(e, t);
  fill("#games", G, "🎈", "Trò chơi đang được chuẩn bị.<br>Sẽ xuất hiện ở đây khi sẵn sàng.");
  fill("#articles", A, "📖", "Góc kiến thức đang được chuẩn bị.<br>Bài viết sẽ xuất hiện ở đây khi sẵn sàng.");
  fill("#docs", D, "📄", "Tài liệu đang được chuẩn bị.<br>Sẽ xuất hiện ở đây khi sẵn sàng.");

  /* Ô chọn nhanh 4 mục */
  $("#quick").innerHTML = [["bai-hoc","📚","Bài học",L.length,"bài"],["tro-choi","🎮","Trò chơi",G.length,"trò chơi"],["goc-kien-thuc","💡","Góc kiến thức",A.length,"bài viết"],["tai-lieu","📄","Tài liệu",D.length,"tài liệu"]]
    .map(([id,e,n,c,u]) => `<a class="tile" data-sec="${id}" href="#${id}"><span class="emo">${e}</span><b>${n}</b><span>${c ? `${c} ${u}` : "Sắp có"}</span></a>`).join("");

  /* Bài học: lọc theo quyển */
  let book = "all";
  $("#chips").innerHTML = [`<button class="chip" data-pick="all">Tất cả</button>`].concat(BOOKS.map(b => `<button class="chip" data-pick="${b.id}">${esc(b.name)}</button>`)).join("");
  function renderLessons() {
    const list = L.filter(i => book === "all" || i.book === book);
    document.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", c.dataset.pick === book));
    $("#count").textContent = `Hiển thị ${list.length} / ${L.length} bài`;
    $("#lessons").innerHTML = list.map(i => card(i)).join("");
  }
  document.addEventListener("click", e => { const p = e.target.closest(".chip"); if (p) { book = p.dataset.pick; renderLessons(); } });
  renderLessons();

  /* Tìm kiếm chung cho mọi mục */
  $("#gsearch").addEventListener("input", e => {
    const q = norm(e.target.value.trim()), on = q !== "";
    $("#home").hidden = on; $("#results").hidden = !on;
    if (!on) return;
    const r = ALL.filter(i => i.key.includes(q));
    $("#rcount").textContent = `Tìm thấy ${r.length} kết quả`;
    $("#rlist").innerHTML = r.map(i => card(i, true)).join("");
    $("#rempty").hidden = r.length > 0;
  });
})();
