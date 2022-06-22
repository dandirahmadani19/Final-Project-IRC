import { useNavigate } from "react-router-dom"

export default function TableRow({index,cf}){
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
        {index}
      </td>
      <td class="px-6 py-4 ">{cf.id}</td>
      <td class="px-6 py-4">{cf.productName}</td>
      <td class="px-6 py-4">{cf.manufactureName}</td>
      <td class="px-6 py-4">{cf.currentQuantity? cf.currentQuantity:"-"}</td>
      <td class="px-6 py-4">{cf.targetQuantity? cf.targetQuantity:"-"}</td>
      <td class="px-6 py-4">{cf.expiredDay? cf.expiredDay:"-"}</td>
      <td class="px-6 py-4">{cf.status}</td>
      <div class="px-6 py-4 flex flex-col  my-auto">
        {cf.targetQuantity? <p
        class="bg-green-400 py-1 px-2 text-white rounded-sm"
        >verified</p> : <button
          class="font-medium text-white bg-blue-500 py-1 px-3 rounded-sm  hover:bg-blue-700"
          onClick={(e)=>{ goToVerifyForm(e,cf.id)}}
        >
          verify
        </button> 
        
        }
      </div>
    </tr>
  )
}