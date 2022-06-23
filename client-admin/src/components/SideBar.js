import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCrowdFundings } from "../store/actions/crowdFundAction";
export default function SideBar(){
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const logout = (e) => {
    e.preventDefault()
    navigate('/login')
  }

  function goToHome(e){
    e.preventDefault()
    dispatch(fetchCrowdFundings("Pending"))
    navigate('/')
  }
  function goToSuccess(e){
    e.preventDefault()
    dispatch(fetchCrowdFundings("Success"))
    navigate('/on-progress')
  }
  return (
    <div class="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto border-r">
      <h2 class="text-3xl font-semibold text-center text-green-700">
        IRC CMS
      </h2>
      <div class="flex flex-col justify-between mt-6">
        <aside>
          <ul>
            <li>
              <div
                class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>

                <span class="mx-4 text-sm"
                onClick={(event)=>{goToHome(event)}}
                >Dasboard</span>
              </div>
            </li>
            <li>
              <div
                class="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md hover:bg-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                class="w-4 h-4 mr-2"
                ><path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"/></svg>
                <span class="mx-2 text-sm"
                onClick={(event)=>{goToHome(event)}}
                >Crowdfundings</span>
              </div>
            </li>
            <li>
              <div
                class="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md hover:bg-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                class="w-4 h-4 mr-2"
                ><path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"/></svg>
                <span class="mx-2 text-sm"
                //onClick={(event)=>{goToSuccess(event)}}
                >Rejected List</span>
              </div>
            </li>
            <li>
              <div
                class="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md hover:bg-gray-200"
              >
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-4 h-4 mr-2"><path d="M64 400C64 408.8 71.16 416 80 416H480C497.7 416 512 430.3 512 448C512 465.7 497.7 480 480 480H80C35.82 480 0 444.2 0 400V64C0 46.33 14.33 32 32 32C49.67 32 64 46.33 64 64V400zM342.6 278.6C330.1 291.1 309.9 291.1 297.4 278.6L240 221.3L150.6 310.6C138.1 323.1 117.9 323.1 105.4 310.6C92.88 298.1 92.88 277.9 105.4 265.4L217.4 153.4C229.9 140.9 250.1 140.9 262.6 153.4L320 210.7L425.4 105.4C437.9 92.88 458.1 92.88 470.6 105.4C483.1 117.9 483.1 138.1 470.6 150.6L342.6 278.6z"/></svg>
                <span class="mx-2 text-sm"
                //onClick={(event)=>{goToSuccess(event)}}
                >Reports</span>
              </div>
            </li>
            <li>
              <div
                class="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md hover:bg-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-4 h-4 mr-2"><path d="M256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C201.7 512 151.2 495 109.7 466.1C95.2 455.1 91.64 436 101.8 421.5C111.9 407 131.8 403.5 146.3 413.6C177.4 435.3 215.2 448 256 448C362 448 448 362 448 256C448 149.1 362 64 256 64C202.1 64 155 85.46 120.2 120.2L151 151C166.1 166.1 155.4 192 134.1 192H24C10.75 192 0 181.3 0 168V57.94C0 36.56 25.85 25.85 40.97 40.97L74.98 74.98C121.3 28.69 185.3 0 255.1 0L256 0zM256 128C269.3 128 280 138.7 280 152V246.1L344.1 311C354.3 320.4 354.3 335.6 344.1 344.1C335.6 354.3 320.4 354.3 311 344.1L239 272.1C234.5 268.5 232 262.4 232 256V152C232 138.7 242.7 128 256 128V128z"/></svg>
                <span class="mx-2 text-sm"
                //onClick={(event)=>{goToSuccess(event)}}
                >History</span>
              </div>
            </li>
            <li>
              <div
                class="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md hover:bg-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-4 h-4 mr-2"><path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"/></svg>
                <span class="mx-2 text-sm"
                //onClick={(event)=>{goToSuccess(event)}}
                >Register Admin</span>
              </div>
            </li>
            <li>
              <a
                class="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md hover:bg-gray-200"
                href=""
              >
               
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                class="w-4 h-4"
                ><path d="M96 480h64C177.7 480 192 465.7 192 448S177.7 416 160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64C177.7 96 192 81.67 192 64S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256C0 437 42.98 480 96 480zM504.8 238.5l-144.1-136c-6.975-6.578-17.2-8.375-26-4.594c-8.803 3.797-14.51 12.47-14.51 22.05l-.0918 72l-128-.001c-17.69 0-32.02 14.33-32.02 32v64c0 17.67 14.34 32 32.02 32l128 .001l.0918 71.1c0 9.578 5.707 18.25 14.51 22.05c8.803 3.781 19.03 1.984 26-4.594l144.1-136C514.4 264.4 514.4 247.6 504.8 238.5z"/></svg>
                <span class="mx-4 text-sm"
                onClick={(event)=>{logout(event)}}
                >Logout</span>
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  )
}