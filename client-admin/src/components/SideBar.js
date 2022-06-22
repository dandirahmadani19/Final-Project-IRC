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
      <h2 class="text-3xl font-semibold text-center text-orange-600">
        IRC cms
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
                >Success CF</span>
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