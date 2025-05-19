import { BookCopy, BookMarked, BookOpen, Clock, Search, Users } from "lucide-react"
import { Link } from "react-router"
import { Card, CardContent } from "~/shared/components/ui/card"

const FeaturesSection = () => {
  return (
				<section className="w-full py-12 md:py-24 lg:py-32">
					<div className="container px-4 md:px-6">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
									USING THE LIBRARY
								</h2>
								<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
									Our library catalog system is designed to make finding and
									managing your reading materials effortless.
								</p>
							</div>
						</div>
						<div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
							<Card>
								<CardContent className="pt-6 duration-300 ease-in-out hover:scale-105">
									<div className="flex flex-col items-center space-y-2 text-center">
										<BookMarked className="h-12 w-12 text-primary" />
										<h3 className="text-xl font-bold">How To Borrow</h3>
										<p className="text-sm text-muted-foreground">
											Access thousands of books, journals, and digital resources
											across all genres and subjects.
										</p>
										<Link to="" className="text-primary underline">know more</Link>
									</div>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="pt-6 duration-300 ease-in-out hover:scale-105">
									<div className="flex flex-col items-center space-y-2 text-center">
										<Search className="h-12 w-12 text-primary" />
										<h3 className="text-xl font-bold">Advanced Search</h3>
										<p className="text-sm text-muted-foreground">
											Find exactly what you're looking for with powerful filters
											and search capabilities.
										</p>
										<Link to="" className="text-primary underline">know more</Link>
									</div>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="pt-6 duration-300 ease-in-out hover:scale-105">
									<div className="flex flex-col items-center space-y-2 text-center">
										<Users className="h-12 w-12 text-primary" />
										<h3 className="text-xl font-bold">
											Personalized Recommendations
										</h3>
										<p className="text-sm text-muted-foreground">
											Discover new books based on your reading history and
											preferences.
										</p>
										<Link to="" className="text-primary underline">know more</Link>
									</div>
								</CardContent>
							</Card>
							{/* <Card>
								<CardContent className="pt-6">
									<div className="flex flex-col items-center space-y-2 text-center">
										<BookCopy className="h-12 w-12 text-primary" />
										<h3 className="text-xl font-bold">Digital & Physical</h3>
										<p className="text-sm text-muted-foreground">
											Browse both digital and physical copies with real-time
											availability information.
										</p>
									</div>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="pt-6">
									<div className="flex flex-col items-center space-y-2 text-center">
										<Clock className="h-12 w-12 text-primary" />
										<h3 className="text-xl font-bold">Reservation System</h3>
										<p className="text-sm text-muted-foreground">
											Reserve books in advance and get notified when they become
											available.
										</p>
									</div>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="pt-6">
									<div className="flex flex-col items-center space-y-2 text-center">
										<BookOpen className="h-12 w-12 text-primary" />
										<h3 className="text-xl font-bold">Reading Lists</h3>
										<p className="text-sm text-muted-foreground">
											Create and manage personal reading lists to keep track of
											your literary journey.
										</p>
									</div>
								</CardContent>
							</Card> */}
						</div>
					</div>
				</section>
  )
}

export default FeaturesSection
