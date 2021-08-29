import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [aguarde, setAguarde] = useState(false);
  const [application, setApplication] = useState({
    nome: "", cargo: "", dataNascimento: "", estadoCivil: "", sexo: "", cep: "", logradouro: "", numero: "", complemento: "", bairro: "", cidade: "", telefone1: "", telefone2: "", celular: "", contato: "", email: "", identidade: "", cpf: "", possuiVeiculo: "", habilitacao: ""
  });

  const handleCep = (event) => {
    setAguarde(true);
    setApplication((prevState) => ({
      ...prevState,
      cep: event.target.value
    }));
    axios.post("getCEP", {"cep": event.target.value})
    .then((response) => {
      setApplication((prevState) => ({
        ...prevState,
        bairro: response.data.bairro,
        cidade: response.data.localidade,
        logradouro: response.data.logradouro
      }));
      setAguarde(false);
    })
    .catch((error) => {
      alert("Ocorreu um erro na consulta do CEP");
      console.log(error);
      setAguarde(false);
    })
  }

  const handleButtonClick = () => {
    console.log(application)
    axios.post("/setApplication", application)
    .then((response) => {alert(JSON.stringify(response.data.message)); (console.log(response.data))})
    .catch((error) => {alert(JSON.stringify(error.response.data.message)); console.log(error.response.data)})
  }

  return (
    <div className="App">
      <h1>JOBSNET - Cadastro para Oportunidade de Emprego</h1>
      <hr></hr><hr></hr>
      <h2>Dados Pessoais</h2>
      <hr></hr>
      <div className="row">
        <div className="col-4">
          <label> Nome Completo
            <input className="form-control input" type="text" onChange={(e) => setApplication((prevState) => ({...prevState, nome: e.target.value}))}></input>
          </label>
        </div>
        <div className="col-4">
          <label> Cargo Pretendido
            <input className="form-control input" type="text" onChange={(e) => setApplication((prevState) => ({...prevState, cargo: e.target.value}))}></input>
          </label>
        </div>
        <div className="col-4">
          <label> Data de Nascimento
            <input className="form-control input" type="text" onChange={(e) => setApplication((prevState) => ({...prevState, dataNascimento: e.target.value}))}></input>
          </label>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <label>Estado Civil</label>
          <select className="form-select" onChange={(e) => setApplication((prevState) => ({...prevState, estadoCivil: e.target.value}))}>
            <option>Selecione...</option>
            <option value="Solteiro(a)">Solteiro(a)</option>
            <option value="Casado(a)">Casado(a)</option>
            <option value="Divorciado(a)">Divorciado(a)</option>
          </select>
        </div>
        <div className="col-4">
          <label>Sexo</label>
          <select className="form-select" onChange={(e) => setApplication((prevState) => ({...prevState, sexo: e.target.value}))}>
            <option>Selecione...</option>
            <option value="Feminino">Feminino</option>
            <option value="Masculino">Masculino</option>
            <option value="Outro">Outro</option>
          </select>
        </div>
      </div>
      <br></br><br></br>
      <h4>Endereço</h4>
      <div className="row">
        <div className="col-4">
          <label> CEP
            <input className="form-control input" type="number" onBlur={handleCep}></input>
          </label>
        </div>
        {aguarde && 
        <div className="col-4">
          Aguarde...
        </div>}
      </div>
      <div className="row">
        <div className="col-4">
          <label> Rua
            <input readOnly className="form-control input" type="text" value={application.logradouro}></input>
          </label>
        </div>
        <div className="col-4">
          <label> Número
            <input className="form-control input" type="text" onChange={(e) => setApplication((prevState) => ({...prevState, numero: e.target.value}))}></input>
          </label>
        </div>
        <div className="col-4">
          <label> Complemento
            <input className="form-control input" type="text" onChange={(e) => setApplication((prevState) => ({...prevState, complemento: e.target.value}))}></input>
          </label>
        </div>
        </div>
        <div className="row">
          <div className="col-4">
            <label> Bairro
              <input readOnly className="form-control input" type="text" value={application.bairro}></input>
            </label>         
          </div>
          <div className="col-4">
          <label> Cidade
            <input readOnly className="form-control input" type="text" value={application.localidade}></input>
          </label>
        </div>
      </div>
      <br></br><br></br>
      <h4>Contato</h4>
      <div className="row">
        <div className="col-4">          
          <label> Telefone Fixo 1
            <input className="form-control input" type="text" onChange={(e) => setApplication((prevState) => ({...prevState, telefone1: e.target.value}))}></input>
          </label>
        </div>
        <div className="col-4">
          <label> Telefone Fixo 2
            <input className="form-control input" type="text" onChange={(e) => setApplication((prevState) => ({...prevState, telefone2: e.target.value}))}></input>
          </label>          
        </div>
        <div className="col-4">
          <label> Celular
            <input className="form-control input" type="text" onChange={(e) => setApplication((prevState) => ({...prevState, celular: e.target.value}))}></input>
          </label>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <label> Contato
            <input className="form-control input" type="text" onChange={(e) => setApplication((prevState) => ({...prevState, contato: e.target.value}))}></input>
          </label>
        </div>
        <div className="col-4">
        <label> Email
            <input className="form-control input" type="text" onChange={(e) => setApplication((prevState) => ({...prevState, email: e.target.value}))}></input>
          </label>        
        </div>
      </div>      

      <br></br><br></br><br></br>
      <h2>Documentos</h2>
      <hr></hr>
      <div className="row">
        <div className="col-4">
          <label> Identidade
            <input className="form-control input" type="text" onChange={(e) => setApplication((prevState) => ({...prevState, identidade: e.target.value}))}></input>
          </label>
        </div>
        <div className="col-4">
          <label> CPF
            <input className="form-control input" type="number" onChange={(e) => setApplication((prevState) => ({...prevState, cpf: e.target.value}))}></input>
          </label>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <label>Possui Veículo</label>
          <select className="form-select" onChange={(e) => setApplication((prevState) => ({...prevState, possuiVeiculo: e.target.value}))}>
            <option>Selecione...</option>
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
          </select>
        </div>
        <div className="col-4">
          <label>Habilitação</label>
          <select className="form-select" onChange={(e) => setApplication((prevState) => ({...prevState, habilitacao: e.target.value}))}>
            <option>Selecione...</option>
            <option value="Carro">Carro</option>
            <option value="Moto">Moto</option>
            <option value="Outro">Outro</option>
          </select>
        </div>
      </div>

      <br></br><br></br><br></br>
      <button type="button" className="btn btn-dark btn-lg" onClick={handleButtonClick}>Enviar</button>
    </div>
  );
}

export default App;
