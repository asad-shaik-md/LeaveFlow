"use client"

const LeaveRequest = () => {
  return (
    <div className='max-w-[400px] p-10 m-[35px] flex flex-col gap-4 border-[#D7DEDD] border-[1px] font-[family-name:var(--font-outfit)]'>
        <h1 className="text-center text-2xl font-semibold text-[#5A67BA]">Leave Request Form</h1>
        <hr className="h-[0] w-auto border-[1] bg-[#D7DEDD]" />

        <form>
            <div className="mt-4">
              <label htmlFor="name" className="block text-[12px] ">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Joe"
                className="w-full border-black border-b mt-1 p-2 focus:outline-none"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="employeeID" className="block text-[12px] ">
                Employee ID
              </label>
              <input
                id="employeeID"
                type="number"
                placeholder="12345"
                className="w-full border-black border-b mt-1 p-2 focus:outline-none"
              />
            </div>
            
            <div className="mt-4">
              <label htmlFor="leaveType" className="block text-[12px] ">
                Leave Type
              </label>
              <select
                id="leaveType"
                className="w-full border-black border-b mt-1 p-2 focus:outline-none"
              >
                <option value="">Choose the Type</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Causal Leave">Causal Leave</option>
                <option value="Vaction Leave">Vaction Leave</option>
              </select>
            </div>

            <div className="mt-4">
              <label htmlFor="startDate" className="block text-[12px] ">
                Start Date
              </label>
              <input
                id="startDate"
                type="date"
                defaultValue="20-10-2021"
                className="w-full border-black border-b mt-1 p-2 focus:outline-none"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="endDate" className="block text-[12px] ">
                End Date
              </label>
              <input
                id="endDate"
                type="date"
                placeholder=""
                className="w-full border-black border-b mt-1 p-2 focus:outline-none"
              />
            </div>
            
            <div className="mt-4">
              <label htmlFor="reason" className="block text-[12px] ">
                Reason
              </label>
              <input
                id="reason"
                type="text"
                placeholder="Optional"
                className="w-full border-black border-b mt-1 p-2 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full h-[40px] bg-[#5A67BA] hover:bg-[#4C5490] text-white my-4"
            >
              Submit
            </button>
          </form>
    </div>
  )
}

export default LeaveRequest