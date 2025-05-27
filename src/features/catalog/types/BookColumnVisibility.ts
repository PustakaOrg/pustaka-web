export interface ColumnVisibility {
  image: boolean
  title: boolean
  isbn: boolean
  author: boolean
  publisher: boolean
  categories: boolean
  pages: boolean
  year: boolean
  stock: boolean
  shelf: boolean
}

export const defaultColumnVisibility: ColumnVisibility = {
  image: true,
  title: true,
  isbn: true,
  author: true,
  publisher: true,
  categories: true,
  pages: true,
  year: true,
  stock: true,
  shelf: true,
}
