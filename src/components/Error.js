import { Helmet } from "react-helmet"

export default function Error () {
    return(
        <>
        <div className="error">Error</div>
        <Helmet>
            <meta charSet="utf-8" />
            <title>CoCreateLab - Error</title>
            <link rel="canonical" href="/404" />
        </Helmet>
        </>
    )
}