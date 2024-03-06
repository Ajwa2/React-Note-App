import { useRouteError } from "react-router-dom";
import './errorpage.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="error-page">
            <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
            <div className="error-back">
            <Link to={"/"}>
                <ArrowBackIcon/>
            </Link>
            </div>
        </div>
    );
}