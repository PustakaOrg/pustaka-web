import { useQuery } from '@tanstack/react-query'
import { BookListParams } from '../types/BookListParams'
import { getBooks } from '../api/getBooks'

const useBookList = (params?: BookListParams) => {
  const {
    data: bookList,
    isPending,
    isError,
    error
  } = useQuery({
    queryKey: ["books",params],
    queryFn: () => getBooks(params)
  })
  return { bookList, isPending, isError, error} 
}

export default useBookList
