import { Box } from "@chakra-ui/react"
import { ReactNode } from "react"
import Header from "./Header"

const DefaultLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Header />
            <Box m='6'>{children}</Box>
        </>
    )
}

export default DefaultLayout