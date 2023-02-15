import { Helmet } from "react-helmet"

export default function Userprofile () {
    return(
        <>
        <div className="userprofile">Userprofile</div>

        <Helmet>
            <meta charSet="utf-8" />
            <title>CoCreateLab - Your Profile</title>
            <link rel="canonical" href="/user/" />
        </Helmet>
        </>
    )
}