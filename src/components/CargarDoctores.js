import React, { Component } from 'react'
import Global from '../Global';
import axios from 'axios';
import Doctores from './Doctores';

export default class CargarDoctores extends Component {

    cajaOption = React.createRef();
    cajaInput = React.createRef();

    state = {
        doctores: [],
        status: false,
        especialidades: [],
        status1: false
    }

    muestraEspecialidad = () => {
        var request = 'api/Doctores/Especialidades';
        var url = Global.urlDoctores + request;
        axios.get(url).then(response => {

            this.setState({
                especialidades: response.data,
                status: true
            })
        })
    }

    incrementarSalario = (e) => {
        e.preventDefault();
        var especialidad = this.cajaOption.current.value;
        var incremento = this.cajaInput.current.value;
        //
        // var espe = especialidad.replace("í","i");
        var request = 'api/Doctores/' + especialidad + "/" + incremento;
        var url = Global.urlDoctores + request;
        console.log(especialidad);
        axios.put(url).then(response => {
            this.setState({
                status1: true
            })
        })
    }

    componentDidMount = () => {
        this.muestraEspecialidad();
    }

    render() {
        return (
            <div>
                <h1>Incremento salarial doctores</h1>
                <form onSubmit={this.incrementarSalario}>
                    <select ref={this.cajaOption}>
                        {
                            this.state.especialidades.map((especialidades, index) => {
                                return (
                                    <option key={index}>{especialidades}</option>
                                )
                            })
                        }
                    </select><br />
                    <label>Incremento salarial</label>
                    <input type="text" ref={this.cajaInput} /><br />
                    <button>Incrementar salario</button>

                </form>
                {
                    this.state.status1 === true &&
                    <Doctores especialidad={this.cajaOption.current.value}/>
                }
                {
                    this.state.status1 === false &&
                    <Doctores />
                }
            </div>
        )
    }
}
