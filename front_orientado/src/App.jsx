import React, { useState } from 'react'
import apiLocal from './Api/apiLocal'
import './App.css'

export default function App() {

  const [ dadosFuncionarios, setDadosFuncionarios] = useState(['']) 
  console.log( dadosFuncionarios )
      
   

  async function consultaFuncionarios() {
   try {
     const resposta = await apiLocal.get('/VisualizarFuncionarios')
    //console.log(resposta.data)
    setDadosFuncionarios(resposta.data)
   } catch (err) {
    console.log(err.response.data.error)
   }
  }

  async function cadastrarFuncionarios() {
    //try catch - proteção do site, ao passar informações de facil compreensão
    try {
      const cpf = '111111111'
      const idHierarquia = 'd5c192dc-4bea-4282-9be4-ca52161f34c1'
      const nome = 'leonardo'
      const email = 'leonardo@teste.co.br'
      const senha = '12345'
      const status = true

      const resposta = await apiLocal.post('/CadastrarFuncionarios', {
        nome,
        cpf,
        email,
        senha,
        status,
        idHierarquia
      })
      console.log(resposta.data.dados)
    } catch (err) {
        console.log(err.response.data.error)
    }

  }

  async function apagarFuncionarios() {
    try {
      const id = 'b2c52aa9-38dd-441e-bd1e-ceeb295893e8'
    const resposta = await apiLocal.delete(`/ApagarFuncionarios/${id}`)
    console.log(resposta.data.dados)
    } catch (erro) {
      console.log("Erro ao consultar registro")
    }


    
  }
  // - aspas=string / aspas_invertida``= atribuir dados,sendo o $ que chama os dados

  //d5c192dc-4bea-4282-9be4-ca52161f34c1g



  return (
    <>
      <div>
        <center>
          <button onClick={apagarFuncionarios}    >Apagar</button>
          <button onClick={consultaFuncionarios}  >Consultar</button>
          <button onClick={cadastrarFuncionarios} >Cadastrar</button>
        </center>
      </div>

        <div> 
          {dadosFuncionarios.map((item) => {
            return(
              <div>
                
                <p> Nome:  {item.nome} </p>
                <p> Email: {item.email} </p>
                <p> CPF:   {item.cpf} </p>
                <p> Status: {item.status === true ? <span> Ativo </span> : <span> Inativo </span>} </p> 
                <p> Hierarquia:  </p>
              </div>
             )
          })} 

          
        </div>
    </>

  )
}

//react-toastify








