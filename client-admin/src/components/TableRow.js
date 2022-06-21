import { useNavigate } from "react-router-dom"

export default function TableRow({index,crowdFund}){
  const navigate = useNavigate()
  function goToVerifyForm(e,id){
    e.preventDefault()
    navigate(`verify/`+id)
  }
  return(
    <tr class="bg-white border-b text-gray-900 text-center">
      <td
        scope="row"
        class="px-6 py-4 font-medium  whitespace-nowrap"
      >
        1
        {index}
      </td>
      <td class="px-6 py-4 ">ini apa</td>
      <td class="px-6 py-4">ini apa</td>
      <td class="px-6 py-4">ini apa</td>
      <td class="px-6 py-4">ini apa</td>
      <td class="px-6 py-4">ini apa</td>
      <td class="px-6 py-4">ini apa</td>
      <td class="px-6 py-4">ini apa</td>
      <td class="px-6 py-4 flex flex-col justify-center items-center">
        <button
          class="font-medium text-white bg-blue-500 py-1 px-3 rounded-sm  hover:bg-blue-700"
          onClick={(e)=>{ goToVerifyForm(e,1)}}
        >
          verify
        </button>
      </td>
    </tr>
  )
}