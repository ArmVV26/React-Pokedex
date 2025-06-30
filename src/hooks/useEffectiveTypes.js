import { useEffect, useState } from "react";
import { pokeApi } from "@/utils/pokeApi";

export function useEffectiveTypes() {
  const [types, setTypes] = useState([]);
  const [currentType, setCurrentType] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() =>
    Number(localStorage.getItem("effectiveBestScore") || 0),
  );
  const [loading, setLoading] = useState(true);

  // Cargar todos los tipos una vez
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const { data } = await pokeApi.get("/type/");
        const translated = await Promise.all(
          data.results.map(async ({ name, url }) => {
            const { data: typeData } = await pokeApi.get(url);
            const spanish =
              typeData.names.find((n) => n.language.name === "es")?.name ||
              name;
            return { name, spanish, url };
          }),
        );

        const filtered = translated.filter(
          (t) => !["stellar", "unknown"].includes(t.name),
        );

        setTypes(filtered);
      } catch (error) {
        console.error("Error al obtener los tipos:", error);
      }
    };

    fetchTypes();
  }, []);

  // Obtener tipo aleatorio y sus debilidades
  const getRandomType = async () => {
    setLoading(true);
    try {
      const random = types[Math.floor(Math.random() * types.length)];
      const { data } = await pokeApi.get(random.url);
      const weaknesses = data.damage_relations.double_damage_from.map(
        (type) => type.name,
      );

      setCurrentType(random.name);
      setCorrectAnswers(weaknesses);
      setSelected(null);
      setResult(null);
    } catch (error) {
      console.error("Error al obtener tipo aleatorio:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (types.length > 0) {
      getRandomType();
    }
  }, [types]);

  const handleSelect = (typeName) => {
    setSelected(typeName);
    const isCorrect = correctAnswers.includes(typeName);

    if (isCorrect) {
      const newScore = score + 1;
      setScore(newScore);
      setResult("correct");

      if (newScore > bestScore) {
        setBestScore(newScore);
        localStorage.setItem("effectiveBestScore", String(newScore));
      }

      setTimeout(() => {
        getRandomType();
      }, 1000);
    } else {
      setResult("wrong");
      setScore(0);

      setTimeout(() => {
        getRandomType();
      }, 1000);
    }
  };

  return {
    types,
    currentType,
    correctAnswers,
    selected,
    result,
    handleSelect,
    score,
    bestScore,
    getRandomType,
  };
}
