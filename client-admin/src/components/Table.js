import TableRow from "./TableRow";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState,us } from "react";
import { fetchCrowdFundings } from "../store/actions/crowdFundAction";
export default function Table() {
  const [localCf, setLocalCf] = useState([])
  const dispatch = useDispatch()
  const cfStore = useSelector((state)=> state.crowdfunding.crowdFunds)
  useEffect(()=>{
    dispatch(fetchCrowdFundings("Pending"))
  },[])

  useEffect(()=>{
    setLocalCf(cfStore)
    console.log(cfStore)
  }, [cfStore])
  return (
  <div class="flex-col justify-center">
    <div class="flex flex-col gap-2 mb-4">
    <h1 class="text-4xl">Dashboard</h1>
    <div class="bg-green-200 h-10 rounded-md flex items-center justify-between">
    <p class="p-2 text-green-700 font-semibold">Hello admin, Welcome to dashboard. Please verify and update crowdfundings</p>
    <svg xmlns="http://www.w3.org/2000/svg" class="h-2 w-6 mr-2" viewBox="0 0 384 512"><path d="M376.6 427.5c11.31 13.58 9.484 33.75-4.094 45.06c-5.984 4.984-13.25 7.422-20.47 7.422c-9.172 0-18.27-3.922-24.59-11.52L192 305.1l-135.4 162.5c-6.328 7.594-15.42 11.52-24.59 11.52c-7.219 0-14.48-2.438-20.47-7.422c-13.58-11.31-15.41-31.48-4.094-45.06l142.9-171.5L7.422 84.5C-3.891 70.92-2.063 50.75 11.52 39.44c13.56-11.34 33.73-9.516 45.06 4.094L192 206l135.4-162.5c11.3-13.58 31.48-15.42 45.06-4.094c13.58 11.31 15.41 31.48 4.094 45.06l-142.9 171.5L376.6 427.5z"/></svg>
    </div>
    </div>
    <table class="w-full text-sm  text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-600 uppercase bg-green-400 ">
        <tr>
          <th scope="col" class="px-6 py-3">
            No
          </th>
          <th scope="col" class="px-6 py-3">
            CFID
          </th>
          <th scope="col" class="px-18 py-3">
            Product Name
          </th>
          <th scope="col" class="px-6 py-3">
            Manufacturer
          </th>
          <th scope="col" class="px-4 py-3">
            current QTY
          </th>
          <th scope="col" class="px-6 py-3">
            target QTY
          </th>
          <th scope="col" class="px-6 py-3">
            expired date
          </th>
          <th scope="col" class="px-6 py-3 ">
            status
          </th>
          <th scope="col" class="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {/* <TableRow/> */}
        {localCf.map((el, i) => {
          return <TableRow cf={el} index={i + 1} key={el.id} />;
        })}
      </tbody>
    </table>
  </div>
  )
}
