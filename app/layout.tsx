import { ReactElement } from "react"
import Nav from "../components/Nav"
import "@styles/styles.css"
import AuthProvider from "@components/AuthProvider"
import MainProvider from "./providers/MainProvider"
export const metadata = {
  title: 'Nobody',
  description: 'Goat Developer of 90s',
}
type props = {
  children: ReactElement
}
export default function RootLayout({ children }: props) {

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <MainProvider>
          <Nav/>
          {children}
          </MainProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
