import LeaveRequest from "@/app/components/LeaveRequest"

const Dashboard = () => {
  return (
    <div className='min-h-screen w-full flex justify-center items-center px-4 sm:px-6 lg:px-8'>
    <div className='w-full max-w-[500px]'>
      <LeaveRequest />
    </div>
  </div>
  )
}

export default Dashboard