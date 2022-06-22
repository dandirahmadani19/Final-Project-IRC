import { useNavigate } from "react-router-dom"

export default function SuccessTrow({index,cf}){
  const navigate = useNavigate()
  function goToUpdate(e,id){
    e.preventDefault()
    navigate(`/update/`+id)
  }
  return(
    <tr class="bg-white border-b text-gray-900 text-center ">
      <td
        scope="row"
        class="px-6 py-4 font-medium  whitespace-nowrap"
      >
        {index}
      </td>
      <td class="px-6 py-4 ">{cf.id}</td>
      <td class="px-6 py-4">{cf.productName}</td>
      <td class="px-6 py-4">{cf.manufactureName}</td>
      <td class="px-6 py-4">{cf.currentQuantity}</td>
      <td class="px-6 py-4">{cf.targetQuantity}</td>
      <td class="px-6 py-4">{cf.expiredDay}</td>
      <td class="px-6 py-4">{cf.status}</td>
      <div class="px-6 py-4 flex justify-center items-center">
        <button
          class="font-medium text-white bg-blue-500 py-1 px-3 rounded-sm  hover:bg-blue-700"
          onClick={(e)=>{ goToUpdate(e,cf.id)}}
        >
          Update
        </button>
      </div>
    </tr>
  )
}