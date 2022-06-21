import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { fetchCFtrackingStatusById, fetchCrowdFundingById, updateStatus, verifyCrowdFund } from "../store/actions/crowdFundAction";
import Swal from 'sweetalert'


export default function UpdateTrackingForm() {
  const {id} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [trackingStat, setTrackingStat] =  useState({})
  const tracking = useSelector((state)=>state.crowdfunding.trackingStatus)
  const [formData, setFormData] = useState({
    status:"",
    description: "",
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
    const payload = {
      ...formData,
      CrowdFundingId : id
    }
    
    dispatch(updateStatus(payload))
      .then((res)=>{
        return res.json()
      })
      .then((data)=>{
        Swal({
          title: 'Tracking Status',
          text : "Tracking Status Updated Successfully",
          icon : 'success'
        })
        console.log(data)
      })
      .catch((err)=>{
        console.log(err)
      })

  }

  function goBack(e){
    e.preventDefault()
    navigate('/on-progress')
  }

  function handleReject(e){
    e.preventDefault()
    
  }

  useEffect(()=>{
    dispatch(fetchCFtrackingStatusById(id))
  },[])

  useEffect(()=>{
    setTrackingStat(tracking)
    const {status, description} = trackingStat
    setFormData({
      status : status? status:"",
      description: description? description:""
    })
  },[tracking])
  return (
    <div class="bg-grey-lighter flex flex-col">
      <div class="flex justify-between mb-4 px-2">
      <button
      class="bg-blue-500 hover:bg-blue-700 px-6 py-1 rounded-sm text-white"
      onClick={(event)=>{goBack(event)}}
      >Back</button>
      <button
      class=" hidden bg-red-500 hover:bg-red-600 px-6 py-1 rounded-sm text-white"
      onClick={(event)=>{handleReject(event)}}
      >Reject</button>
      </div>
      <div class="container  mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form class="bg-white px-8 mx-20 py-8 rounded shadow-md text-black w-full">
          <h1 class="mb-8 text-3xl text-center">Update Crowdfunding tracking status</h1>
          <div
            type="text"
            class="border border-grey-light w-full p-1 rounded mb-4 flex justify-center"
          >
            <p>current status : {trackingStat.status? trackingStat.status : "unnassigned"}</p>

          </div>
          <select
            name="status"
            className="block border border-grey-light w-full p-1 rounded mb-4"
            value={formData.status}
            onChange={(event) => changeVal(event)}
          >
            <option selected>Tracking Status</option>
              <option value={"on Delivery"}>on process</option>
              <option value={"on Delivery"}>on shipping</option>
              <option value={"on Delivery"}>arrived</option>
              <option value={"on Delivery"}>on delivery</option>
          </select>
          <textarea
            type="text"
            value={formData.description}
            onChange={(event) => changeVal(event)}
            class="block border border-grey-light w-full p-1 rounded mb-4 h-40"
            name="description"
            placeholder="Tracking Status Description"
          />
          <button
            type="submit"
            class="w-full text-center py-3 rounded bg-orange-600 text-white hover:bg-orange-800 focus:outline-none my-1"
            onClick={(event)=>{submitForm(event)}}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  )
}