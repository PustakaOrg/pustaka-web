export interface BookColumnVisibility {
  book: boolean
  isbn: boolean
  publisher: boolean
  categories: boolean
  pages: boolean
  year: boolean
  stock: boolean
  shelf: boolean
}

export const defaultColumnVisibility: BookColumnVisibility = {
  book: true,
  isbn: true,
  publisher: true,
  categories: true,
  pages: true,
  year: true,
  stock: true,
  shelf: true,
}
