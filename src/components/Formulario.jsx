import {useState, useEffect} from "react"
import { Error } from "./error"



export const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {

  const [nombre, setNombre]= useState('')
  const [propietario, setPropietario]= useState('')
  const [email, setEmail]= useState('')
  const [fecha, setFecha]= useState('')
  const [sintomas, setSintomas]= useState('')
  const [error,setError] = useState(false)

  useEffect ( () => {
    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  }, [paciente])


  const generarID = ()=>{
    const random = Math.random().toString(36).substring(2)
    const hora = Date.now()

    return random + hora
  }

  const handleSubmit = (e) =>{
    e.preventDefault()

    if([ nombre, propietario, email, fecha, sintomas].includes('')){
      setError(true)
      return true
    }
    setError(false)

    const objetoPacientes = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
    }

    if(paciente.id){
        objetoPacientes.id = paciente.id 
        const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPacientes : pacienteState)
        setPacientes(pacientesActualizados)
        setPaciente({})
    }else{
      objetoPacientes.id = generarID()
      setPacientes([...pacientes, objetoPacientes])
    }

    

    setEmail('')
    setNombre('')
    setSintomas('')
    setFecha('')
    setPropietario('')

    
  }

  return (
    <div className="mx-5 md:w-1/2 lg:w-2/5">
        <h2 className="font-black text-3xl text-center">Seguimiento pacientes</h2>
        <p className=" text-lg mt-5 text-center mb-10">
          Añade pacientes y {''}
          <span className="text-indigo-600 font-bold">Administralos</span>

        </p>
        <form onSubmit = {handleSubmit} 
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">

          {
            error && <Error error= 'Todos los campos son obligatorios'/>
          }
            
            <div className="mb-5">
              <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold cursor-pointer">Nombre Mascota</label>

              <input
              id="mascota"
              placeholder = 'Nombre de la mascota'
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value = {nombre}
              onChange  = {(e)=> 
                setNombre(e.target.value)
              }
              ></input>
            </div>

            <div className="mb-5">
              <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold cursor-pointer">Nombre Propietario</label>

              <input id="propietario"
              placeholder = 'Nombre del propietario'
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value = {propietario}
              onChange  = {(e)=> 
                setPropietario(e.target.value)
              }
              ></input>
            </div>

            <div className="mb-5">
              <label htmlFor="email" className="block text-gray-700 uppercase font-bold cursor-pointer">email</label>

              <input id="email"
              placeholder = 'email propietario'
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              type='email'
              value = {email}
              onChange  = {(e)=> 
                setEmail(e.target.value)
              }
              ></input>
            </div>

            <div className="mb-5">
              <label htmlFor="alta" className="block text-gray-700 uppercase font-bold cursor-pointer">fecha de alta</label>

              <input id="alta"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              type='date'
              value = {fecha}
              onChange  = {(e)=> 
                setFecha(e.target.value)
              }
              ></input>
            </div>

            <div className="mb-5">
              <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold cursor-pointer">sintomas</label>

              <textarea id='sintomas'
               className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
               placeholder="Describe los síntomas"
               value = {sintomas}
               onChange  = {(e)=> 
                setSintomas(e.target.value)
              }/>
            </div>

            <input value = {paciente.id ? 'editar paciente':'agregar paciente'} type="submit" className="bg-indigo-600 w-full p-3 text-white uppercase  font-bold rounded-md hover:bg-indigo-700 cursor-pointer transition-all" />
            
        </form>
    </div>
  )
}
