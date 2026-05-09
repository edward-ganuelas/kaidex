import { StyleSheet, Text, View, Image } from "react-native";
import { useState, useEffect } from "react";
import { getPokemonDetails, getPokemonSpecies } from "../utils/api";

export default function PokemonGridItem(props: any) {
  const [pokemonDetails, setPokemonDetails] = useState<any>(null);
  useEffect(() => {
    // Fetch pokemon details using props.pokemon.url
    getPokemonSpecies(props.pokemon.url)
      .then(async (data: any) => {
        const pokemonId = data.id;
        let details = await getPokemonDetails(pokemonId);
        details = { ...details, ...data };
        setPokemonDetails(details);
      })
      .catch((error) => {
        console.error("Error fetching pokemon details:", error);
      });
  }, [props.pokemon.url]);
  return (
    <View style={styles.pokedexEntry}>
      <Text>{props.pokemon.name}</Text>
      {pokemonDetails && (
        <View>
          {pokemonDetails.types.map((type: any) => (
            <Text key={type.type.name}>{type.type.name}</Text>
          ))}
          <Image
            source={{ uri: pokemonDetails.sprites.front_default }}
            style={styles.image}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pokedexEntry: {
    borderColor: "black",
    borderRadius: 8,
    borderWidth: 1,
    padding: 8,
    alignSelf: "center",
    flexBasis: "auto",
  },
  image: {
    width: 100,
    height: 100,
  },
});
