"use client";

import { useCallback, useId, useMemo, useRef, useState } from "react";

import { ArticleCard } from "@/components/cards/article-card";
import type { ArticleMetadata } from "@/types/content";

const ITEMS_PER_PAGE = 15;

type BlogListProps = {
  articles: ArticleMetadata[];
  categories: string[];
};

export function BlogList({ articles, categories }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const listTopRef = useRef<HTMLDivElement>(null);
  const searchInputId = useId();
  const categorySelectId = useId();

  // Compute article counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const article of articles) {
      counts[article.category] = (counts[article.category] || 0) + 1;
    }
    return counts;
  }, [articles]);

  // Sort categories alphabetically
  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) => a.localeCompare(b));
  }, [categories]);

  // Filter articles based on category and search query
  const filteredArticles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const queryTokens = query ? query.split(/\s+/).filter(Boolean) : [];

    return articles.filter((article) => {
      // 1. Category check
      if (selectedCategory !== "all" && article.category !== selectedCategory) {
        return false;
      }

      // 2. Search query check
      if (queryTokens.length === 0) {
        return true;
      }

      const searchableText = [
        article.title,
        article.description,
        article.category,
        ...(article.tags || []),
        ...(article.topics || []),
      ]
        .join(" ")
        .toLowerCase();

      // All search tokens must appear in the searchable text
      return queryTokens.every((token) => searchableText.includes(token));
    });
  }, [articles, searchQuery, selectedCategory]);

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const pagedArticles = useMemo(() => {
    return filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredArticles, startIndex]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  const scrollToTop = useCallback(() => {
    if (listTopRef.current) {
      const topOffset = listTopRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: Math.max(0, topOffset), behavior: "smooth" });
    }
  }, []);

  const goToPage = (page: number) => {
    const targetPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(targetPage);
    scrollToTop();
  };

  // Generate pagination page numbers window
  const paginationRange = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "ellipsis")[] = [];
    const leftEdge = Math.max(2, safeCurrentPage - 1);
    const rightEdge = Math.min(totalPages - 1, safeCurrentPage + 1);

    pages.push(1);

    if (leftEdge > 2) {
      pages.push("ellipsis");
    }

    for (let i = leftEdge; i <= rightEdge; i++) {
      pages.push(i);
    }

    if (rightEdge < totalPages - 1) {
      pages.push("ellipsis");
    }

    pages.push(totalPages);
    return pages;
  }, [safeCurrentPage, totalPages]);

  const hasActiveFilters = searchQuery.trim() !== "" || selectedCategory !== "all";

  return (
    <div className="w-full">
      {/* Search and Category Filter Controls */}
      <section aria-label="Search and filter articles" className="mt-6 space-y-4">
        {/* Search Bar & Category Dropdown */}
        <div className="flex flex-col sm:flex-row gap-2.5 sm:items-center">
          {/* Search Input Container */}
          <div className="relative flex-1">
            <label htmlFor={searchInputId} className="sr-only">
              Search articles
            </label>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[var(--muted)]">
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <input
              id={searchInputId}
              type="search"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by topic, keyword, or title..."
              className="w-full rounded-md border border-[var(--line)] bg-[var(--surface)] py-2 pl-9 pr-9 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] transition-colors focus:border-[var(--control-line)] focus:bg-[var(--background)] focus:outline-hidden"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => handleSearchChange("")}
                aria-label="Clear search input"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
              >
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            ) : null}
          </div>

          {/* Category Filter Dropdown */}
          <div className="sm:w-56 shrink-0">
            <label htmlFor={categorySelectId} className="sr-only">
              Filter by category
            </label>
            <select
              id={categorySelectId}
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              aria-label="Filter by category"
              className="w-full rounded-md border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] transition-colors focus:border-[var(--control-line)] focus:bg-[var(--background)] focus:outline-hidden cursor-pointer"
            >
              <option value="all">All Categories ({articles.length})</option>
              {sortedCategories.map((category) => (
                <option key={category} value={category}>
                  {category} ({categoryCounts[category] || 0})
                </option>
              ))}
            </select>
          </div>
        </div>


        {/* Live Filter Summary & Reset Button */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-[var(--muted)] font-mono border-t border-[var(--line)]/50">
          <span>
            {filteredArticles.length === 0 ? (
              "No matching blogs"
            ) : (
              <>
                Showing {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, filteredArticles.length)} of {filteredArticles.length}{" "}
                {filteredArticles.length === 1 ? "blog" : "blogs"}
                {filteredArticles.length < articles.length ? ` (filtered from ${articles.length} total)` : ""}
              </>
            )}
          </span>
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={handleClearFilters}
              className="underline underline-offset-4 hover:text-[var(--foreground)] transition-colors cursor-pointer"
            >
              Clear filters
            </button>
          ) : null}
        </div>
      </section>

      {/* Target anchor for smooth scroll on pagination change */}
      <div ref={listTopRef} aria-hidden="true" className="-mt-4 pt-4" />

      {/* Articles Feed */}
      {filteredArticles.length > 0 ? (
        <section aria-labelledby="articles-list-heading" className="mt-8">
          <h2 className="sr-only" id="articles-list-heading">
            Technical writing
          </h2>
          <div className="divide-y divide-[var(--line)]">
            {pagedArticles.map((article) => (
              <ArticleCard article={article} headingLevel={2} key={article.slug} />
            ))}
          </div>

          {/* Pagination Navigation */}
          {totalPages > 1 ? (
            <nav
              aria-label="Blog pagination"
              className="mt-10 pt-6 border-t border-[var(--line)] flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-mono"
            >
              {/* Previous Button */}
              <button
                type="button"
                onClick={() => goToPage(safeCurrentPage - 1)}
                disabled={safeCurrentPage === 1}
                className="inline-flex items-center gap-1 rounded-md border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 text-[var(--foreground)] transition-colors hover:bg-[var(--surface-subtle)] hover:border-[var(--line-strong)] disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
              >
                ← Previous
              </button>

              {/* Page Number Buttons */}
              <div className="flex items-center gap-1">
                {paginationRange.map((item, index) => {
                  if (item === "ellipsis") {
                    return (
                      <span
                        key={`ellipsis-${index}`}
                        className="px-2 py-1 text-[var(--muted)] select-none"
                      >
                        …
                      </span>
                    );
                  }

                  const isCurrent = item === safeCurrentPage;
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => goToPage(item)}
                      aria-current={isCurrent ? "page" : undefined}
                      className={`min-w-8 h-8 rounded-md px-2 text-xs font-mono transition-colors cursor-pointer border ${
                        isCurrent
                          ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)] font-bold"
                          : "bg-[var(--surface)] text-[var(--foreground)] border-[var(--line)] hover:bg-[var(--surface-subtle)] hover:border-[var(--line-strong)]"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={() => goToPage(safeCurrentPage + 1)}
                disabled={safeCurrentPage === totalPages}
                className="inline-flex items-center gap-1 rounded-md border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 text-[var(--foreground)] transition-colors hover:bg-[var(--surface-subtle)] hover:border-[var(--line-strong)] disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
              >
                Next →
              </button>
            </nav>
          ) : null}
        </section>
      ) : (
        <div className="mt-12 rounded-lg border border-[var(--line)] bg-[var(--surface)]/50 p-8 text-center">
          <p className="text-sm font-semibold text-[var(--foreground)]">No articles match your criteria</p>
          <p className="mt-1 text-xs text-[var(--muted)]">
            Try adjusting your search terms or selecting a different category filter.
          </p>
          <button
            type="button"
            onClick={handleClearFilters}
            className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-[var(--line-strong)] bg-[var(--surface)] px-3.5 py-1.5 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--surface-subtle)] transition-colors cursor-pointer"
          >
            Reset all filters
          </button>
        </div>
      )}
    </div>
  );
}
