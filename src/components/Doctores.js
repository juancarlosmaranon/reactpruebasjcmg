import React, { Component } from 'react'
import axios from 'axios';
import Global from '../Global';

export default class Doctores extends Component {

    state = {
        doctores:[],
        status:false
    }

    mostrarDoctores = () => {
        if(this.props.especialidad !== undefined){
            var especialidad = this.props.especialidad;
            var request = 'api/Doctores/DoctoresEspecialidad/'+especialidad;
        }else{
            console.log("a");
            var request = 'api/Doctores';
        }
        var url = Global.urlDoctores + request;
        axios.get(url).then(response => {
            console.log(response.data);
            this.setState({
                doctores: response.data,
                status: true
            })
        })
    }

    componentDidMount = () => {
        this.mostrarDoctores();
    }

    componentDidUpdate=(oldProps)=>{
        if(oldProps.especialidad != this.props.especialidad){
            this.mostrarDoctores();
        }
    }

    render() {

        return (
            <div>
                <h1>Doctores</h1>
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
