import CategoryFilter from '@/components/shared/CategoryFilter'
import EventCard from '@/components/shared/EventCard'
import Pagination from '@/components/shared/Pagination'
import SearchBar from '@/components/shared/SearchBar'
import { Button } from '@/components/ui/button'
import { fetchAllCategories } from '@/lib/database/actions/category.action'
import { fetchAllEvents } from '@/lib/database/actions/event.action'
import { searchParamsType } from '@/types'
import { currentUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home({searchParams}: {searchParams: searchParamsType}) {
  const user = await currentUser()
  const searchCategory = searchParams.category
  const searchFilter = searchParams.filter
  const searchPage = Number(searchParams.page)
  const fetchEventsParam = searchCategory ? 
  {
    currentPageNumber: searchPage ? searchPage : 1, 
    pageSize: 2, 
    categoryType: searchCategory,
    searchParam: searchFilter ? searchFilter : ""
  } : 
  {
    currentPageNumber: searchPage ? searchPage : 1, 
    pageSize: 2, 
    searchParam: searchFilter ? searchFilter : ""
  }
  const allCategories = await fetchAllCategories()
  const eventsData = await fetchAllEvents(fetchEventsParam)
  const events = eventsData.displayedEvents
  const isNext = eventsData.isNext
  const totalEventsAmount = eventsData.totalEventsNumber
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className='flex flex-col justify-center gap-8'>
            <h1 className='h1-bold'>
              Host, Connect, Celebrate: Your Events, Our Platform!
            </h1>
            <p className='p-regular-20 md:p-regular-24'>Book and learn helpful tips from 3,168+ mentors in world-class companies with our global community.</p>
            <Button className="button w-fit md:w-full">
              <Link href="#events">
                Explore Now
              </Link>
            </Button>
          </div>

          <Image 
            src="/assets/images/hero.png" 
            alt="hero image"
            height={1000}
            width={1000}  
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"        
          />
        </div>
      </section>

      <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Trust by <br/> Thousands of Events</h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <SearchBar />
          <CategoryFilter 
            categories={allCategories}
           />
        </div>
        <div>
          {
            events.length > 0 ? 
            <div className="flex flex-col gap-10">
              <div className="flex w-full flex-col gap-6 md:flex-row md:flex-wrap">
                {
                  events.map((event) => (
                    <EventCard 
                      currentUserId={user?.id || ""}
                      key={event._id}
                      objectId={event._id} 
                      imageUrl={event.imageUrl} 
                      isFree={event.isFree} 
                      price={event.price} 
                      category={event.category} 
                      startTime={event.startTime} 
                      title={event.title} 
                      organizer={event.createdBy}                  
                    />
                  ))
                }
              </div>
              <Pagination 
                  pageIndexName="page"
                  pageNumber={searchPage ? searchPage : 1}
                  isNext={isNext}
                  currentPath={"/"}
                  totalPageNumber={totalEventsAmount / fetchEventsParam.pageSize}               
              />
            </div>    
            :
            <p className="no-result">No threads founded</p>
          }
        </div>
      </section>
    </>
  )
}
