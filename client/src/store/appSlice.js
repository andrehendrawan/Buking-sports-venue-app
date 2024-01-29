import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const appSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
        venues: [],
        news: [],
        venue: {},
        orders: []

    },
    reducers: {
        increment: state => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        },
        fetchVenuesSuccess: (state, action) => {
            state.venues = action.payload
        },
        fetchNewsSuccess: (state, action) => {
            state.news = action.payload
        },
        fetchVenueByIdSuccess: (state, action) => {
            state.venue = action.payload
        },
        fetchOrdersSuccess: (state, action) => {
            state.orders = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const {
    increment,
    decrement,
    fetchVenuesSuccess,
    fetchNewsSuccess,
    fetchVenueByIdSuccess,
    fetchOrdersSuccess
} = appSlice.actions

//thunk
export function fetchVenues() {
    return async function fetchVenuesThunk(dispatch) {
        try {
            const { data } = await axios({
                method: "get",
                url: `${import.meta.env.VITE_BASE_URL}/venues`,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                },
            });

            dispatch(fetchVenuesSuccess(data))
        } catch (error) {
            console.log(error);
        }
    }
}

export function fetchNews() {
    return async function fetchNewsThunk(dispatch) {
        try {
            const { data } = await axios({
                method: "get",
                url: `${import.meta.env.VITE_BASE_URL}/news`,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                },
            });
            dispatch(fetchNewsSuccess(data))
        } catch (error) {
            console.log(error);
        }
    }
}

export function fetchVenueById(params) {
    return async function fetchVenueByIdThunk(dispatch) {
        try {
            const { data } = await axios({
                method: "get",
                url: `${import.meta.env.VITE_BASE_URL}/venues/detail/` + params.id,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                },
            });
            dispatch(fetchVenueByIdSuccess(data))
        } catch (error) {
            console.log(error);
        }
    }
}

export function fetchOrders(params) {
    return async function fetchOrdersThunk(dispatch) {
        try {
            const { data } = await axios({
                method: 'get',
                url: `${import.meta.env.VITE_BASE_URL}/order/history/${params.id}`,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                },
            })
            dispatch(fetchOrdersSuccess(data))
        } catch (error) {
            console.log(error);
        }
    }
}

export default appSlice.reducer