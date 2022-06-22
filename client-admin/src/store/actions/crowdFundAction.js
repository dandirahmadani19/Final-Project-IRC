import { api } from "../../api";

export function setCrowdFundings(payload) {
  return {
    type: 'setCrowdfundings',
    payload: payload
  }
}

export function setSpesificCrowdFund(payload) {
  return {
    type: 'setSpesificCrowdFund',
    payload: payload
  }
}

export function setTrackingStat(payload) {
  return {
    type: 'setTrackingStatus',
    payload: payload
  }
}

export function fetchCrowdFundings(status) {
  return (dispatch, getState) => {
    fetch(api + `crowdFund/admin?status=` + status)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        dispatch(setCrowdFundings(data))
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export function fetchCrowdFundingById(id) {
  return (dispatch, getState) => {
    fetch(api + `crowdFund/detail/` + id)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        dispatch(setSpesificCrowdFund(data))
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export function fetchCFtrackingStatusById(id) {
  return (dispatch, getState) => {
    fetch(api + `status/` + id)
      .then((res) => {
        console.log(res)
        return res.json()
      })
      .then((data) => {
        //console.log(data.data, "dasdasd")
        const sortTrackingStatus = data.data.sort((b, a) => b.createdAt - a.createdAt)
        dispatch(setTrackingStat(sortTrackingStatus[sortTrackingStatus.length - 1]))
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export function verifyCrowdFund(id, data) {
  return (dispatch, getState) => {
    return fetch(api + "crowdFund/verif/" + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }
}

export function updateStatus(data) {
  return (dispatch, getState) => {
    return fetch(api + "status", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }
}

export function refundDeposit(id) {
  return (dispatch, getState) => {
    return fetch(api + "balance/refund/" + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

  export function rejectCrowdFund(id) {
    return (dispatch, getState) => {
      return fetch(api + `crowdFund/deny/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
      })
    }
  }

