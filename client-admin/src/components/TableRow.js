import { useNavigate } from "react-router-dom";
import Swal from "sweetalert";
import { useDispatch } from "react-redux";
import { refundDeposit } from "../store/actions/crowdFundAction";
export default function TableRow({ index, cf }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function goToVerifyForm(e, id) {
    e.preventDefault();
    navigate(`verify/` + id);
  }

  function goToUpdate(e, id) {
    e.preventDefault();
    navigate(`/update/` + id);
  }

  function refund(e, id) {
    e.preventDefault();
    dispatch(refundDeposit(id))
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        Swal({
          title: 'Refund Success',
          text: data.message,
          icon: 'success'
        })
      })
    /* Swal("Refund Money to Crowdfunding participant ?", {
      icon: "info",
      buttons: ["Refund", "No"],
    }); */
  }
  return (
    <tr class="bg-white border-b text-gray-900 text-center">
      <td scope="row" class="px-6 py-4 font-medium  whitespace-nowrap">
        {index}
      </td>
      <td class="px-6 py-4 ">{cf.id}</td>
      <td class="px-6 py-4">{cf.productName}</td>
      <td class="px-6 py-4">{cf.manufactureName}</td>
      <td class="px-6 py-4">{cf.currentQuantity ? cf.currentQuantity : "-"}</td>
      <td class="px-6 py-4">{cf.targetQuantity ? cf.targetQuantity : "-"}</td>
      <td class="px-6 py-4">{cf.expiredDay ? cf.expiredDay : "-"}</td>
      <td class="px-6 py-4">{cf.status}</td>
      <td class="px-6 py-4 flex flex-col  my-auto">
        {cf.targetQuantity ? (
          cf.status == "Success" ? (
            <button
              class="font-medium text-white bg-green-500 py-1 px-3 rounded-sm  hover:bg-blue-700"
              onClick={(e) => {
                goToUpdate(e, cf.id);
              }}
            >
              Update
            </button>
          ) : cf.status == "Failed" ? (
            <button
              class="font-medium text-white bg-blue-500 py-1 px-3 rounded-sm  hover:bg-blue-700"
              onClick={(e) => {
                refund(e, cf.id);
              }}
            >
              Refund
            </button>
          ) : (
            <p class="bg-yellow-400 py-1 px-2 text-white rounded-sm">
              Verified
            </p>
          )
        ) : (
          <button
            class="font-medium text-white bg-blue-500 py-1 px-3 rounded-sm  hover:bg-blue-700"
            onClick={(e) => {
              goToVerifyForm(e, cf.id);
            }}
          >
            Verify
          </button>
        )}
      </td>
    </tr>
  );
}
