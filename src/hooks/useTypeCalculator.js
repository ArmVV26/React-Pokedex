import { useEffect, useState } from "react";
import { pokeApi } from "@/utils/pokeApi";

export function useTypeCalculator() {
  const [types, setTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [effectiveness, setEffectiveness] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTypes = async () => {
      const { data } = await pokeApi.get("/type/");
      const valid = data.results.filter(
        (t) => !["stellar", "unknown"].includes(t.name),
      );

      const translated = await Promise.all(
        valid.map(async ({ name, url }) => {
          const { data: typeData } = await pokeApi.get(url);
          const spanish =
            typeData.names.find((n) => n.language.name === "es")?.name || name;
          return { name, spanish, url };
        }),
      );

      setTypes(translated);
    };

    fetchTypes();
  }, []);

  useEffect(() => {
    if (selectedTypes.length === 0) return;

    const calculate = async () => {
      setLoading(true);

      const typeData = await Promise.all(
        selectedTypes.map((type) =>
          pokeApi.get(type.url).then((res) => res.data),
        ),
      );

      // Combina damage_relations
      const multiplierMap = {};

      for (let i = 0; i < typeData.length; i++) {
        const relations = typeData[i].damage_relations;

        const apply = (typesArr, multiplier) => {
          typesArr.forEach((t) => {
            const name = t.name;
            if (!multiplierMap[name]) multiplierMap[name] = 1;
            multiplierMap[name] *= multiplier;
          });
        };

        apply(relations.double_damage_from, 2);
        apply(relations.half_damage_from, 0.5);
        apply(relations.no_damage_from, 0);
      }

      // Clasifica resultados
      const effectivenessResult = {
        "4x": [],
        "2x": [],
        "1x": [],
        "0.5x": [],
        "0.25x": [],
        "0x": [],
      };

      types.forEach((t) => {
        const mult = multiplierMap[t.name] ?? 1;

        if (mult === 0) effectivenessResult["0x"].push(t);
        else if (mult === 0.25) effectivenessResult["0.25x"].push(t);
        else if (mult === 0.5) effectivenessResult["0.5x"].push(t);
        else if (mult === 1) effectivenessResult["1x"].push(t);
        else if (mult === 2) effectivenessResult["2x"].push(t);
        else if (mult >= 4) effectivenessResult["4x"].push(t);
      });

      setEffectiveness(effectivenessResult);
      setLoading(false);
    };

    calculate();
  }, [selectedTypes]);

  return {
    types,
    selectedTypes,
    setSelectedTypes,
    effectiveness,
    loading,
  };
}
