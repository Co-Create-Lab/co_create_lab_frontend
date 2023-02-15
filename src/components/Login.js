import { Helmet } from "react-helmet"

export default function Login () {
    return(
        <>
        <div className="login">Login</div>

        <Helmet>
            <meta charSet="utf-8" />
            <title>CoCreateLab - LogIn</title>
            <link rel="canonical" href="/login" />
        </Helmet>
        </>
    )
}