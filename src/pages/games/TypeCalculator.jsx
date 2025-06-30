import { useTypeCalculator } from "@/hooks/useTypeCalculator";
import { colorTypes } from "@/utils/constants";
import { Link } from "react-router-dom";

const TypeCalculator = () => {
  const { types, selectedTypes, setSelectedTypes, effectiveness, loading } =
    useTypeCalculator();

  const handleSelect = (type) => {
    if (selectedTypes.some((t) => t.name === type.name)) {
      setSelectedTypes((prev) => prev.filter((t) => t.name !== type.name));
    } else if (selectedTypes.length < 2) {
      setSelectedTypes((prev) => [...prev, type]);
    }
  };

  const renderTypeButtons = () =>
    types.map((type) => {
      const selected = selectedTypes.some((t) => t.name === type.name);
      return (
        <button
          key={type.name}
          onClick={() => handleSelect(type)}
          className={`text-base-100 m-1 rounded-xl px-4 py-2 font-medium transition hover:cursor-pointer ${colorTypes[type.spanish.toLowerCase()] || "bg-gray-500"} ${selected ? "ring-2 ring-white" : "hover:brightness-90"} ${selectedTypes.length >= 2 && !selected && "cursor-not-allowed opacity-50"} `}
        >
          {type.spanish}
        </button>
      );
    });

  const renderResults = () => {
    const labels = {
      "4x": "Recibe 4x daño",
      "2x": "Recibe 2x daño",
      "1x": "Recibe 1x daño",
      "0.5x": "Recibe 0.5x daño",
      "0.25x": "Recibe 0.25x daño",
      "0x": "Es inmune (0x)",
    };

    return Object.entries(effectiveness).map(([key, group]) =>
      group.length > 0 ? (
        <div key={key} className="my-4">
          <h3 className="mb-1 text-lg font-semibold">{labels[key]}</h3>
          <div className="flex flex-wrap gap-2">
            {group.map((t) => (
              <span
                key={t.name}
                className={`text-base-100 rounded-xl px-3 py-1 text-sm font-semibold ${colorTypes[t.spanish.toLowerCase()]}`}
              >
                {t.spanish}
              </span>
            ))}
          </div>
        </div>
      ) : null,
    );
  };

  return (
    <section className="bg-base-300 mx-auto my-10 flex w-full flex-col p-6 text-center shadow-lg sm:h-[800px] lg:h-[720px] lg:max-w-5xl lg:rounded-2xl">
      <header>
        <h2 className="mb-4 text-2xl font-bold">🧮 Calculadora de Tipos</h2>
        <p className="mb-4 text-sm">
          Selecciona uno o dos tipos para calcular sus debilidades.
        </p>
      </header>

      <main className="flex flex-col md:flex-row">
        <article className="overflow-auto border-b border-white/20 pb-4 md:w-1/2 md:border-r md:border-b-0 md:pr-4">
          <div className="flex flex-wrap justify-center">
            {renderTypeButtons()}
          </div>
        </article>

        <div className="overflow-auto pl-4 text-left md:w-1/2">
          {loading ? (
            <p className="mt-10 text-center text-lg font-semibold">
              Calculando...
            </p>
          ) : selectedTypes.length === 0 ? (
            <p className="mt-10 text-center text-sm text-gray-400 italic">
              Aún no has seleccionado ningún tipo.
            </p>
          ) : (
            renderResults()
          )}
        </div>
      </main>

      <footer className="md:pt-4">
        <div className="flex justify-center">
          <Link to="/games">
            <button className="btn btn-neutral rounded-full">
              Volver al menú de juegos
            </button>
          </Link>
        </div>
      </footer>
    </section>
  );
};

export default TypeCalculator;
