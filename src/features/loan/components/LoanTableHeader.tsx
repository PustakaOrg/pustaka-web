import React from 'react'
import { TableHead, TableHeader, TableRow } from '~/shared/components/ui/table'

const LoanTableHeader = () => {
  return (
			<TableHeader>
				<TableRow>
					<TableHead>Borrower</TableHead>
					<TableHead>Book</TableHead>
					<TableHead className="hidden md:table-cell">Issue Date</TableHead>
					<TableHead>Due Date</TableHead>
					<TableHead>Status</TableHead>
					<TableHead className="text-right">Actions</TableHead>
				</TableRow>
			</TableHeader>
  )
}

export default LoanTableHeader
