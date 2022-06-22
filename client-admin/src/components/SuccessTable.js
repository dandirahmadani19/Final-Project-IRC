import TableRow from "./TableRow";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState,us } from "react";
import { fetchCrowdFundings } from "../store/actions/crowdFundAction";
import SuccessTrow from "./SuccessTrow";
export default function SuccessTable() {
  const [localCf, setLocalCf] = useState([])
  const dispatch = useDispatch()
  const cfStore = useSelector((state)=> state.crowdfunding.crowdFunds)
  useEffect(()=>{
    dispatch(fetchCrowdFundings("Success"))
  },[])

  useEffect(()=>{
    setLocalCf(cfStore)
    console.log(cfStore)
  }, [cfStore])
  return (
  <div class="flex-col justify-center">
    <table class="w-full text-sm  text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-600 uppercase bg-orange-400 ">
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
          return <SuccessTrow cf={el} index={i + 1} key={el.id} />;
        })}
      </tbody>
    </table>
  </div>
  )
}
