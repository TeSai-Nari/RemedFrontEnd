const INITIAL_STATE = {
    id:[],
    nama: '',
    usia: '',
    pekerjaan: ''
}


export const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'ADD_TO_DATA':
            return {
                ...state,
                id: action.payload.id,
                nama: action.payload.nama,
                usia: action.payload.usia,
                pekerjaan: action.payload.pekerjaan
            }
        default:
            return INITIAL_STATE
    }
}