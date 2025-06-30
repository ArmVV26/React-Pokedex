import { useEffectiveTypes } from "@/hooks/useEffectiveTypes";
import { colorTypes } from "@/utils/constants";
import { Link } from "react-router-dom";

const EffectiveTypesGame = () => {
  const {
    types,
    currentType,
    result,
    handleSelect,
    score,
    bestScore,
    selected,
  } = useEffectiveTypes();

  const typeSpanish =
    types.find((t) => t.name === currentType)?.spanish || currentType;

  if (!currentType) return <p>Cargando...</p>;

  return (
    <section className="bg-base-300 my-20 max-w-160 px-2 py-5 text-center shadow-lg sm:mx-auto sm:rounded-2xl sm:px-8">
      <h1 className="mb-2 text-3xl font-bold">⚔️ Tipos Efectivos</h1>
      <p className="mb-10 flex flex-col items-center justify-center gap-2 sm:mb-0 sm:flex-row">
        Elige el tipo más efectivo contra:{" "}
        <strong
          className={`text-base-100 max-w-25 rounded-lg px-2 py-1 text-base ${colorTypes[typeSpanish.toLowerCase()]}`}
        >
          {typeSpanish}
        </strong>
      </p>

      <div className="my-4 grid grid-cols-3 gap-2">
        {types.map((type) => (
          <button
            key={type.name}
            onClick={() => handleSelect(type.name)}
            className={`text-base-100 rounded-2xl p-3 font-semibold capitalize transition-all duration-200 ${colorTypes[type.spanish.toLowerCase()]} ${selected === type.name && result === "correct" && "outline-2 outline-green-500"} ${selected === type.name && result === "wrong" && "outline-2 outline-red-500"} ${!!result && "cursor-not-allowed opacity-50"} ${!result && "cursor-pointer hover:brightness-90"} `}
          >
            {type.spanish}
          </button>
        ))}
      </div>

      <article className="h-5">
        {result === "wrong" && (
          <p className="font-bold text-red-500">¡Incorrecto!</p>
        )}
        {result === "correct" && (
          <p className="font-bold text-green-500">¡Correcto!</p>
        )}
      </article>

      <article className="mt-4 flex justify-center gap-10">
        <div>
          <p className="text-3xl font-bold">{score}</p>
          <p className="text-base-200 text-xs font-bold sm:text-base">
            Puntuación actual
          </p>
        </div>
        <div>
          <p className="text-3xl font-bold">{bestScore}</p>
          <p className="text-base-200 text-xs font-bold sm:text-base">
            Mejor puntuación
          </p>
        </div>
      </article>

      <footer className="mt-8">
        <Link to="/games">
          <button className="btn btn-neutral rounded-full">
            Volver al menú de juegos
          </button>
        </Link>
      </footer>
    </section>
  );
};

export default EffectiveTypesGame;
