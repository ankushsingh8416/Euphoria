
import Navbar from "./Components/Navbar";
import { Cartprovider } from "./context/cartContext";
import "./globals.css";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
     <Cartprovider>
      <Navbar />
        {children}
        </Cartprovider>
      </body>
    </html>
  );
}
