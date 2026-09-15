/** Shelves are rendered in this order; labels live in the i18n dictionary. */
export const BOOK_SHELVES = ['europeanAmerican', 'russian', 'technical'] as const;

export type BookShelf = (typeof BOOK_SHELVES)[number];

export interface Book {
  readonly id: number;
  readonly author: string;
  readonly title: string;
  readonly shelf: BookShelf;
}

export interface BookShelfGroup {
  readonly shelf: BookShelf;
  readonly books: readonly Book[];
}

export interface BooksResponse {
  readonly books: readonly Book[];
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export function isBookShelf(value: unknown): value is BookShelf {
  return typeof value === 'string' && (BOOK_SHELVES as readonly string[]).includes(value);
}

export function isBook(value: unknown): value is Book {
  if (!isRecord(value)) return false;
  return (
    typeof value['id'] === 'number' &&
    typeof value['author'] === 'string' &&
    typeof value['title'] === 'string' &&
    isBookShelf(value['shelf'])
  );
}

export function parseBooksResponse(value: unknown): readonly Book[] {
  if (!isRecord(value) || !Array.isArray(value['books'])) {
    throw new TypeError('Malformed literature payload: expected { books: Book[] }');
  }
  return value['books'].filter(isBook);
}

/** Groups books by shelf in the canonical BOOK_SHELVES order and original list order, dropping empty shelves. */
export function groupByShelf(books: readonly Book[]): readonly BookShelfGroup[] {
  const groups = new Map<BookShelf, Book[]>();

  for (const book of books) {
    const bucket = groups.get(book.shelf);
    if (bucket) {
      bucket.push(book);
    } else {
      groups.set(book.shelf, [book]);
    }
  }

  return BOOK_SHELVES.filter((shelf) => groups.has(shelf)).map((shelf) => ({
    shelf,
    books: groups.get(shelf) ?? [],
  }));
}
