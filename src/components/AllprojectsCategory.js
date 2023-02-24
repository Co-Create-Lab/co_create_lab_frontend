import { useParams } from "react-router-dom";
import Allprojects from "./Allprojects";

export default function AllprojectsCategory () {

    const { category } = useParams();
    const homeCategory = category

    return(
        <>
            <Allprojects homeCategory={homeCategory}/>
        </>
    )
}