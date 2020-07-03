import React,{Component} from 'react'
import { Table,Input,Button } from 'reactstrap';
import Axios from 'axios'
import {API_URL} from './../supports/ApiUrl'

class Home extends Component{

    state = {
        id: '',
        nama: '',
        usia: '',
        pekerjaan: ''
    }
    componentDidMount(){
        Axios
        .get(API_URL+'/users')
        .then(res=>this.setState({data:res.data}))
        .catch(err=>console.log(err))
    }
    AddToData= () => {
        let {id, nama, usia, pekerjaan} = this.state
        Axios
        .post(API_URL+'/users', {id,nama,usia,pekerjaan})
        .then((res) => {
            Axios
            .get(API_URL+'/users')
            .then(res => console.log(res.data))
        })
        .catch((err) => console.log(err))
    }
    deleteData = (id) => {
        Axios
        .delete(API_URL+`/users/${id}`)
        .then(() => {
            Axios
            .get(API_URL+'/users')
            .then(res => this.setState({data: res.data}))
        })
        .catch(err => console.log(err))
    }

    editData = (id) => {
        this.setState({selectedId: id})
        console.log(this.state.selectedId)
    }

    confirmEdit = (id) => {
        var namaedit = this.namaedit.value;
        var usiaedit = this.usiaedit.value;
        var pekerjaanedit = this.pekerjaanedit.value;
        Axios.put(API_URL+`/users/${id}`,{
            nama: namaedit,
            usia: usiaedit,
            pekerjaan: pekerjaanedit
        })
        .then(() => {
            Axios
            .get(API_URL+'/users')
            .then(res => this.setState({data: res.data, selectedId: null}))
        })
        .catch(err => console.log(err))
    }
    renderUserData = () => {
        return this.state.data.map((val, index) => {
            if(this.state.selectedId === val.id){
                return(
                    <tr key={val.id}>
                        <td></td>
                        <td>
                            <Input type="text" innerRef={(namaedit) => this.namaedit = namaedit}/>
                        </td>
                        <td>
                            <Input type="text" innerRef={(usiaedit) => this.usiaedit = usiaedit}/>
                        </td>
                        <td>
                            <Input type="text" innerRef={(pekerjaanedit) => this.pekerjaanedit = pekerjaanedit}/>
                        </td>
                        <td><Button color='primary' onClick={() => this.confirmEdit(val.id)}>Confirm</Button></td>
                        <td><Button color='secondary' onClick={() => this.setState({selectedId: null})}>Cancel</Button></td>
                    </tr>
                )
            }
            return(
                <tr key={val.id}>
                  <th scope="row">{index+1}</th>
                  <td>{val.nama}</td>
                  <td>{val.usia}</td>
                  <td>{val.pekerjaan}</td>
                  <td><Button color='success' onClick={() => this.editData(val.id)}>Edit</Button></td>
                  <td><Button color='danger' onClick={() => this.deleteData(val.id)}>Delete</Button></td>
                </tr>
            )
        })
    }


    render(){
        return(
            <div>
                <h1>SOAL 1</h1>
                <div className='row'>
                    <div className='col-md-4 mb-4'>
                        <select className='form-control'>
                            <option>Filter By Pekerjaan</option>
                            <option value='usia'>Filter by Usia</option>
                        </select>
                    </div>
                </div>
                <table className='table mb-4'>
                    <thead>
                        <tr>
                            <td>Nama</td>
                            <td>Usia</td>
                            <td>Pekerjaan</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>   
                        </tr>
                    </tbody>
                </table>
                <div className='row'>
                    <div className='col-md-3'> <input type='text' className='form-control' placeholder='Nama' /> </div>
                    <div className='col-md-3'> <input type='text' className='form-control' placeholder='Usia' /> </div>
                    <div className='col-md-3'> <input type='text' className='form-control' placeholder='Pekerjaan' /> </div>
                    <div className='col-md-3'> <input type='button' className='form-control btn-info' value='add Data' onClick={this.AddToData()} /> </div>
                </div>
            </div>
        )
    }

}


export default Home;