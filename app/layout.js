
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { Cartprovider } from "./context/cartContext";
import "./globals.css";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

          <Cartprovider>
            {/* <Navbar /> */}
            {children}
            {/* <Footer /> */}
          </Cartprovider>

      </body>
    </html>
  );
}
