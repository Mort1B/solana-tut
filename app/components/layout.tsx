import Navbar from "./navbar"

const Layout = (props: any) => {
    return (
    <>
        <Navbar/>
        {props.children}
    </>
    )
}

export default Layout;