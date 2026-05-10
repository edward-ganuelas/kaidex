import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { getPokemonDetails, getPokemonSpecies } from "../utils/api";

export default function PokemonGridItem(props: any) {
  const [pokemonDetails, setPokemonDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch pokemon details using props.pokemon.url
    getPokemonSpecies(props.pokemon.url)
      .then(async (data: any) => {
        const pokemonId = data.id;
        let details = await getPokemonDetails(pokemonId);
        details = { ...details, ...data };
        setPokemonDetails(details);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching pokemon details:", error);
        setLoading(false);
      });
  }, [props.pokemon.url]);

  function onPress() {
    if (!loading && pokemonDetails) {
      props.onPokemonPress(pokemonDetails);
    }
  }

  return (
    <Pressable onPress={onPress}>
      <View style={styles.pokedexEntry}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : pokemonDetails ? (
          <View style={styles.pokemonDetail}>
             <Text>{pokemonDetails.names?.find((name: any) => name.language.name === "en")?.name}</Text>
            {pokemonDetails.sprites?.front_default && (
              <Image
                source={{ uri: pokemonDetails.sprites.front_default }}
                style={styles.image}
              />
            )}
          </View>
        ) : null}
      </View>
    </Pressable>
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
    minWidth: 150,
  },
  image: {
    width: 100,
    height: 100,
  },
  pokemonDetail: {
    display: "flex",
    flexDirection: "column",
      alignItems: "center",
  }
});
