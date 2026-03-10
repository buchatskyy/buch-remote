import { useEffect, useLayoutEffect, useMemo, useRef, useState, useCallback } from "react";
import styles from "./Photogallery.module.css";
import Card from "./Card/Card";
import Modal from "./Modal/Modal";

export function Photogallery({
  images,
  cardWidth = 260, // fallback, если вдруг контейнер не измерился
  gap = 16,
  wheelScrollFactor = 1.1,
}) {
  const scrollerRef = useRef(null);
  const wrapRef = useRef(null);

  // arrow enable/disable
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // which image is open in modal (index)
  const [openIndex, setOpenIndex] = useState(null);

  // ✅ computed card width so that exactly 3 are visible
  const [computedWidth, setComputedWidth] = useState(cardWidth);

  // ✅ compute width: (container - gaps) / 3
  useLayoutEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const visibleCount = 3;

    const updateWidth = () => {
      const containerWidth = el.clientWidth;
      const totalGap = gap * (visibleCount - 1);
      const width = (containerWidth - totalGap) / visibleCount;

      // защита от странных значений на очень узких экранах
      setComputedWidth(Math.max(120, Math.floor(width)));
    };

    updateWidth();

    const ro = new ResizeObserver(updateWidth);
    ro.observe(el);

    return () => ro.disconnect();
  }, [gap]);

  // ✅ one "card step" (used by arrow buttons)
  const step = useMemo(() => computedWidth + gap, [computedWidth, gap]);

  // recompute whether we can scroll left/right
  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const left = el.scrollLeft;
    const maxLeft = el.scrollWidth - el.clientWidth;

    setCanScrollLeft(left > 1);
    setCanScrollRight(left < maxLeft - 1);
  }, []);

  // initialize on mount and when image count changes
  useEffect(() => {
    updateScrollState();
  }, [updateScrollState, images.length, computedWidth]);

  useEffect(() => {
  const el = scrollerRef.current;
  if (!el) return;

  const handler = (e) => {
    if (e.ctrlKey) return;

    const absX = Math.abs(e.deltaX);
    const absY = Math.abs(e.deltaY);

    // если скролл не вертикальный — не вмешиваемся
    if (absY <= absX) return;

    const maxLeft = el.scrollWidth - el.clientWidth;
    if (maxLeft <= 0) return;

    const base =
      e.deltaMode === 1 ? e.deltaY * 16 :
      e.deltaMode === 2 ? e.deltaY * el.clientWidth :
      e.deltaY;

    const willConsume =
      (base < 0 && el.scrollLeft > 0) ||
      (base > 0 && el.scrollLeft < maxLeft);

    if (willConsume) {
      e.preventDefault(); // 🔥 ключевой момент
      el.scrollBy({ left: base * wheelScrollFactor, behavior: "auto" });
      updateScrollState();
    }
  };

  el.addEventListener("wheel", handler, { passive: false });

  return () => {
    el.removeEventListener("wheel", handler);
  };
}, [wheelScrollFactor, updateScrollState]);

  // arrow button scroll
  const scrollByCard = (direction) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };
// modal state helpers
  const openImage = openIndex == null ? null : images[openIndex];
  const canPrev = openIndex != null && openIndex > 0;
  const canNext = openIndex != null && openIndex < images.length - 1;

  const goPrev = () => setOpenIndex((i) => (i > 0 ? i - 1 : i));
  const goNext = () => setOpenIndex((i) => (i < images.length - 1 ? i + 1 : i));

  return (
    <>
      <div ref={wrapRef} className={styles.wrap}>
        <button
          type="button"
          className={`${styles.navBtn} ${styles.left}`}
          onClick={() => scrollByCard(-1)}
          disabled={!canScrollLeft}
        >
          ‹
        </button>

        <div
          ref={scrollerRef}
          className={styles.scroller}
          style={{ gap }}
          onScroll={updateScrollState}
          role="list"
          aria-label="Image gallery"
        >
          {images.map((img, index) => (
            <Card
              key={img.id ?? index}
              src={img.src}
              alt={img.alt}
              title={img.title}
              width={computedWidth}
              onClick={() => setOpenIndex(index)}
            />
          ))}
        </div>

        <button
          type="button"
          className={`${styles.navBtn} ${styles.right}`}
          onClick={() => scrollByCard(1)}
          disabled={!canScrollRight}
        >
          ›
        </button>
      </div>

      <Modal
        open={openIndex != null}
        image={openImage}
        onClose={() => setOpenIndex(null)}
        canPrev={canPrev}
        canNext={canNext}
        onPrev={goPrev}
        onNext={goNext}
      />
    </>
  );
}