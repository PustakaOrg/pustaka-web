
import {
  BookIcon,
  Calendar,
  Hash,
  FileText,
  Package,
  MapPin,
  User,
  Building2,
  CheckCircle,
  AlertCircle,
  Copy,
} from "lucide-react"
import { useState } from "react"
import { Badge } from "~/shared/components/ui/badge"
import { Button } from "~/shared/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/shared/components/ui/dialog"
import { Separator } from "~/shared/components/ui/separator"
import { Book } from "~/types/entities/Book"


interface BookDetailDialogProps {
  book: Book 
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BookDetailDialog({ book, open, onOpenChange }: BookDetailDialogProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null)


  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(fieldName)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const stockStatus = book.available_stock > 0 ? "available" : "out-of-stock"
  const stockPercentage = (book.available_stock / book.stock) * 100

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[80vw]  max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <BookIcon className="h-6 w-6" />
            Book Details
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-6">
          {/* Book Cover */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={book.img || "/placeholder.svg?height=400&width=300"}
                  alt={`Cover of ${book.title}`}
                  className="w-full max-w-sm mx-auto rounded-lg shadow-lg border border-border"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant={stockStatus === "available" ? "default" : "destructive"} className="shadow-md">
                    {stockStatus === "available" ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <AlertCircle className="h-3 w-3 mr-1" />
                    )}
                    {stockStatus === "available" ? "Available" : "Out of Stock"}
                  </Badge>
                </div>
              </div>

              {/* Stock Information */}
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                  Stock Information
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Available:</span>
                    <span className="font-medium">{book.available_stock}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Stock:</span>
                    <span className="font-medium">{book.stock}</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        stockPercentage > 50 ? "bg-green-500" : stockPercentage > 20 ? "bg-yellow-500" : "bg-red-500"
                      }`}
                      style={{ width: `${Math.max(stockPercentage, 5)}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{stockPercentage.toFixed(1)}% available</p>
                </div>
              </div>
            </div>
          </div>

          {/* Book Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Basic Info */}
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-bold leading-tight">{book.title}</h1>
                {book.author && <p className="text-lg text-muted-foreground mt-1">by {book.author}</p>}
              </div>

              {/* Categories */}
              {book.category.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {book.category.map((cat) => (
                    <Badge key={cat} variant="outline" className="text-xs">
                      {cat}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <Separator />

            {/* Detailed Information */}
            <div className="grid grid-cols-1 gap-6">
              {/* Publication Details */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Publication Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-2">
                      <Hash className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">ISBN:</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">{book.isbn}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => copyToClipboard(book.isbn, "isbn")}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      {copiedField === "isbn" && <span className="text-xs text-green-600">Copied!</span>}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Published:</span>
                    </div>
                    <span className="font-medium">{book.publish_year}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Pages:</span>
                    </div>
                    <span className="font-medium">{book.pages}</span>
                  </div>

                  {book.publisher && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Publisher:</span>
                      </div>
                      <span className="font-medium">{book.publisher}</span>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Library Details */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Library Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-2">
                      <Hash className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Book ID:</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">{book.id}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => copyToClipboard(book.id, "id")}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      {copiedField === "id" && <span className="text-xs text-green-600">Copied!</span>}
                    </div>
                  </div>

                  {book.shelf && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Shelf Location:</span>
                      </div>
                      <Badge variant="secondary" className="font-mono">
                        {book.shelf}
                      </Badge>
                    </div>
                  )}

                  {book.author && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Author:</span>
                      </div>
                      <span className="font-medium">{book.author}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
