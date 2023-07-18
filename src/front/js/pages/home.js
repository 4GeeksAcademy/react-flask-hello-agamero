import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
  
	const handleSubmit = (e) => {
	  e.preventDefault();
  
	  // Validar que los campos no estén vacíos y realizar otras validaciones necesarias
  
	  actions.registerUser(email, password);
	};
  
	return (
		<div className="py-5 c2a10" style={{ backgroundImage: "url(https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/c2a/5.jpg)" }}>
		<div className="container">
		  <div className="row">
			<div className="col-md-5 text-center both-space">
			  <div className="card">
				<div className="card-body">
				  <div className="text-box">
					<h3 className="mb-3">Hola</h3>
					<h6 className="subtitle font-weight-normal">Por favor registrate para acceder al área privada</h6>
					<a className="btn btn-info-gradiant btn-md border-0 text-white mt-3" href="#"><span>View Details</span></a>
				  </div>
				</div>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
  );
  };
  