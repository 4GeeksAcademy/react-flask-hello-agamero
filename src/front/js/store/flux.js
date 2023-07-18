const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		message: null,
		demo: [
		  {
			title: "FIRST",
			background: "white",
			initial: "white"
		  },
		  {
			title: "SECOND",
			background: "white",
			initial: "white"
		  }
		],
		isAuthenticated: false // Agrega una propiedad para rastrear el estado de autenticación
	  },
	  actions: {
		// Use getActions to call a function within a function
		exampleFunction: () => {
		  getActions().changeColor(0, "green");
		},
  
		getMessage: async () => {
		  try {
			// Fetching data from the backend
			const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
			const data = await resp.json();
			setStore({ message: data.message });
			// Don't forget to return something, that is how the async resolves
			return data;
		  } catch (error) {
			console.log("Error loading message from backend", error);
		  }
		},
  
		changeColor: (index, color) => {
		  // Get the store
		  const store = getStore();
  
		  // We have to loop through the entire demo array to look for the respective index
		  // and change its color
		  const demo = store.demo.map((elm, i) => {
			if (i === index) elm.background = color;
			return elm;
		  });
  
		  // Reset the global store
		  setStore({ demo: demo });
		},
  
		registerUser: async (email, password) => {
		  try {
			const response = await fetch(process.env.BACKEND_URL + "/api/register", {
			  method: "POST",
			  headers: {
				"Content-Type": "application/json"
			  },
			  body: JSON.stringify({ email, password })
			});
  
			if (response.ok) {
			  // The registration was successful
			  console.log("User registered successfully");
			} else {
			  // The registration failed
			  console.log("User registration failed");
			}
		  } catch (error) {
			console.log("Error registering user:", error);
		  }
		},
  
		loginUser: async (email, password) => {
		  try {
			const response = await fetch(process.env.BACKEND_URL + "/api/login", {
			  method: "POST",
			  headers: {
				"Content-Type": "application/json"
			  },
			  body: JSON.stringify({ email, password })
			});
  
			if (response.ok) {
			  // The login was successful
			  setStore({ isAuthenticated: true }); // Actualiza el estado de autenticación
			  console.log("Login successful");
			} else {
			  // The login failed
			  console.log("Login failed");
			}
		  } catch (error) {
			console.log("Error logging in:", error);
		  }
		},
  
		logoutUser: () => {
		  setStore({ isAuthenticated: false }); // Actualiza el estado de autenticación al cerrar sesión
		  console.log("Logout successful");
		}
	  }
	};
  };
  
  export default getState;
  