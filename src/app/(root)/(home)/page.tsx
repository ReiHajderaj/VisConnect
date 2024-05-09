import MeetingTypeList from "@/components/MeetingTypeList";


const Home = () => {

    const now = new Date();

    const time = now.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});

    const date = (new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full'
    })).format(now);

    return (
        <div className="flex size-full flex-col gap-10 text-white">
            <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
                <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11 ">
                    <h2 className="bg-[rgba(255,255,255,0.15)] backdrop-blur-[4px] p-1 max-w-[270px] rounded text-center text-base font-normal">Upcoming Meating At 12:30</h2>
                    
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-extrabold lg:text-7xl">
                            {time}
                        </h1>
                        <p className="text-lg font-medium lg:text-2xl">{date}</p>
                    </div>
                </div>
            </div>

            <MeetingTypeList />

            
        </div>
    )
}
export default Home;