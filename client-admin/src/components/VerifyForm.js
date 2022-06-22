import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { fetchCrowdFundingById, verifyCrowdFund } from "../store/actions/crowdFundAction";
import Swal from 'sweetalert'


export default function VerifyForm() {
  const {id} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [cfObj, setCfObj] =  useState({})
  const cf = useSelector((state)=>state.crowdfunding.crowdFund)
  const [formData, setFormData] = useState({
    productName: "",
    initialProductPrice: "",
    productWeight: "",
    initialQuantity: '',
    categoryId: "",
    manufactureName: "",
    Images : {},
    linkProduct :"",
    productImage:'',
    hscode:'',
    expiredDay:''
  });

  function changeVal(e) {
    const {value,name} = e.target
    setFormData({
      ...formData,
      [name] : value
    })
  }

  function submitForm(e){
    e.preventDefault()
    console.log(formData)
    dispatch(verifyCrowdFund(id, formData))
      .then((res)=>{
        return res.json()
      })
      .then((data)=>{
        Swal({
          title: 'Crowdfunding Verified',
          text : data.message,
          icon : 'success'
        })
        navigate('/')
      })
      .catch((err)=>{
        console.log(err)
      })

  }

  function goBack(e){
    e.preventDefault()
    navigate('/')
  }

  function handleReject(e){
    e.preventDefault()
    console.log("asd")
    Swal("Reject This Crowdfunding", {
      icon:"info",
      buttons: ["Reject", "No"],
    });
  }

  useEffect(()=>{
    dispatch(fetchCrowdFundingById(id))
  },[])

  useEffect(()=>{
    setCfObj(cf)
    setFormData({
      productName: cf.productName,
      initialProductPrice: cf.initialProductPrice,
      initialQuantity: cf.initialQuantity,
      manufactureName: cf.manufactureName,
      linkProduct :cf.linkProduct,
      productWeight: "",
      productImage:'',
      hscode:'',
      expiredDay:''
    })
  },[cf])
  return (
    <div class="bg-grey-lighter flex flex-col">
      <div class="flex justify-between mb-4 px-2">
      <button
      class="bg-blue-500 hover:bg-blue-700 px-6 py-1 rounded-sm text-white"
      onClick={(event)=>{goBack(event)}}
      >Back</button>
      <button
      class="bg-red-500 hover:bg-red-600 px-6 py-1 rounded-sm text-white"
      onClick={(event)=>{handleReject(event)}}
      >Reject</button>
      </div>
      <div class="container  mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form class="bg-white px-4 mx-40 py-8 rounded shadow-md text-black w-full">
          <h1 class="mb-8 text-3xl text-center">Verify Form Crowdfunding </h1>
          <input
            type="text"
            value={formData.productName}
            onChange={(event) => changeVal(event)}
            class="block border border-grey-light w-full p-1 rounded mb-4"
            name="productName"
            placeholder="Product Name"
          />
          <input
            type="number"
            value={formData.initialProductPrice}
            onChange={(event) => changeVal(event)}
            class="block border border-grey-light w-full p-1 rounded mb-4"
            name="initialProductPrice"
            placeholder="Initial Product Price"
          />
          <input
            type="number"
            value={formData.initialQuantity}
            onChange={(event) => changeVal(event)}
            class="block border border-grey-light w-full p-1 rounded mb-4"
            name="initialQuantity"
            placeholder="Initial Quantity"
          />
          <input
            type="text"
            value={formData.manufactureName}
            onChange={(event) => changeVal(event)}
            class="block border border-grey-light w-full p-1 rounded mb-4"
            name="manufactureName"
            placeholder="Manufacturer's name"
          />
          <input
            type="text"
            value={formData.linkProduct}
            onChange={(event) => changeVal(event)}
            class="block border border-grey-light w-full p-1 rounded mb-4"
            name="linkProduct"
            placeholder="Product's link"
          />
          <input
            type="number"
            value={formData.productWeight}
            onChange={(event) => changeVal(event)}
            class="block border border-grey-light w-full p-1 rounded mb-4"
            name="productWeight"
            placeholder="Product Weight"
          />
          <input
            type="text"
            value={formData.productImage}
            onChange={(event) => changeVal(event)}
            class="block border border-grey-light w-full p-1 rounded mb-4"
            name="productImage"
            placeholder="Product's Image"
          />
          <input
            type="text"
            value={formData.hscode}
            onChange={(event) => changeVal(event)}
            class="block border border-grey-light w-full p-1 rounded mb-4"
            name="hscode"
            placeholder="hscode"
          />
          <input
            type="number"
            value={formData.expiredDay}
            onChange={(event) => changeVal(event)}
            class="block border border-grey-light w-full p-1 rounded mb-4"
            name="expiredDay"
            placeholder="Expired Day"
          />
          <button
            type="submit"
            class="w-full text-center py-3 rounded bg-orange-600 text-white hover:bg-orange-800 focus:outline-none my-1"
            onClick={(event)=>{submitForm(event)}}
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  )
}