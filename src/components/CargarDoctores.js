import React, { Component } from 'react'
import Global from '../Global';
import axios from 'axios';

export default class CargarDoctores extends Component {

    cajaOption = React.createRef();
    cajaInput = React.createRef();

    state = {
        doctores: [],
        status: false,
        especialidades:[],
        status1:false
    }

    
    muestraEspecialidad=()=>{
        var request = 'api/Doctores/Especialidades';
        var url = Global.urlDoctores + request;
        axios.get(url).then(response => {
            this.setState({
                especialidades: response.data,
                status: true
            })
        })
    }
    
    cargarDoctores = (e) => {
        e.preventDefault();
        var especialidad = this.cajaOption.current.value;
        var incremento = parseInt(this.cajaInput.current.value);
        var data={
            salario : this.state.doctores.salario+incremento,
        }
        var request = '/api/Doctores/DoctoresEspecialidad/'+especialidad;
        var url = Global.urlDoctores + request;
        axios.get(url).then(response=>{
            this.setState({
                especialidades:especialidad,
                status1:true
            })
        })
    }


    componentDidMount = () => {
        this.muestraEspecialidad();
    }

    componentDidUpdate=(oldProps)=>{
        if (oldProps.especialidad != this.props.especialidad) {
            this.cargarDoctores();
        }
    }
    render() {
        return (
            <div>
                <h1>Incremento salarial doctores</h1>
                <form>
                    <select ref={this.cajaOption} onChange={this.incrementarEspecialidad}>
                        {
                            this.state.especialidades.map((especialidades,index)=>{
                                return(
                                    <option key={index}>{especialidades}</option>
                                )
                            })
                        }
                    </select><br/>
                    <label>Incremento salarial</label>
                    <input type="text" ref={this.cajaInput}/><br/>
                    <button>Incrementar salario</button>
                </form>
                <table border={"1px"} align={"center"}>
                    <thead>
                        <th>Apellido</th>
                        <th>Especialidad</th>
                        <th>Salario</th>
                    </thead>
                    <tbody>
                        {
                            this.state.doctores.map((doctores, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{doctores.apellido}</td>
                                        <td>{doctores.especialidad}</td>
                                        <td>{doctores.salario}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
