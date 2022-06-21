import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom";

export default function VerifyForm() {
  const {id} = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: '',
    categoryId: 0,
    mainImg: "",
    Images : {}
  });

  function changeVal(e) {
    const {value,name} = e.target
    console.log(name)
    setFormData({
      ...formData,
      [name] : value
    })
  }

  function submitForm(e){

  }

  function goBack(e){
    e.preventDefault()
    navigate('/')
  }
  return (
    <div class="bg-grey-lighter flex flex-col">
      <div class="flex justify-between mb-4 px-2">
      <button
      class="bg-blue-500 hover:bg-blue-700 px-6 py-1 rounded-sm text-white"
      onClick={(event)=>{goBack(event)}}
      >Back</button>
      <button
      class="bg-red-500 hover:bg-red-600 px-6 py-1 rounded-sm text-white"
      >Reject</button>
      </div>
      <div class="container  mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form class="bg-white px-4 mx-40 py-8 rounded shadow-md text-black w-full">
          <h1 class="mb-8 text-3xl text-center">Verify Form Crowdfunding </h1>
          <input
            type="text"
            value={formData.name}
            onChange={(event) => changeVal(event)}
            class="block border border-grey-light w-full p-1 rounded mb-4"
            name="productName"
            placeholder="Product Name"
          />
          <input
            type="number"
            value={formData.name}
            onChange={(event) => changeVal(event)}
            class="block border border-grey-light w-full p-1 rounded mb-4"
            name="productWeight"
            placeholder="Product Weight"
          />
          <input
            type="number"
            value={formData.description}
            onChange={(event) => changeVal(event)}
            class="block border border-grey-light w-full p-1 rounded mb-4"
            name="initialProductPrice"
            placeholder="Initial Product Price"
          />
          <input
            type="number"
            value={formData.price}
            onChange={(event) => changeVal(event)}
            class="block border border-grey-light w-full p-1 rounded mb-4"
            name="initialQuantity"
            placeholder="Initial Quantity"
          />
          <input
            type="text"
            value={formData.mainImg}
            onChange={(event) => changeVal(event)}
            class="block border border-grey-light w-full p-1 rounded mb-4"
            name="manufactureName"
            placeholder="Name of Manufacturer"
          />
          <input
            type="text"
            value={formData.Images.image1}
            /* onChange={(event) => changeImg(event)} */
            class="block border border-grey-light w-full p-1 rounded mb-4"
            name="linkProduct"
            placeholder="Product's link"
          />
          <input
            type="text"
            value={formData.Images.image2}
            /* onChange={(event) => changeImg(event)} */
            class="block border border-grey-light w-full p-1 rounded mb-4"
            name="productImage"
            placeholder="Product's Image"
          />
          <input
            type="text"
            value={formData.Images.image3}
            /* onChange={(event) => changeImg(event)} */
            class="block border border-grey-light w-full p-1 rounded mb-4"
            name="hscode"
            placeholder="hscode"
          />
          <input
            type="number"
            value={formData.Images.image3}
            /* onChange={(event) => changeImg(event)} */
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