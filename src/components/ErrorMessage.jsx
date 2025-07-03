import { Link } from "react-router-dom";

function ErrorMessage({
  title,
  message,
  backUrl = "/",
  backText = "Volver al inicio",
}) {
  return (
    <section className="font-roboto flex h-160 items-center justify-center">
      <article className="bg-base-300 border-primary max-w-160 items-center rounded-2xl border-r-5 border-b-5 p-15 text-center shadow-xl">
        <h1 className="text-error font-lato mb-2 text-3xl font-bold">
          {title}
        </h1>
        <p className="text-base-content mb-4 text-lg">{message}</p>
        <Link
          to={backUrl}
          className="btn btn-primary mt-2 text-base font-semibold normal-case"
          style={{ minWidth: "150px" }}
        >
          {backText}
        </Link>
      </article>
    </section>
  );
}

export default ErrorMessage;
