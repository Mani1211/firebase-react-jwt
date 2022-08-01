import React from "react";
import ReactDOM from "react-dom";
import "./firebase-config";
import App from "./App";
import "./index.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { theme } from "./theme";
import { BrowserRouter as Router } from "react-router-dom";
ReactDOM.render(
	<ChakraProvider>
		<ColorModeScript initialColorMode={theme.config.initialColorMode} />
		<Router>
			<App />
		</Router>
	</ChakraProvider>,
	document.getElementById("root"),
);
